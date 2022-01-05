import React from 'react'
import { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export function ClearCart() {
  const { clearCart } = useShoppingCart()

  useEffect(() => clearCart(), [clearCart])

  return <p>Cart cleared.</p>
}