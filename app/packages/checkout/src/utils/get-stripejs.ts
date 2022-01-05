/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from '@stripe/stripe-js';

import getConfig from 'next/config';

const nextConfig = getConfig();
const publicRuntimeConfig = nextConfig.publicRuntimeConfig;

let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicRuntimeConfig.publicStripePublishableKey!);
  }
  return stripePromise;
};
