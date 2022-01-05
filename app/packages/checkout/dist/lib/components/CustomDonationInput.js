import React from 'react';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
export var CustomDonationInput = function (_a) {
    var name = _a.name, value = _a.value, min = _a.min, max = _a.max, currency = _a.currency, step = _a.step, onChange = _a.onChange, className = _a.className;
    return (React.createElement("label", null,
        "Custom donation amount (",
        formatAmountForDisplay(min, currency),
        "-",
        formatAmountForDisplay(max, currency),
        "):",
        React.createElement("input", { className: className, type: "number", name: name, value: value, min: min, max: max, step: step, onChange: onChange }),
        React.createElement("input", { type: "range", name: name, value: value, min: min, max: max, step: step, onChange: onChange })));
};
//# sourceMappingURL=CustomDonationInput.js.map