import { NextPage } from 'next'

import { Layout } from '../../components/Stripe'
import { Products } from '../../components/Stripe'
import { Cart } from '../../components/Stripe'
import { CartSummary } from '../../components/Stripe'

export const CartPageView: NextPage = () => {
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{' '}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <Cart>
          <CartSummary />
          <Products />
        </Cart>
      </div>
    </Layout>
  )
}
