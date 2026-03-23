"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Zap, RefreshCw, Shield } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function BillingPage() {
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  const currentPlan = session?.user?.subscriptionPlan || "FREE"
  const currentCredits = session?.user?.credits || 0

  const plans = [
    {
      name: "Free",
      price: "$0",
      credits: 5,
      features: ["5 credits on signup", "Basic styles", "Watermarked downloads", "Community support"],
      recommended: false,
      stripePriceId: "",
    },
    {
      name: "Basic",
      price: "$9.99",
      credits: 100,
      features: ["100 credits/month", "All thumbnail styles", "No watermark", "Priority support", "High‑resolution"],
      recommended: true,
      stripePriceId: "price_basic_monthly",
    },
    {
      name: "Pro",
      price: "$29.99",
      credits: 500,
      features: ["500 credits/month", "Custom styles", "Batch generation", "API access", "Dedicated support"],
      recommended: false,
      stripePriceId: "price_pro_monthly",
    },
  ]

  const creditPacks = [
    { credits: 50, price: "$4.99", perCredit: "$0.10" },
    { credits: 150, price: "$12.99", perCredit: "$0.087", popular: true },
    { credits: 500, price: "$39.99", perCredit: "$0.08" },
  ]

  const handleSubscribe = async (priceId: string, planName: string) => {
    // In a real app, you would call the Stripe checkout API
    alert(`Redirecting to Stripe checkout for ${planName}...`)
  }

  const handleBuyCredits = async (credits: number, price: string) => {
    alert(`Purchasing ${credits} credits for ${price}...`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Billing & Credits</h1>
        <p className="text-gray-400">Manage your subscription and purchase credits.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-between">
                <span>Current Plan</span>
                <Badge className="bg-purple-900/30 text-purple-300">
                  {currentPlan} • {currentCredits} credits left
                </Badge>
              </CardTitle>
              <CardDescription>
                Your current subscription details and credit balance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-semibold">Credits Balance</h3>
                    </div>
                    <p className="text-3xl font-bold">{currentCredits}</p>
                    <p className="text-sm text-gray-400">1 credit = 1 thumbnail</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Current Plan</h3>
                    </div>
                    <p className="text-3xl font-bold">{currentPlan}</p>
                    <p className="text-sm text-gray-400">
                      {currentPlan === "FREE" ? "No recurring charges" : "Renews monthly"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Status</h3>
                    </div>
                    <p className="text-3xl font-bold">
                      {session?.user?.subscriptionStatus === "ACTIVE" ? "Active" : "Inactive"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {session?.user?.subscriptionStatus === "ACTIVE" ? "Auto‑renew enabled" : "No active subscription"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={`bg-gray-900 border-gray-800 ${plan.recommended ? "border-2 border-purple-500" : ""}`}
                    >
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          {plan.name}
                          {plan.recommended && <Badge className="bg-purple-600">Recommended</Badge>}
                        </CardTitle>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-gray-400">/month</span>
                        </div>
                        <CardDescription>{plan.credits} credits included</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full ${plan.name === currentPlan ? "bg-gray-800" : "bg-gradient-to-r from-purple-600 to-pink-600"}`}
                          disabled={plan.name === currentPlan}
                          onClick={() => handleSubscribe(plan.stripePriceId, plan.name)}
                        >
                          {plan.name === currentPlan ? "Current Plan" : "Upgrade"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Packs */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Buy Additional Credits</CardTitle>
              <CardDescription>
                Need more credits? Top up anytime. Credits never expire.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {creditPacks.map((pack) => (
                  <Card
                    key={pack.credits}
                    className={`bg-gray-800/50 border-gray-700 ${pack.popular ? "border-2 border-yellow-500" : ""}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-center">
                        {pack.credits} Credits
                      </CardTitle>
                      {pack.popular && (
                        <Badge className="w-fit mx-auto bg-yellow-900/30 text-yellow-300">Most Popular</Badge>
                      )}
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-4xl font-bold">{pack.price}</p>
                      <p className="text-gray-400">${pack.perCredit} per credit</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                        onClick={() => handleBuyCredits(pack.credits, pack.price)}
                      >
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Billing FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold">Do credits roll over?</h4>
                <p className="text-gray-400">Yes! Unused credits never expire, even if you cancel your subscription.</p>
              </div>
              <div>
                <h4 className="font-semibold">Can I change plans?</h4>
                <p className="text-gray-400">You can upgrade or downgrade anytime. Changes apply to the next billing cycle.</p>
              </div>
              <div>
                <h4 className="font-semibold">What payment methods?</h4>
                <p className="text-gray-400">We accept all major credit cards, PayPal, and crypto via Stripe.</p>
              </div>
              <div>
                <h4 className="font-semibold">Need a refund?</h4>
                <p className="text-gray-400">Contact support within 14 days of purchase for a full refund.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" /> Upgrade Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>Select a plan or credit pack above.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>You’ll be redirected to Stripe for secure payment.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>Credits are added instantly upon successful payment.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <p>Manage your subscription anytime from this page.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Need More?</CardTitle>
              <CardDescription>Custom enterprise plans available.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                For teams, agencies, or high‑volume creators, we offer custom pricing with unlimited generations, white‑labeling, and dedicated infrastructure.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
                Request Enterprise Quote
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}