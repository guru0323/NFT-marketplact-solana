import React from 'react';
import { CartProvider } from 'use-shopping-cart';
import { getStripe } from '../utils/get-stripejs';
import * as config from '../config';
export var Cart = function (_a) {
    var children = _a.children;
    return (React.createElement(CartProvider, { mode: "checkout-session", stripe: getStripe(), currency: config.CURRENCY },
        React.createElement(React.Fragment, null, children)));
};
//# sourceMappingURL=Cart.js.map