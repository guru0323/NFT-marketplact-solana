var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState } from 'react';
import { CustomDonationInput } from '../components/CustomDonationInput';
import { StripeTestCards } from '../components/StripeTestCards';
import { PrintObject } from '../components/PrintObject';
import { fetchPostJSON } from '../utils/api-helpers';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
import * as config from '../config';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
var CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#6772e5',
            color: '#6772e5',
            fontWeight: '500',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                color: '#6772e5',
            },
        },
        invalid: {
            iconColor: '#ef2961',
            color: '#ef2961',
        },
    },
};
export var ElementsForm = function () {
    var _a = useState({
        customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
        cardholderName: '',
    }), input = _a[0], setInput = _a[1];
    var _b = useState({ status: 'initial' }), payment = _b[0], setPayment = _b[1];
    var _c = useState(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var stripe = useStripe();
    var elements = useElements();
    var PaymentStatus = function (_a) {
        var status = _a.status;
        switch (status) {
            case 'processing':
            case 'requires_payment_method':
            case 'requires_confirmation':
                return React.createElement("h2", null, "Processing...");
            case 'requires_action':
                return React.createElement("h2", null, "Authenticating...");
            case 'succeeded':
                return React.createElement("h2", null, "Payment Succeeded \uD83E\uDD73");
            case 'error':
                return (React.createElement(React.Fragment, null,
                    React.createElement("h2", null, "Error \uD83D\uDE2D"),
                    React.createElement("p", { className: "error-message" }, errorMessage)));
            default:
                return null;
        }
    };
    var handleInputChange = function (e) {
        var _a;
        return setInput(__assign(__assign({}, input), (_a = {}, _a[e.currentTarget.name] = e.currentTarget.value, _a)));
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, cardElement, _a, error, paymentIntent;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    // Abort if form isn't valid
                    if (!e.currentTarget.reportValidity())
                        return [2 /*return*/];
                    setPayment({ status: 'processing' });
                    return [4 /*yield*/, fetchPostJSON('/api/payment_intents', {
                            amount: input.customDonation,
                        })];
                case 1:
                    response = _c.sent();
                    setPayment(response);
                    if (response.statusCode === 500) {
                        setPayment({ status: 'error' });
                        setErrorMessage(response.message);
                        return [2 /*return*/];
                    }
                    cardElement = elements.getElement(CardElement);
                    return [4 /*yield*/, stripe.confirmCardPayment(response.client_secret, {
                            payment_method: {
                                card: cardElement,
                                billing_details: { name: input.cardholderName },
                            },
                        })];
                case 2:
                    _a = _c.sent(), error = _a.error, paymentIntent = _a.paymentIntent;
                    if (error) {
                        setPayment({ status: 'error' });
                        setErrorMessage((_b = error.message) !== null && _b !== void 0 ? _b : 'An unknown error occured');
                    }
                    else if (paymentIntent) {
                        setPayment(paymentIntent);
                    }
                    // Clear Card info (is this necessary?)
                    if (cardElement) {
                        cardElement.destroy();
                    }
                    ; // or cardElement.destroy()?
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(CustomDonationInput, { className: "elements-style", name: "customDonation", value: input.customDonation, min: config.MIN_AMOUNT, max: config.MAX_AMOUNT, step: config.AMOUNT_STEP, currency: config.CURRENCY, onChange: handleInputChange }),
            React.createElement(StripeTestCards, null),
            React.createElement("fieldset", { className: "elements-style" },
                React.createElement("legend", null, "Your payment details:"),
                React.createElement("input", { placeholder: "Cardholder name", className: "elements-style", type: "Text", name: "cardholderName", onChange: handleInputChange, required: true }),
                React.createElement("div", { className: "FormRow elements-style" },
                    React.createElement(CardElement, { options: CARD_OPTIONS, onChange: function (e) {
                            var _a;
                            if (e.error) {
                                setPayment({ status: 'error' });
                                setErrorMessage((_a = e.error.message) !== null && _a !== void 0 ? _a : 'An unknown error occured');
                            }
                        } }))),
            React.createElement("button", { className: "elements-style-background", type: "submit", disabled: !['initial', 'succeeded', 'error'].includes(payment.status) ||
                    !stripe },
                "Donate ",
                formatAmountForDisplay(input.customDonation, config.CURRENCY))),
        React.createElement(PaymentStatus, { status: payment.status }),
        React.createElement(PrintObject, { content: payment })));
};
//# sourceMappingURL=ElementsForm.js.map