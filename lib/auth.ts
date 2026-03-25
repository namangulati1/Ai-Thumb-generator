import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id-for-dev",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret-for-dev",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id
        // For development, use mock data
        session.user.credits = 5
        session.user.subscriptionPlan = 'FREE'
        session.user.subscriptionStatus = 'INACTIVE'
        session.user.stripeCustomerId = undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-key-for-development-only",
  session: {
    strategy: "database",
  },
}