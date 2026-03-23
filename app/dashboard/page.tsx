"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Zap, CreditCard, History, Download, RefreshCw } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const { data: session, status, update } = useSession()
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("mrbeast")
  const [tone, setTone] = useState("clickbait")
  const [textOverlay, setTextOverlay] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [recentGenerations, setRecentGenerations] = useState<any[]>([])

  // Fetch recent generations
  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch("/api/history")
        if (res.ok) {
          const data = await res.json()
          setRecentGenerations(data.thumbnails.slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to fetch recent history:", error)
      }
    }
    if (status === "authenticated") {
      fetchRecent()
    }
  }, [status])

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  const userCredits = session?.user?.credits || 0
  const userName = session?.user?.name || "Creator"

  const styles = [
    { id: "mrbeast", label: "MrBeast Style", desc: "High energy, bold text, vibrant colors" },
    { id: "gaming", label: "Gaming", desc: "Dark theme, neon accents, game UI elements" },
    { id: "tech", label: "Tech", desc: "Clean, minimalist, futuristic aesthetics" },
    { id: "vlog", label: "Vlog", desc: "Personal, authentic, human‑focused" },
    { id: "clickbait", label: "Clickbait", desc: "Shocking imagery, arrows, circles, red text" },
  ]

  const tones = [
    { id: "clickbait", label: "Clickbait" },
    { id: "professional", label: "Professional" },
    { id: "funny", label: "Funny" },
    { id: "mysterious", label: "Mysterious" },
    { id: "emotional", label: "Emotional" },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    if (userCredits < 1) {
      alert("Not enough credits! Please upgrade your plan.")
      return
    }
    setIsGenerating(true)
    
    try {
      const response = await fetch("/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, tone, textOverlay }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate thumbnail")
      }

      setGeneratedImage(data.thumbnail.imageUrl)
      
      if (update) {
        await update({ credits: data.thumbnail.remainingCredits })
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return
    alert("Downloading thumbnail...")
    // Actual download logic would go here
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-400">Generate viral thumbnails that boost your CTR.</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Credits remaining</p>
                <p className="text-2xl font-bold">{userCredits}</p>
              </div>
            </CardContent>
          </Card>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            <a href="/billing">
              <CreditCard className="mr-2 h-4 w-4" /> Buy Credits
            </a>
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column: Generator */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Create New Thumbnail</CardTitle>
              <CardDescription>Describe your video and let AI do the magic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="prompt">Thumbnail Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="e.g., A tech reviewer holding the latest smartphone with shocked expression, studio lighting, hyper‑detailed"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-gray-800 border-gray-700 mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tip: Be specific about emotions, objects, lighting, and composition.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Style</Label>
                  <Select value={style} onValueChange={(val) => setStyle(val || "")}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 mt-2">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {styles.find(s => s.id === style)?.desc}
                  </p>
                </div>

                <div>
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={(val) => setTone(val || "")}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 mt-2">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="textOverlay">Text Overlay (Optional)</Label>
                <Input
                  id="textOverlay"
                  placeholder="e.g., YOU WON'T BELIEVE THIS!"
                  value={textOverlay}
                  onChange={(e) => setTextOverlay(e.target.value)}
                  className="bg-gray-800 border-gray-700 mt-2"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || userCredits < 1}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg"
                >
                  {isGenerating ? (
                    <>Generating... <RefreshCw className="ml-2 h-5 w-5 animate-spin" /></>
                  ) : (
                    <>Generate Thumbnail (1 Credit) <Sparkles className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
                {userCredits < 1 && (
                  <p className="text-red-400 text-sm mt-2 text-center">
                    You’re out of credits. <a href="/billing" className="underline">Buy more</a> to continue.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Result */}
          {generatedImage && (
            <Card className="bg-gray-900 border-gray-800 mt-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Generated Thumbnail</span>
                  <Badge className="bg-green-900/30 text-green-300">Ready to download</Badge>
                </CardTitle>
                <CardDescription>Your AI‑generated thumbnail is ready. Download and use it anywhere.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-gray-800 rounded-xl overflow-hidden">
                  <img
                    src={generatedImage}
                    alt="Generated thumbnail"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <Button onClick={handleDownload} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600">
                    <Download className="mr-2 h-5 w-5" /> Download HD (1280×720)
                  </Button>
                  <Button onClick={handleRegenerate} variant="outline" className="flex-1">
                    <RefreshCw className="mr-2 h-5 w-5" /> Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Stats & History */}
        <div className="space-y-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Credits Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(userCredits / 100) * 100} className="h-2" />
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-400">Used: {100 - userCredits}</span>
                <span className="text-gray-400">Remaining: {userCredits}</span>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Your plan: <Badge className="ml-2">{session?.user?.subscriptionPlan || "Free"}</Badge>
              </p>
              <Button variant="outline" className="w-full mt-6">
                <a href="/billing">Upgrade Plan</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" /> Recent Generations
              </CardTitle>
              <CardDescription>Your last 3 thumbnails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentGenerations.length === 0 ? (
                <p className="text-sm text-gray-500">No thumbs generated yet.</p>
              ) : (
                recentGenerations.map((gen) => (
                  <div key={gen.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
                    <div className="h-12 w-20 rounded bg-gradient-to-r from-purple-900 to-pink-900 flex-shrink-0 overflow-hidden">
                      <img src={gen.imageUrl} alt={gen.prompt} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{gen.prompt}</p>
                      <p className="text-xs text-gray-400">{new Date(gen.createdAt).toLocaleDateString()} • {gen.creditsUsed} credit</p>
                    </div>
                    <Button size="sm" variant="ghost" className="ml-auto flex-shrink-0" onClick={() => window.open(gen.imageUrl, '_blank')}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
              <Button variant="outline" className="w-full">
                <a href="/history">View Full History</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Tips for Better Thumbnails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>Use high‑contrast colors to stand out in recommendations.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>Include human faces with expressive emotions (surprise, joy, shock).</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>Keep text large and legible even on mobile screens.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}