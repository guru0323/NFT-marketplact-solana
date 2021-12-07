import React from 'react';
import {useRouter} from 'next/router';
import {ConnectButton, useStore} from '@oyster/common';
import {Link} from 'react-router-dom';
import {InstructionsModal} from '../components/InstructionsModal';
export const LandingPageView = () => {
  const router = useRouter();
  const {ownerAddress, storefront} = useStore();
  return (
    <>
      <style global jsx>
        {`
          .ant-layout-header {
            z-index: 2;
          }
          .landing-page {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            // margin-top: px;
          }
          .landing-page-header {
            text-align: center;
          }
          .landing-page-header h1 {
            font-size: 3rem;
          }
          .btn-outline-light {
            color: #f8f9fa;
            border-color: #f8f9fa;
          }
          .landing-page-btn {
            min-width: 7.8125rem;
            height: 4.375rem;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
            border-radius: 0.25rem;
            color: #000 !important;
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            -moz-user-select: none;
            user-select: none;
          }
          .landing-page-btn-explore {
            min-width: 7.8125rem;
            height: 4.375rem;
            background-color: rgb(32, 129, 226);
            border-color: rgb(32, 129, 226);
            border-radius: 0.25rem;
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            -moz-user-select: none;
            user-select: none;
          }
          .landing-page-btn-create {
            min-width: 7.8125rem;
            height: 4.375rem;
            background-color: rgb(53, 56, 64);
            border: 1px solid rgb(21, 27, 34);
            border-radius: 0.25rem;
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            -moz-user-select: none;
            user-select: none;
          }
        `}
      </style>
      <div className={`landing-page`}>
        <div className={`landing-page-header mt-5 mt-md-0`}>
          <div className={`d-flex flex-column justify-content-between mb-5`}>
            <h1 className={`p-3`}>{storefront.meta.title}</h1>
            <p className={`p-2`}>{storefront.meta.description}</p>
            <div
              className={`d-flex flex-row justify-content-center my-3 flex-wrap`}>
              <button
                onClick={() => router.push('https://discord.gg/DnbkrC8')}
                className='btn btn-outline-light landing-page-btn text-uppercase m-3'>
                Discord
              </button>

              <button
                onClick={() => router.push('https://twitter.com/akkoros')}
                className='btn btn-outline-light landing-page-btn text-uppercase m-3'>
                Twitter
              </button>

              <button
                onClick={() =>
                  router.push('https://github.com/AKKOROWEB/akkoro-client')
                }
                className='btn btn-outline-light landing-page-btn text-uppercase m-3'>
                Github
              </button>
              <button
                onClick={() => router.push('https://www.reddit.com/r/AKKOROS/')}
                className='btn btn-outline-light landing-page-btn text-uppercase m-3'>
                Reddit
              </button>
            </div>
          </div>
          <div className={`mt-5`}>
            <Link to='/explore'>
              <button className='btn btn-outline-light landing-page-btn-explore text-uppercase m-3'>
                explore
              </button>
            </Link>
            {/* <Link to='/artworks/new'> */}
              <button title={'Coming Soon'} className='btn btn-outline-light landing-page-btn-create text-uppercase m-3'>
                create
              </button>
            {/* </Link > */}
          </div>
        </div>
        <InstructionsModal
          buttonText='Getting Started'
          modalTitle={`Buying NFTs on AKKOROS`}
          cardProps={[
            {
              title: 'Create a SOL wallet',
              imgSrc: '/modals/how-to-buy-1.svg',
              description: `SOL is the cryptocurrency we use for purchases on AKKOROS. To keep your SOL safe, you’ll need a crypto wallet—we recommend using one called Phantom. Just head to Phantom’s site, install the Chrome extension, and create an account.`,
            },
            {
              title: 'Add funds to your wallet',
              imgSrc: '/modals/how-to-buy-2.svg',
              description: `To fund your wallet, you’ll need to purchase SOL tokens. The easiest way is with a credit card on FTX Pay—a service that’s already part of your new Phantom wallet. Open your wallet, tap “Deposit SOL”, and select “Deposit from FTX”. A new window will open where you can create an FTX account and purchase SOL.`,
            },
            {
              title: `Connect your wallet to AKKOROS.`,
              imgSrc: '/modals/how-to-buy-3.jpg',
              description: `To connect your wallet, tap “Connect Wallet” here on the site. Select the Phantom option, and your wallet will connect. After that, you can start bidding on NFTs.`,
              endElement: <ConnectButton />,
            },
          ]}
        />
      </div>
    </>
  );
};
