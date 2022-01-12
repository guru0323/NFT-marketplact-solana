export function formatAmountForDisplay(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    return numberFormat.format(amount);
}
export function formatAmountForStripe(amount, currency) {
    var numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    var parts = numberFormat.formatToParts(amount);
    var zeroDecimalCurrency = true;
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
//# sourceMappingURL=stripe-helpers.js.map