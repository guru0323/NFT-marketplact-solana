import { NextPage } from 'next'
import { Layout }  from '@stripe/checkout'
import { CheckoutForm }  from '@stripe/checkout'

const DonatePage: NextPage = () => {
  return (
    <Layout title="Donate with Checkout | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Donate with Checkout</h1>
        <p>Donate to our project 💖</p>
        <CheckoutForm />
      </div>
    </Layout>
  )
}

export default DonatePage
