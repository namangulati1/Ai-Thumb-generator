import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
  typescript: true,
})

// Pricing plans
export const PLANS = {
  FREE: {
    name: 'Free',
    credits: 5,
    price: 0,
    stripePriceId: '',
  },
  BASIC: {
    name: 'Basic',
    credits: 100,
    price: 9.99,
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID!,
  },
  PRO: {
    name: 'Pro',
    credits: 500,
    price: 29.99,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
  PAYG: {
    name: 'Pay-as-you-go',
    credits: 50,
    price: 4.99,
    stripePriceId: process.env.STRIPE_PAYG_PRICE_ID!,
  },
}

export async function createStripeCustomer(email: string, name?: string) {
  return stripe.customers.create({
    email,
    name,
    metadata: {
      signupDate: new Date().toISOString(),
    },
  })
}

export async function createSubscription(customerId: string, priceId: string) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  })
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId)
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId)
}