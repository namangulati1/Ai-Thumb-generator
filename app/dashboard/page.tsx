"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// Note: We use lucide-react and framer-motion for the premium feel
import {
  Sparkles,
  Zap,
  CreditCard,
  History,
  Download,
  RefreshCw,
  Wand2,
  ImageIcon,
  ExternalLink,
  Activity,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const { data: session, status, update } = useSession();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("mrbeast");
  const [tone, setTone] = useState("clickbait");
  const [textOverlay, setTextOverlay] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<any[]>([]);

  // Fetch recent generations
  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch("/api/history");
        if (res.ok) {
          const data = await res.json();
          setRecentGenerations(data.thumbnails.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch recent history:", error);
      }
    }
    if (status === "authenticated") {
      fetchRecent();
    }
  }, [status]);

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  const userCredits = session?.user?.credits || 0;
  const userName = session?.user?.name || "Creator";

  const styles = [
    {
      id: "mrbeast",
      label: "MrBeast Style",
      desc: "High energy, bold text, vibrant colors",
    },
    {
      id: "gaming",
      label: "Gaming",
      desc: "Dark theme, neon accents, game UI elements",
    },
    {
      id: "tech",
      label: "Tech",
      desc: "Clean, minimalist, futuristic aesthetics",
    },
    { id: "vlog", label: "Vlog", desc: "Personal, authentic, human-focused" },
    {
      id: "clickbait",
      label: "Clickbait",
      desc: "Shocking imagery, arrows, circles, red text",
    },
  ];

  const tones = [
    { id: "clickbait", label: "Clickbait" },
    { id: "professional", label: "Professional" },
    { id: "funny", label: "Funny" },
    { id: "mysterious", label: "Mysterious" },
    { id: "emotional", label: "Emotional" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (userCredits < 1) {
      alert("Not enough credits! Please upgrade your plan.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null); // Reset prev image

    try {
      const response = await fetch("/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, tone, textOverlay }),
      });
      console.log("DEBUG: response:", response);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate thumbnail");
      }

      setGeneratedImage(data.thumbnail.imageUrl);

      // Add to recent visually immediately
      setRecentGenerations((prev) => [data.thumbnail, ...prev].slice(0, 3));

      if (update) {
        await update({ credits: data.thumbnail.remainingCredits });
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    window.open(generatedImage, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { stiffness: 100 },
    },
  };

  // Beautiful background blobs
  const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 relative selection:bg-purple-500/30">
      <BackgroundEffects />

      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-24 md:pt-32">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent flex items-center gap-3">
              <Wand2 className="h-10 w-10 text-purple-500" />
              Welcome, {userName.split(" ")[0]}
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl">
              Turn your ideas into viral thumbnails in seconds using our
              advanced AI generation engine.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="p-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30">
                <Zap className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Credits
                </span>
                <span className="text-xl font-bold font-mono text-zinc-100 leading-none">
                  {userCredits}
                </span>
              </div>
            </div>

            <a href="/billing">
              <Button className="bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-6 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <CreditCard className="mr-2 h-5 w-5" /> Top up
              </Button>
            </a>
          </div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main Generator Area */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <ImageIcon className="h-6 w-6 text-purple-400" />
                    Creation Studio
                  </CardTitle>
                  <CardDescription className="text-zinc-400 text-base">
                    Describe your vision. The more specific, the better the
                    result.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="prompt"
                      className="text-zinc-300 font-medium"
                    >
                      Main Concept (Prompt)
                    </Label>
                    <div className="relative group">
                      <Input
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A tech reviewer holding an iPhone 16 looking absolutely shocked, glowing background..."
                        className="bg-black/40 border-white/10 text-white h-14 pl-4 pr-12 rounded-xl focus:ring-2 focus:ring-purple-500/50 transition-all text-base placeholder:text-zinc-600"
                      />
                      <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-zinc-300 font-medium">
                        Visual Style
                      </Label>
                      <Select
                        value={style}
                        onValueChange={(val) => setStyle(val || "")}
                      >
                        <SelectTrigger className="bg-black/40 border-white/10 h-12 rounded-xl text-zinc-200">
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                          {styles.map((s) => (
                            <SelectItem
                              key={s.id}
                              value={s.id}
                              className="focus:bg-zinc-800 cursor-pointer"
                            >
                              <div className="flex flex-col gap-1 py-1">
                                <span className="font-medium">{s.label}</span>
                                <span className="text-xs text-zinc-500">
                                  {s.desc}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300 font-medium">
                        Emotional Tone
                      </Label>
                      <Select
                        value={tone}
                        onValueChange={(val) => setTone(val || "")}
                      >
                        <SelectTrigger className="bg-black/40 border-white/10 h-12 rounded-xl text-zinc-200">
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                          {tones.map((t) => (
                            <SelectItem
                              key={t.id}
                              value={t.id}
                              className="focus:bg-zinc-800 cursor-pointer"
                            >
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="textOverlay"
                      className="text-zinc-300 font-medium"
                    >
                      Text Overlay (Optional)
                    </Label>
                    <Input
                      id="textOverlay"
                      value={textOverlay}
                      onChange={(e) => setTextOverlay(e.target.value)}
                      placeholder="e.g. IT'S FINALLY HERE!"
                      className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-2 focus:ring-purple-500/50 transition-all font-bold placeholder:font-normal placeholder:text-zinc-600"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating || userCredits < 1}
                      className="w-full relative group overflow-hidden rounded-xl py-7 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-600" />

                      {/* Animated gradient hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Shine effect */}
                      <div className="absolute top-0 -left-[100%] w-[50%] h-full transform skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />

                      <div className="relative flex items-center justify-center text-white font-bold text-lg tracking-wide z-10 w-full h-full">
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-3 h-5 w-5 animate-spin" />
                            Synthesizing Pixels...
                          </>
                        ) : (
                          <>
                            Generate Masterpiece
                            <Badge
                              variant="secondary"
                              className="ml-3 bg-white/20 hover:bg-white/30 text-white border-0 py-1"
                            >
                              1 Credit
                            </Badge>
                          </>
                        )}
                      </div>
                    </Button>

                    {userCredits < 1 && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-3 text-center font-medium"
                      >
                        Out of credits.{" "}
                        <a
                          href="/billing"
                          className="text-white underline hover:text-purple-400 transition-colors"
                        >
                          Top up your balance
                        </a>{" "}
                        to keep creating.
                      </motion.p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Generated Image Preview Area */}
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full aspect-video rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center gap-6 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10 animate-pulse" />

                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-zinc-800 border-t-purple-500 animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-400 animate-pulse" />
                  </div>

                  <div className="text-center z-10 space-y-2">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                      Generating Your Thumbnail
                    </h3>
                    <p className="text-zinc-500 text-sm">
                      Our AI is painting your masterpiece. This usually takes
                      10-15 seconds.
                    </p>
                  </div>
                </motion.div>
              ) : generatedImage ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative"
                >
                  <Card className="bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="aspect-video relative overflow-hidden bg-zinc-900 border-b border-white/10">
                      <img
                        src={generatedImage}
                        alt="Generated thumbnail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md py-1.5 px-3">
                          <Activity className="w-3 h-3 mr-1.5 animate-pulse" />
                          Ready for Production
                        </Badge>
                      </div>
                    </div>

                    <CardFooter className="p-4 md:p-6 bg-black/60 backdrop-blur-md flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleDownload}
                        className="flex-1 bg-white text-black hover:bg-zinc-200 py-6 text-base font-bold rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      >
                        <Download className="mr-2 h-5 w-5" /> Download HD
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        variant="outline"
                        className="sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 py-6 rounded-xl"
                      >
                        <RefreshCw className="mr-2 h-5 w-5" /> Regenerate
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Sidebar / Stats Area */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    Usage Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-zinc-400">Available Credits</span>
                        <span className="text-zinc-100">{userCredits}</span>
                      </div>
                      <Progress
                        value={Math.min((userCredits / 100) * 100, 100)}
                        className="h-2.5 bg-zinc-800"
                      />
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-3 font-medium">
                      <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                        <span className="text-sm text-zinc-400">
                          Current Plan
                        </span>
                        <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {session?.user?.subscriptionPlan || "Free"}
                        </Badge>
                      </div>
                    </div>

                    <a href="/billing">
                      <Button
                        variant="outline"
                        className="w-full mt-2 bg-transparent border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white"
                      >
                        Upgrade Subscription
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl flex flex-col h-[calc(100%-12rem)] min-h-[400px]">
                <CardHeader className="pb-4 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <History className="h-5 w-5 text-pink-400" />
                      Recent Hits
                    </CardTitle>
                    <a
                      href="/history"
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                    >
                      View all <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {recentGenerations.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                      <ImageIcon className="h-10 w-10 mb-3 opacity-20" />
                      <p className="text-sm">
                        Your masterpiece gallery is waiting.
                      </p>
                      <p className="text-xs mt-1">
                        Generate your first thumbnail to see it here.
                      </p>
                    </div>
                  ) : (
                    recentGenerations.map((gen, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={gen.id || i}
                        className="group flex flex-col gap-3 p-3 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors cursor-pointer"
                        onClick={() => window.open(gen.imageUrl, "_blank")}
                      >
                        <div className="aspect-video w-full rounded-lg bg-zinc-900 border border-white/5 overflow-hidden relative">
                          <img
                            src={gen.imageUrl}
                            alt={gen.prompt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="px-1">
                          <p
                            className="font-medium text-sm text-zinc-200 line-clamp-2 leading-snug"
                            title={gen.prompt}
                          >
                            {gen.prompt}
                          </p>
                          <div className="flex items-center justify-between mt-2 text-xs text-zinc-500">
                            <span>
                              {new Date(
                                gen.createdAt || Date.now(),
                              ).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-yellow-500" />{" "}
                              {gen.creditsUsed || 1}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Shine animation for global CSS injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
        .animate-shine {
          animation: shine 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `,
        }}
      />
    </div>
  );
}
