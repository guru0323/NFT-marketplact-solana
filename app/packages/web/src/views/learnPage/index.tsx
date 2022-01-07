import React from 'react';
import { LABELS } from '../../constants';
import { InstructionsLayout } from '../../components/InstructionsLayout'

export const LearnPageView = (props: {
}) => {
  return (
    <InstructionsLayout
      pageTitle="How Auctions Work"
      cardProps={[
        {
          title: 'Placing a Bid',
          description: `Once you find an NFT you’d like to own, place a bid on the auction page. Keep in mind the amount of SOL you bid will be locked in your wallet for the remainder of the auction.`,
          imgSrc: '/modals/how-auctions-work-1.jpg',
        },
        {
          title: 'Winning an Auction',
          description: `Keep an eye on the auctions page (and your notifications) to know when you’ve been outbid, and how the sale is progressing.`,
          imgSrc: '/modals/how-auctions-work-2.jpg',
        },
        {
          title: 'Redeeming your NFT',
          description: `If you’re lucky enough to win your NFT auction, you’ll have to redeem it to add it to your wallet. This can be done from the auction, winning notification, or your profile on ${LABELS.STORE_NAME}.`,
          imgSrc: '/modals/how-auctions-work-3.jpg',
        },
        {
          title: 'Create a SOL wallet',
          imgSrc: '/modals/how-to-buy-1.svg',
          description: `SOL is the cryptocurrency we use for purchases on ${LABELS.STORE_NAME}. To keep your SOL safe, you’ll need a crypto wallet—we recommend using one called Phantom. Just head to Phantom’s site, install the Chrome extension, and create an account.`,
        },
        {
          title: 'Add funds to your wallet',
          imgSrc: '/modals/how-to-buy-2.svg',
          description: `To fund your wallet, you’ll need to purchase SOL tokens. The easiest way is with a credit card on FTX Pay—a service that’s already part of your new Phantom wallet. Open your wallet, tap “Deposit SOL”, and select “Deposit from FTX”. A new window will open where you can create an FTX account and purchase SOL.`,
        },
        {
          title: `Connect your wallet to ${LABELS.STORE_NAME}.`,
          imgSrc: '/modals/how-to-buy-3.jpg',
          description: `To connect your wallet, tap “Connect Wallet” here on the site. Select the Phantom option, and your wallet will connect. After that, you can start bidding on NFTs.`,
        },
      ]}
    />
  );
};
