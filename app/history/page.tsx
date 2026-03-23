"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Filter, Search, Calendar, Image as ImageIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function HistoryPage() {
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  const generations = [
    {
      id: "gen_001",
      prompt: "Tech reviewer holding latest smartphone with shocked expression",
      style: "Tech",
      credits: 1,
      date: "2026-03-20",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=225&fit=crop",
      status: "completed",
    },
    {
      id: "gen_002",
      prompt: "MrBeast style thumbnail with money explosion background",
      style: "MrBeast",
      credits: 1,
      date: "2026-03-19",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
      status: "completed",
    },
    {
      id: "gen_003",
      prompt: "Gaming thumbnail with neon lights and controller",
      style: "Gaming",
      credits: 1,
      date: "2026-03-18",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w-400&h=225&fit=crop",
      status: "completed",
    },
    {
      id: "gen_004",
      prompt: "Vlog thumbnail with smiling creator pointing at camera",
      style: "Vlog",
      credits: 1,
      date: "2026-03-17",
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=225&fit=crop",
      status: "completed",
    },
    {
      id: "gen_005",
      prompt: "Clickbait thumbnail with red arrows and shocking text",
      style: "Clickbait",
      credits: 1,
      date: "2026-03-16",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
      status: "completed",
    },
    {
      id: "gen_006",
      prompt: "Minimalist tech thumbnail with futuristic UI elements",
      style: "Tech",
      credits: 1,
      date: "2026-03-15",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
      status: "completed",
    },
  ]

  const handleDownload = (id: string) => {
    alert(`Downloading generation ${id}...`)
  }

  const handleRegenerate = (id: string) => {
    alert(`Regenerating ${id}...`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Generation History</h1>
        <p className="text-gray-400">View, manage, and re‑download all your AI‑generated thumbnails.</p>
      </header>

      {/* Filters & Search */}
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by prompt, style, or date..."
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Date Range
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Export All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Generations</p>
                <p className="text-3xl font-bold">42</p>
              </div>
              <ImageIcon className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Credits Spent</p>
                <p className="text-3xl font-bold">42</p>
              </div>
              <Badge className="bg-yellow-900/30 text-yellow-300 text-lg">42</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Favorite Style</p>
                <p className="text-3xl font-bold">Tech</p>
              </div>
              <Badge className="bg-blue-900/30 text-blue-300">12 uses</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Last Generated</p>
                <p className="text-3xl font-bold">2 days ago</p>
              </div>
              <Calendar className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generations List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>All Thumbnails</CardTitle>
          <CardDescription>
            Sorted by most recent. Click any thumbnail to preview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Thumbnail</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Prompt</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Style</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Credits</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {generations.map((gen) => (
                  <tr key={gen.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-4 px-4">
                      <div className="h-16 w-28 rounded-md overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
                        <img
                          src={gen.imageUrl}
                          alt={gen.prompt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium max-w-xs truncate">{gen.prompt}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-gray-800 text-gray-300">{gen.style}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-purple-900/30 text-purple-300">{gen.credits} credit</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{gen.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(gen.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600"
                          onClick={() => handleRegenerate(gen.id)}
                        >
                          Regenerate
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-gray-400">Showing 6 of 42 generations</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-gray-800">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Download Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-300">
              All thumbnails are generated at 1280×720px (HD) and are optimized for YouTube.
            </p>
            <p className="text-gray-300">
              You can re‑download any previous generation at no extra cost.
            </p>
            <p className="text-gray-300">
              Need a different format or size? Contact support for custom exports.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Missing a thumbnail?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              If you can’t find a generation, it may have been deleted after 90 days (Free plan) or you may have exceeded your storage limit.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}