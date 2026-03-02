import Stripe from "stripe"

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set")
  }
  return new Stripe(key, { typescript: true })
}

// Lazy singleton — only instantiated when actually called at runtime
let _stripe: Stripe | null = null

export function getStripeInstance(): Stripe {
  if (!_stripe) {
    _stripe = getStripe()
  }
  return _stripe
}

// For backward compatibility: getter-based export
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripeInstance() as Record<string | symbol, unknown>)[prop]
  },
})
