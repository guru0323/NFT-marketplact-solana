import React, { ReactNode } from 'react'
import { CartProvider } from 'use-shopping-cart'
import { getStripe } from '../../utils/stripe'
import * as config from '../../config/stripe'


export const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
    mode="checkout-session"
    stripe={getStripe()}
    currency={config.CURRENCY}
  >
    <>{children}</>
  </CartProvider>
)
