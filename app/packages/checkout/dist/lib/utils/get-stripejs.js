/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from '@stripe/stripe-js';
import getConfig from 'next/config';
var nextConfig = getConfig();
var publicRuntimeConfig = nextConfig.publicRuntimeConfig;
var stripePromise;
export var getStripe = function () {
    if (!stripePromise) {
        stripePromise = loadStripe(publicRuntimeConfig.publicStripePublishableKey);
    }
    return stripePromise;
};
//# sourceMappingURL=get-stripejs.js.map