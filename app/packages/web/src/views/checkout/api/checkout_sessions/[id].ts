import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import getConfig from 'next/config';

const nextConfig = getConfig();
const serverRuntimeConfig = nextConfig.serverRuntimeConfig;

const stripe = new Stripe(serverRuntimeConfig.stripeSecretKey!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id: string = req.query.id as string;
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ['payment_intent'],
      });

    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
