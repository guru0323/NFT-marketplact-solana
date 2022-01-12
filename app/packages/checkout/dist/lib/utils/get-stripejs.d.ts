/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe } from '@stripe/stripe-js';
export declare const getStripe: () => Promise<Stripe | null>;
//# sourceMappingURL=get-stripejs.d.ts.map