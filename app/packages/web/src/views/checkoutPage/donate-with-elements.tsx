import { NextPage } from 'next'

import { Elements } from '@stripe/react-stripe-js'
import { getStripe }  from '@stripe/checkout'
import { Layout }  from '@stripe/checkout'
import { ElementsForm }  from '@stripe/checkout'

const DonatePage: NextPage = () => {
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

export default DonatePage
