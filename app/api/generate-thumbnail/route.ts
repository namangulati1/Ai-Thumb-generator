import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const generateSchema = z.object({
  prompt: z.string().min(5).max(500),
  style: z.string().optional().default('mrbeast'),
  tone: z.string().optional().default('clickbait'),
  textOverlay: z.string().optional().default(''),
})

// Mock AI generation function (replace with actual OpenAI/DALL-E or Stability AI)
async function generateThumbnail(prompt: string, style: string, tone: string, textOverlay: string) {
  // In production, you would call an AI API here
  // For demo, we return a placeholder image
  const enhancedPrompt = `viral youtube thumbnail, high contrast, expressive face, bold typography, 1280x720, clickbait style, ${prompt}, ${style} style, ${tone} tone`
  console.log('Generating thumbnail with prompt:', enhancedPrompt)

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Return a mock image URL (using Unsplash as placeholder)
  const mockImages = [
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=720&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=720&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=720&q=80',
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=720&q=80',
  ]
  const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)]
  return randomImage
}

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Validate input
    const body = await req.json()
    const validation = generateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }
    const { prompt, style, tone, textOverlay } = validation.data

    // 3. Check user credits (atomic operation)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    })

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please upgrade your plan.' },
        { status: 402 }
      )
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
    })

    if (!updatedUser) {
      // Race condition: credits were insufficient at moment of update
      return NextResponse.json(
        { error: 'Credit deduction failed. Please try again.' },
        { status: 409 }
      )
    }

    // 5. Generate thumbnail (AI call)
    const imageUrl = await generateThumbnail(prompt, style, tone, textOverlay)

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
    })

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
    })
  } catch (error) {
    console.error('Thumbnail generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}