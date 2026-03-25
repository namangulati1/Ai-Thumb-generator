import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const generateSchema = z.object({
  prompt: z.string().min(5).max(500),
  style: z.string().optional().default("mrbeast"),
  tone: z.string().optional().default("clickbait"),
  textOverlay: z.string().optional().default(""),
});

async function generateThumbnail(
  prompt: string,
  style: string,
  tone: string,
  textOverlay: string,
) {
  const enhancedPrompt = `viral youtube thumbnail, text overlay: "${textOverlay}", high contrast, expressive face, bold typography, 1280x720, clickbait style, ${prompt}, ${style} style, ${tone} tone`;
  console.log("Generating thumbnail with prompt:", enhancedPrompt);

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  // OpenRouter uses /api/v1/chat/completions for image generation
  // with the modalities parameter set to ["image"]
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "AI Thumbnail Generator",
      },
      body: JSON.stringify({
        model: "black-forest-labs/flux-1.1-pro",
        modalities: ["image"],
        messages: [
          {
            role: "user",
            content: enhancedPrompt,
          },
        ],
      }),
    },
  );
  console.log("DEBUG: response:", response.status, response.statusText);
  if (!response.ok) {
    const errorData = await response.text();
    console.error("OpenRouter API Error:", errorData);
    throw new Error(`Failed to generate thumbnail: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(
    "DEBUG: OpenRouter response data:",
    JSON.stringify(data, null, 2),
  );

  // OpenRouter returns images in the chat completions format
  // The image URL or base64 data is in the message content
  const choice = data.choices?.[0];
  if (!choice) {
    throw new Error("No response returned from OpenRouter API");
  }

  // Check for image URL in the content parts
  const content = choice.message?.content;
  let imageUrl: string | null = null;

  if (typeof content === "string") {
    // Some models return a URL directly as string content
    if (content.startsWith("http")) {
      imageUrl = content;
    } else if (content.startsWith("data:image")) {
      imageUrl = content;
    }
  } else if (Array.isArray(content)) {
    // Look for image_url type in content parts
    for (const part of content) {
      if (part.type === "image_url" && part.image_url?.url) {
        imageUrl = part.image_url.url;
        break;
      }
    }
  }

  if (!imageUrl) {
    throw new Error(
      "No image URL returned from OpenRouter API. Response: " +
        JSON.stringify(content),
    );
  }

  return imageUrl;
}

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate input
    const body = await req.json();
    const validation = generateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 },
      );
    }
    const { prompt, style, tone, textOverlay } = validation.data;

    // 3. Check user credits (atomic operation)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    });

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: "Insufficient credits. Please upgrade your plan." },
        { status: 402 },
      );
    }

    // 4. Deduct credit atomically
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
        credits: { gte: 1 }, // Ensure credits haven't changed
      },
      data: {
        credits: { decrement: 1 },
      },
      select: { credits: true },
    });

    if (!updatedUser) {
      // Race condition: credits were insufficient at moment of update
      return NextResponse.json(
        { error: "Credit deduction failed. Please try again." },
        { status: 409 },
      );
    }

    // 5. Generate thumbnail (AI call)
    const imageUrl = await generateThumbnail(prompt, style, tone, textOverlay);

    // 6. Store generation record
    const thumbnail = await prisma.thumbnail.create({
      data: {
        userId: session.user.id,
        prompt,
        style,
        tone,
        textOverlay,
        imageUrl,
        creditsUsed: 1,
      },
    });

    // 7. Return result
    return NextResponse.json({
      success: true,
      thumbnail: {
        id: thumbnail.id,
        imageUrl,
        prompt,
        style,
        creditsUsed: 1,
        remainingCredits: updatedUser.credits,
      },
    });
  } catch (error) {
    console.error("Thumbnail generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
