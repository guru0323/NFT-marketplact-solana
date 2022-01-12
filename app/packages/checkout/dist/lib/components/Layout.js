import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
export var Layout = function (_a) {
    var children = _a.children, _b = _a.title, title = _b === void 0 ? 'TypeScript Next.js Stripe Example' : _b;
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, null,
            React.createElement("title", null, title),
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }),
            React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
            React.createElement("meta", { name: "twitter:site", content: "@thorwebdev" }),
            React.createElement("meta", { name: "twitter:title", content: "TypeScript Next.js Stripe Example" }),
            React.createElement("meta", { name: "twitter:description", content: "Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node." }),
            React.createElement("meta", { name: "twitter:image", content: "https://nextjs-typescript-react-stripe-js.now.sh/social_card.png" })),
        React.createElement("div", { className: "container" },
            React.createElement("header", null,
                React.createElement("div", { className: "header-content" },
                    React.createElement(Link, { href: "/" },
                        React.createElement("a", { className: "logo" },
                            React.createElement("img", { src: "/stripe/logo.png" }))),
                    React.createElement("h1", null,
                        React.createElement("span", { className: "light" }, "Page Header (light)"),
                        React.createElement("br", null),
                        "Page Header"))),
            children),
        React.createElement("div", { className: "banner" },
            React.createElement("span", null,
                "This is a",
                ' ',
                React.createElement("a", { href: "https://www.queendom.io", target: "_blank", rel: "noopener noreferrer" }, "Queendom"),
                ".",
                ' Checkout test, View code on ',
                React.createElement("a", { href: "https://github.com/QueendomDAO/nft-marketplace", target: "_blank", rel: "noopener noreferrer" }, "QueendomDAO"),
                "."))));
};
//# sourceMappingURL=Layout.js.map