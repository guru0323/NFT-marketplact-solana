import React from 'react';
import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
export function ClearCart() {
    var clearCart = useShoppingCart().clearCart;
    useEffect(function () { return clearCart(); }, [clearCart]);
    return React.createElement("p", null, "Cart cleared.");
}
//# sourceMappingURL=ClearCart.js.map