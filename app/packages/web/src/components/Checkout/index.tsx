import { StringPublicKey } from '@oyster/common';
import { Space } from 'antd';
import React, { useState } from 'react'

import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import { PaymentElement } from '@stripe/react-stripe-js';
import { getStripe } from '../../utils/stripe'
import { Layout } from '../Stripe'
import { ElementsForm } from  '../Stripe'
import { string } from '@hapi/joi';

import { fetchGetJSON, fetchPostJSON } from '../../utils/stripe'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Component } from 'react';

import { NextApiRequest, NextApiResponse } from 'next';
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT, AMOUNT_STEP } from '../../config/stripe';
import { formatAmountForStripe } from '../../utils/stripe';

import { Stripe as _Stripe } from 'stripe';

import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';

import getConfig from 'next/config';

import { buffer } from 'micro';
import Cors from 'micro-cors';
import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { VOTE_PROGRAM_ID } from '@solana/web3.js';

import nextSession from "next-session";


const {serverRuntimeConfig, publicRuntimeConfig } = getConfig();

/*
const production = serverRuntimeConfig.nodeEnv === 'production';
const dev = !production;
const app = next({ dev });
const handle = app.getRequestHandler();
*/

type CheckoutProps = {
  payment: string;
  setErrorMessage: string;
  setInput: string;
  stripeData: Promise<Stripe | null>;
  stripeElements: typeof Elements;
};
type CheckoutState = {
  paymentStatus: string;
  showErrorMessage: string;
  input: any;
  stripeState: any;
  showStripeElements: any;
};

const stripe = new _Stripe(serverRuntimeConfig.stripeSecretKey!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
});

const webhookSecret: string = serverRuntimeConfig.stripeWebhookSecret!;

const getSession = nextSession();

// Stripe requires the raw body to construct the event.
const config = {
  api: {
    bodyParser: false,
  },
};

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
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
}

interface StripeInterface {
  stripe?: Promise<Stripe | null>;
}

export class Checkout extends React.Component<
  CheckoutProps, CheckoutState, StripeInterface
> {
  state: CheckoutState = {
    paymentStatus: 'initial',
    showErrorMessage: '',
    input: '',
    stripeState: '',
    showStripeElements: '',
  }
  result: any;
  elements: any;
  stripe: Promise<Stripe | null>;
  
  constructor (
    props?: any,
  ) {
    super(props);
    this.result = null;
    this.elements = null;
    this.stripe = this.getStripe();
    this.state.paymentStatus;
    this.state.showErrorMessage;
    this.state.input;
  }
  
  paymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>

      case 'requires_action':
        return <h2>Authenticating...</h2>

      case 'succeeded':
        return <h2>Payment Succeeded 🥳</h2>

      case 'error':
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{this.state.showErrorMessage}</p>
          </>
        )

      default:
        return null
    }
  }

  handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
  //  setInput({
  //    ...input,
  //    [e.currentTarget.name]: e.currentTarget.value,
  //  })    
    this.setState((state, props) => {
      return {input: [e.currentTarget.name] + e.currentTarget.value};
    });

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {

    // handleInputChange
    
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    // this.paymentStatus({ status: 'processing' })
    this.setState(state =>({paymentStatus: 'processing' }));
  
    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      // amount: self.input.customDonation,
//      amount: this.props.setInput.customDonation,
    });
    console.log(`response: ${response}`);
    // setPayment(response)
    this.setState(state =>({paymentStatus: response }));
  
    // if (response.statusCode === 500) {
    if (Number(this.state.paymentStatus) === 500 ) {
      // setPayment({ status: 'error' })
      this.setState(state =>({paymentStatus:  'error'}))
      // setErrorMessage(response.message)
      return
    };
  
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
  
  
//    const cardElement = elements!.getElement(CardElement)
  
    // Use your card Element with other Stripe.js APIs

/*
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
//          card: cardElement!,
          billing_details: { name: input.cardholderName },
        },
      }
    )
  
    if (error) {
      setPayment({ status: 'error' })
      setErrorMessage(error.message ?? 'An unknown error occured')
    } else if (paymentIntent) {
      setPayment(paymentIntent)
    }
*/
  }

  getStripe = () => {

  //  const [this.input, this.setInput] = useState({
  //    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  //    cardholderName: '',
  //   });
  //   this.setState(state =>({input:  Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)}));
     

  //  const [payment, setPayment] = useState({ status: 'initial' });
  //  const [errorMessage, setErrorMessage] = useState('');

    if (!this.stripe) {
      this.stripe = loadStripe(publicRuntimeConfig.publicStripePublishableKey!);
      const stripeId = '12345'
      console.info(`------------>  loading stripe api: ${stripeId}`)
    }
    this.setState(state =>({stripeState:  this.stripe}));
    return this.stripe
    

   // var elements = this.stripe.elements({
   //   clientSecret: publicRuntimeConfig.publicStripePublishableKey,
   // });

/*  
   CardElement.on('change', function(event) {
    if (event.complete) {
      console.log(`completed event: ${event}`);
    }
  });
*/

  //  const sessions = this.stripe.checkout.sessions
    const sessions = 'test_session'
    console.info(`------------>  sessions: ${sessions}`)

//    const res = fetchPostJSON('/api/payment_intents', {});
/* 
    stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
        return_url: 'https://example.com',
      },
    })
    .then(function(result) {
      if (result.error)
      // Inform the customer that there was an error.
    });
*/

/*
//    const id: string = req.query.id as string;
    try {
      if (!id.startsWith('cs_')) {
        throw Error('Incorrect CheckoutSession ID.');
      }
      const checkout_session: _Stripe.Checkout.Session =
      this.stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['payment_intent'],
        });
      console.log(`response: ${res}`);
      console.log(`keys: ${Object.keys(res)}`);

    //  res.status(200).json(checkout_session);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
*/
  };
/*
  ElementsForm = () => {
    /*
    const [input, setInput] = useState({
      customDonation: Math.round(MAX_AMOUNT / AMOUNT_STEP),
      cardholderName: '',
    })

    this.setState((state, props) => {
      return {
        customDonation: Math.round(MAX_AMOUNT / AMOUNT_STEP),
        cardholderName: '',
      };
    });
    const [payment, setPayment] = useState({ status: 'initial' })
    const [errorMessage, setErrorMessage] = useState('')
    const stripe = useStripe()
    const elements = useElements()
  }
*/

  displayPaymentForm = () => {
    this.getStripe();
    return (
      <Space className="metaplex-fullwidth" direction="vertical" align="center">
        <Space className="metaplex-space-align-stretch" direction="vertical">
          <Layout title="Page Title">
            <div className="page-container">
              <h1>Page Container</h1>
              <p>Page Text</p>
              <Elements stripe = { this.stripe! } >
                <ElementsForm />
              </Elements>
            </div>
          </Layout>
        </Space>
      </Space>
    );
  };

  processPayment = (props: {
    nft?: {
      metadataAccount: StringPublicKey;
    };
    alert?: string;
  }) => {
    if (props.alert) {
      // TODO  - properly reset this components state on error
      return (
        <Space className="metaplex-fullwidth" direction="vertical" align="center">
          <div>
            <h2>Sorry, there was an error!</h2>
            <p>{props.alert}</p>
          </div>
        </Space>
      );
    }

    return (
      <this.displayPaymentForm/>
    );
  };
}