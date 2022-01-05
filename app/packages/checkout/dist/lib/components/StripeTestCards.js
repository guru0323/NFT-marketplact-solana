import React from 'react';
export var StripeTestCards = function () {
    return (React.createElement("div", { className: "test-card-notice" },
        "Use any of the",
        ' ',
        React.createElement("a", { href: "https://stripe.com/docs/testing#cards", target: "_blank", rel: "noopener noreferrer" }, "Stripe test cards"),
        ' ',
        "for this demo, e.g.",
        ' ',
        React.createElement("div", { className: "card-number" },
            "4242",
            React.createElement("span", null),
            "4242",
            React.createElement("span", null),
            "4242",
            React.createElement("span", null),
            "4242"),
        "."));
};
//# sourceMappingURL=StripeTestCards.js.map