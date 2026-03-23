"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-md w-full text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-800 rounded-full shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]">
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400 mb-8">Sign in to ThumbnailAI to generate viral thumbnails</p>
          
          <Button 
            className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg tracking-wide rounded-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>
          
          <div className="mt-6 text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  )
}
