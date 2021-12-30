import { NextPage } from 'next'
import Link from 'next/link'
import { Layout }  from '@stripe/checkout'
import { Elements } from '@stripe/react-stripe-js'
import { ElementsForm }  from '@stripe/checkout'
import { getStripe }  from '@stripe/checkout'

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
