"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Sparkles, Zap, Shield, PlayCircle } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const plans = [
    {
      name: "Free", price: "$0", credits: 5,
      features: ["5 free credits", "Basic thumbnail styles", "Community support", "Watermarked downloads"],
      cta: "Get Started", highlighted: false,
    },
    {
      name: "Basic", price: "$9.99", credits: 100,
      features: ["100 credits/month", "All thumbnail styles", "Priority support", "No watermark", "High-resolution"],
      cta: "Start Free Trial", highlighted: true,
    },
    {
      name: "Pro", price: "$29.99", credits: 500,
      features: ["500 credits/month", "All styles + custom", "Dedicated support", "Batch generation", "API access"],
      cta: "Go Pro", highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[0] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-xl sticky top-0 border-b border-white/5 bg-[#030014]/50 z-50 rounded-b-2xl md:rounded-b-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 overflow-hidden">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
              <div className="absolute inset-0 bg-white/20 blur-[2px] opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">ThumbnailAI</span>
          </div>
          <nav className="hidden md:flex gap-8">
            {['Features', 'Pricing', 'How It Works'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" className="hover:bg-white/5 hover:text-white rounded-full px-6 hidden sm:flex font-medium">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button className="rounded-full px-6 bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] font-bold">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </motion.header>

        {/* Hero */}
        <section className="container mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-32 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.div variants={fadeIn}>
              <Badge className="mb-8 px-5 py-2.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 backdrop-blur-md rounded-full text-sm font-semibold tracking-wide shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] hover:bg-purple-500/20 transition-colors cursor-pointer">
                <Sparkles className="h-4 w-4 mr-2 inline-block" />
                The Future of YouTube Growth
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-6xl md:text-[6.5rem] font-black tracking-tighter leading-[1.05] mb-8 max-w-5xl mx-auto drop-shadow-2xl">
              Click-Through Rates that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x bg-[length:200%_auto]">
                Break Algorithms
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Stop guessing. Generate hyper-optimized, viral thumbnails in seconds using AI trained on millions of high-performing YouTube videos.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.7)] transition-all hover:-translate-y-1 font-bold">
                <Link href="/dashboard" className="flex items-center">
                  Start Generating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md font-semibold text-white">
                <Link href="#how" className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5 text-pink-400" /> Watch Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="mt-24 relative max-w-6xl mx-auto perspective-[2000px]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-transparent blur-[100px] -z-10" />
            <motion.div 
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
              style={{ rotateX: "5deg" }}
              className="border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 bg-gray-900/50 backdrop-blur-xl p-2 relative group transition-transform duration-700 transform-gpu preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Dashboard preview"
                className="w-full h-auto rounded-xl ring-1 ring-white/10"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="container mx-auto px-6 py-32 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Unfair Advantage.</motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to dominate the feed and significantly multiply your clicks.</motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Zap, color: "text-amber-400", title: "Lightning Fast", desc: "Generate world-class thumbnails in under 10 seconds. Outpace the competition." },
              { icon: Sparkles, color: "text-purple-400", title: "AI-Optimized", desc: "Trained on high-performing thumbnails to maximize your CTR automatically." },
              { icon: Shield, color: "text-emerald-400", title: "Commercial Rights", desc: "100% yours to use anywhere, forever. Zero royalties or attribution needed." }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden relative group h-full hover:border-purple-500/50 transition-colors duration-500 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="p-8">
                    <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                      <f.icon className={`h-8 w-8 ${f.color}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{f.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-base mt-4 leading-relaxed font-medium">{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-6 py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Scale Without Limits</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Flexible pricing tailored to your channel's massive growth.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={plan.highlighted ? "md:-mt-8 md:mb-8" : ""}
              >
                <Card
                  className={`relative backdrop-blur-2xl transition-all duration-500 h-full ${
                    plan.highlighted 
                      ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/50 shadow-[0_0_80px_-15px_rgba(168,85,247,0.5)] z-10 scale-105" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
                  )}
                  {plan.highlighted && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                  )}
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)] border-0 py-1.5 px-4 text-sm tracking-wide">MOST POPULAR</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pt-12">
                    <CardTitle className={`text-xl font-bold tracking-wide uppercase ${plan.highlighted ? "text-pink-300" : "text-gray-400"}`}>{plan.name}</CardTitle>
                    <div className="mt-8 flex justify-center items-end gap-1">
                      <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                      {plan.price !== "$0" && <span className="text-gray-400 mb-2 font-medium">/mo</span>}
                    </div>
                    <CardDescription className={`font-semibold mt-6 mx-auto w-fit px-4 py-1.5 rounded-full ${plan.highlighted ? "bg-pink-500/20 text-pink-300" : "bg-white/10 text-gray-300"}`}>
                      {plan.credits} credits included
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 py-8">
                    <ul className="space-y-5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm font-medium">
                          <Check className={`h-5 w-5 mr-3 shrink-0 ${plan.highlighted ? "text-pink-400" : "text-purple-400"}`} />
                          <span className="text-gray-200 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-12 px-8">
                    <Button
                      className={`w-full py-7 text-lg rounded-xl font-bold transition-all ${
                        plan.highlighted 
                          ? "bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]" 
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Link href="/dashboard" className="w-full h-full flex items-center justify-center">{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section ref={targetRef} className="container mx-auto px-6 py-32 text-center relative overflow-hidden">
          <motion.div style={{ opacity, scale }} className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-pink-900/30 blur-[100px] rounded-[100px]" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-12 md:p-24 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-[0.03] bg-cover mix-blend-overlay pointer-events-none" />
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Ready to break the algorithm?
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
              Join 10,000+ top creators who trust ThumbnailAI. Your next viral video is one click away.
            </p>
            <Button size="lg" className="px-12 py-8 text-xl rounded-full bg-gradient-to-r from-white to-gray-200 text-black hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] font-black tracking-wide group">
              <Link href="/dashboard" className="flex items-center">
                Start Generating For Free <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span className="font-bold text-lg tracking-tight">ThumbnailAI</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
            <p className="text-sm font-medium text-gray-500">© {new Date().getFullYear()} ThumbnailAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
