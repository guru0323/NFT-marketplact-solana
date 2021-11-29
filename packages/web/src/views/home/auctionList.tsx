import {LoadingOutlined} from '@ant-design/icons';
import {useStore} from '@oyster/common';
import {useWallet} from '@solana/wallet-adapter-react';
import {Alert, Button, Spin} from 'antd';
import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import {Link} from 'react-router-dom';
import {AuctionRenderCard} from '../../components/AuctionRenderCard';
import {MetaplexMasonry} from '../../components/MetaplexMasonry';
import {
  useAuctionManagersToCache,
  useInfiniteScrollAuctions,
} from '../../hooks';
import {Banner} from '../../components/Banner';
// import {useAuctionStatus} from '../../components/AuctionRenderCard/hooks/useAuctionStatus';

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

export const AuctionListView = () => {
  const {
    auctions,
    loading,
    initLoading,
    hasNextPage,
    loadMore,
  } = useInfiniteScrollAuctions();

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 200px 0px',
  });

  const {ownerAddress, storefront} = useStore();
  const wallet = useWallet();
  const {auctionManagerTotal, auctionCacheTotal} = useAuctionManagersToCache();
  const isStoreOwner = ownerAddress === wallet.publicKey?.toBase58();
  const notAllAuctionsCached = auctionManagerTotal !== auctionCacheTotal;
  const showCacheAuctionsAlert = isStoreOwner && notAllAuctionsCached;

  return initLoading ? (
    <div className='app-section--loading'>
      <Spin indicator={<LoadingOutlined />} />
    </div>
  ) : (
    <>
      {showCacheAuctionsAlert && (
        <Alert
          message='Attention Store Owner'
          className='app-alert-banner metaplex-spacing-bottom-lg'
          description={
            <p>
              Make your storefront faster by enabling listing caches.{' '}
              {auctionCacheTotal}/{auctionManagerTotal} of your listing have a
              cache account. Watch this{' '}
              <a
                rel='noopener noreferrer'
                target='_blank'
                href='https://youtu.be/02V7F07DFbk'>
                video
              </a>{' '}
              for more details and a walkthrough. On November 17rd storefronts
              will start reading from the cache for listings. All new listing
              are generating a cache account.
            </p>
          }
          type='info'
          showIcon
          action={
            <Link to='/admin'>
              <Button>Visit Admin</Button>
            </Link>
          }
        />
      )}
      {storefront.theme.banner && (
        <Banner
          src={storefront.theme.banner}
          headingText={''}
          subHeadingText={''}
        />
      )}
      <MetaplexMasonry>
        {auctions.map((m, idx) => {
          type AuctionStatus =
            | {
                isInstantSale: false;
                isLive: boolean;
                hasBids: boolean;
              }
            | {
                isInstantSale: true;
                isLive: boolean;
                soldOut: boolean;
              };

          interface AuctionStatusLabels {
            status: AuctionStatus;
            amount: string | number;
          }

          const useAuctionStatus = (
            auctionView: any
          ): AuctionStatusLabels => {

            const countdown = auctionView.auction.info.timeToEnd();

            let isLive = auctionView.state !== false;

            if (auctionView.isInstantSale) {

              return {
                status: {isInstantSale: true, isLive, soldOut:0},
                amount:0,
              };
            }

            isLive =
              isLive &&
              !(
                countdown?.days === 0 &&
                countdown?.hours === 0 &&
                countdown?.minutes === 0 &&
                countdown?.seconds === 0
              );

            return {
              status: {
                isInstantSale: false,
                isLive,
                hasBids: false,
              },
              amount: 0,
            };
          };

          const id = m.auction.pubkey;

          const {status} = useAuctionStatus(m);
          return (
            // status.isInstantSale &&
            status.isLive && (
              <Link to={`/auction/${id}`} key={idx}>
                <AuctionRenderCard key={id} auctionView={m} />
              </Link>
            )
          );
        })}
      </MetaplexMasonry>
      {hasNextPage && (
        <div className='app-section--loading' ref={sentryRef}>
          <Spin indicator={<LoadingOutlined />} />
        </div>
      )}
    </>
  );
};
