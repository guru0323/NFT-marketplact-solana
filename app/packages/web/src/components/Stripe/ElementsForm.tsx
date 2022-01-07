import React, { useState } from 'react';

import CardIcon from '../svgs/Card';
import CalendarIcon from '../svgs/calendar';
import LockIcon from '../svgs/lock';
import { CustomDonationInput } from './CustomDonationInput';
import { StripeTestCards } from './StripeTestCards';
import { PrintObject } from './PrintObject';

import { fetchPostJSON } from '../../utils/stripe';
import { formatAmountForDisplay } from '../../utils/stripe';
import * as config from '../../config/stripe';

import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentElement,
} from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      iconColor: '#fcfdfe',
      color: '#fcfdfe',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#fcfdfe',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
};

export const ElementsForm = () => {
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    cardholderName: '',
  });
  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>;

      case 'requires_action':
        return <h2>Authenticating...</h2>;

      case 'succeeded':
        return <h2>Payment Succeeded 🥳</h2>;

      case 'error':
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    setPayment({ status: 'processing' });

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: input.customDonation,
    });
    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({ status: 'error' });
      setErrorMessage(response.message);
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements!.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement!,
          billing_details: { name: input.cardholderName },
        },
      },
    );

    if (error) {
      setPayment({ status: 'error' });
      setErrorMessage(error.message ?? 'An unknown error occured');
    } else if (paymentIntent) {
      setPayment(paymentIntent);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <CustomDonationInput
          className="elements-style"
          name="customDonation"
          value={input.customDonation}
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
        /> */}
        {/* <StripeTestCards /> */}
        <fieldset className="elements-style">
          <legend>Your payment details:</legend>
          <hr />
          <label htmlFor="cardholderName">First Name: </label>
          <input
            placeholder="First Name"
            className="elements-style input_form"
            type="Text"
            name="cardholderName"
            onChange={handleInputChange}
            required
          />
          <hr />
          <label htmlFor="cardholderName">Last Name: </label>
          <input
            placeholder="Last Name"
            className="elements-style input_form"
            type="Text"
            name="cardholderName"
            onChange={handleInputChange}
            required
          />
          <hr />
          <label htmlFor="cardholderName">Email: </label>
          <input
            placeholder="Cardholder Email"
            className="elements-style input_form"
            type="email"
            name="cardholderName"
            onChange={handleInputChange}
            required
          />
          <hr />
          <label htmlFor="cardholderName">Address: </label>
          <input
            placeholder="Cardholder Address"
            className="elements-style input_form"
            type="text"
            name="cardholderName"
            onChange={handleInputChange}
            required
          />
          <hr />

          <div className=" elements-style card_panel">
            <div
              style={{ padding: '3px', border: '1px solid', display: 'flex' }}
            >
              <CardIcon />
              <div className='card_element'>
            
                <CardNumberElement
                  options={CARD_OPTIONS}
                  onChange={e => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage(
                        e.error.message ?? 'An unknown error occured',
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="card_items">
                <CalendarIcon/>
                <div className='card_element'>
                <CardExpiryElement
                  options={CARD_OPTIONS}
                  onChange={e => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage(
                        e.error.message ?? 'An unknown error occured',
                      );
                    }
                  }}
                />
                </div>
              </div>
              <div className="card_items">
                <LockIcon/>
                <div className='card_element'>
                <CardCvcElement
                  options={CARD_OPTIONS}
                  onChange={e => {
                    if (e.error) {
                      setPayment({ status: 'error' });
                      setErrorMessage(
                        e.error.message ?? 'An unknown error occured',
                      );
                    }
                  }}
                />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
         <button
          className="elements-style-background purhcase_button"
          type="submit"
          disabled={
            !['initial', 'succeeded', 'error'].includes(payment.status) ||
            !stripe
          }
        >
          Purchase 
        </button>
      </form>
      <PaymentStatus status={payment.status} />
      {/* <PrintObject content={payment} /> */}
    </>
  );
};
