import React from 'react';
import products from '../data/products.json';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
export var Products = function () {
    var _a = useShoppingCart(), addItem = _a.addItem, removeItem = _a.removeItem;
    return (React.createElement("section", { className: "products" }, products.map(function (product) { return (React.createElement("div", { key: product.sku, className: "product" },
        React.createElement("img", { src: product.image, alt: product.name }),
        React.createElement("h2", null, product.name),
        React.createElement("p", { className: "price" }, formatCurrencyString({
            value: product.price,
            currency: product.currency,
        })),
        React.createElement("button", { className: "cart-style-background", onClick: function () { return addItem(product); } }, "Add to cart"),
        React.createElement("button", { className: "cart-style-background", onClick: function () { return removeItem(product.sku); } }, "Remove"))); })));
};
//# sourceMappingURL=Products.js.map