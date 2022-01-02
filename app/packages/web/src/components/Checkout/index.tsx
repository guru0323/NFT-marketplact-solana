import { ArrowButton, StringPublicKey } from '@oyster/common';
import { Button, Space } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';


import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '../../utils/stripe'
import { Layout } from '../Stripe'
import { ElementsForm } from  '../Stripe'


export const Checkout = (props: {
  nft?: {
    metadataAccount: StringPublicKey;
  };
  alert?: string;
}) => {
  const history = useHistory();


  if (props.alert) {
    // TODO  - properly reset this components state on error
    return (
      <Space className="metaplex-fullwidth" direction="vertical" align="center">
        <div>
          <h2>Sorry, there was an error!</h2>
          <p>{props.alert}</p>
        </div>
        <Button type="primary" onClick={() => history.push('/artworks/new')}>
          Back to Create NFT
        </Button>
      </Space>
    );
  }

  return (
    <Space className="metaplex-fullwidth" direction="vertical" align="center">
      <Space className="metaplex-space-align-stretch" direction="vertical">
        <Layout title="Donate with Elements | Next.js + TypeScript Example">
          <div className="page-container">
            <h1>Donate with Elements</h1>
            <p>Donate to our project 💖</p>
            <Elements stripe={getStripe()}>
              <ElementsForm />
            </Elements>
          </div>
        </Layout>
      </Space>
    </Space>
  );
};
