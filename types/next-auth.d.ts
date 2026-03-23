import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      credits: number
      subscriptionPlan: string
      subscriptionStatus: string
      stripeCustomerId?: string
    } & DefaultSession["user"]
  }

  interface User {
    credits?: number
    subscriptionPlan?: string
    subscriptionStatus?: string
    stripeCustomerId?: string
  }
}