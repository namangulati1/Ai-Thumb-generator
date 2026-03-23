import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Sparkles, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      credits: 5,
      features: ["5 free credits", "Basic thumbnail styles", "Community support", "Watermarked downloads"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Basic",
      price: "$9.99",
      credits: 100,
      features: ["100 credits/month", "All thumbnail styles", "Priority support", "No watermark", "High-resolution"],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Pro",
      price: "$29.99",
      credits: 500,
      features: ["500 credits/month", "All styles + custom", "Dedicated support", "Batch generation", "API access"],
      cta: "Go Pro",
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-purple-500" />
          <span className="text-2xl font-bold">ThumbnailAI</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#features" className="hover:text-purple-400 transition">Features</a>
          <a href="#pricing" className="hover:text-purple-400 transition">Pricing</a>
          <a href="#how" className="hover:text-purple-400 transition">How It Works</a>
        </nav>
        <div className="flex gap-4">
          <Button variant="outline">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-purple-900/30 text-purple-300 border-purple-700">AI-Powered Thumbnails</Badge>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Generate <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Viral YouTube Thumbnails</span> with AI
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Enter a prompt, choose a style, and get high‑converting thumbnails in seconds. Optimized for clicks, built for creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
            <Link href="/dashboard">
              Start Generating <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </div>
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
          <div className="border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Dashboard preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Why ThumbnailAI?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-500 mb-4" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription className="text-gray-400">Generate thumbnails in under 10 seconds with our optimized AI pipeline.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Sparkles className="h-10 w-10 text-purple-500 mb-4" />
              <CardTitle>AI‑Optimized</CardTitle>
              <CardDescription className="text-gray-400">Trained on thousands of high‑performing thumbnails to maximize CTR.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Shield className="h-10 w-10 text-green-500 mb-4" />
              <CardTitle>Commercial Rights</CardTitle>
              <CardDescription className="text-gray-400">All generated images are yours to use anywhere, forever.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-400 text-center mb-12">Pay per thumbnail or subscribe for unlimited creativity.</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-gray-900 border-gray-800 ${plan.highlighted ? "border-2 border-purple-500 relative" : ""}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-300">{plan.credits} credits included</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.highlighted ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-800"}`}
                >
                  <Link href="/dashboard">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-800 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to boost your CTR?</CardTitle>
            <CardDescription className="text-gray-300 text-xl">
              Join 10,000+ creators who trust ThumbnailAI for their thumbnails.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-10 py-6">
              <Link href="/dashboard">
                Generate Your First Thumbnail <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-10 border-t border-gray-800 text-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">ThumbnailAI</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
        <p className="text-center mt-8">© {new Date().getFullYear()} ThumbnailAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
