import { NextPage } from 'next'

import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '../../utils/stripe'
import { Layout } from '../../components/Stripe'
import { ElementsForm } from '../../components/Stripe'


export const CheckoutPageView: NextPage = () => {
  return (
    <Layout title="Donate with Elements | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Donate with Elements</h1>
        <p>Donate to our project 💖</p>
        <Elements stripe={getStripe()}>
          <ElementsForm />
        </Elements>
      </div>
    </Layout>
  )
}
