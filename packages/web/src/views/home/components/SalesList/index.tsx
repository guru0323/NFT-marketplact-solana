import {useWallet} from '@solana/wallet-adapter-react';
import {Col, Layout, Row, Tabs} from 'antd';
import React, {useState} from 'react';
import Masonry from 'react-masonry-css';

import {useMeta} from '../../../../contexts';
import {CardLoader} from '../../../../components/MyLoader';
import {HowToBuyModal} from '../../../../components/HowToBuyModal';

import {useSales} from './hooks/useSales';
import SaleCard from './components/SaleCard';
import {useRouter} from 'next/router';

const {TabPane} = Tabs;
const {Content} = Layout;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const {isLoading} = useMeta();
  const {connected} = useWallet();
  const {sales, hasResaleAuctions} = useSales(activeKey);
  const router = useRouter();
  return (
    <>
      <style global jsx>{`
        .btn-w {
          width: 150px !important;
        }
        a {
          color: #fff; /* blue colors for links too */
          text-decoration: inherit; /* no underline */
        }
        a:visited {
          color: #fff; /* blue colors for links too */
          text-decoration: inherit; /* no underline */
        }
      `}</style>
      <Layout>
        <Content style={{display: 'flex', flexWrap: 'wrap'}}>
          <Col style={{width: '100%'}}>
            <Row></Row>
          </Col>
          <Col style={{width: '100%'}}>
            <div
              style={{width: '100%', maxWidth: '800px'}}
              className={`mx-auto my-5 d-flex flex-column justify-content-center align-items-center text-center`}>
              <h3 className={`text-white`} style={{fontSize: '2.75rem'}}>
                Welcome to Akkoros.xyz!
              </h3>
              <p className='text-white' style={{fontSize: '1.5rem'}}>
                We are a community working to decentralize NFTs and provide a
                greater future for artists and creatives alike.
              </p>
              <div className='d-flex flex-column flex-md-row justify-content-around w-100 text-white py-2 my-5'>
                <a
                  className='btn btn-outline-light btn-w py-4'
                  href='https://discord.gg/DnbkrC8'
                  target={'_blank'}>
                  Discord
                </a>
                <a
                  className='btn btn-outline-light btn-w py-4'
                  href='https://github.com/AKKOROWEB/akkoro-client'
                  target={'_blank'}>
                  Github
                </a>
                <a
                  className='btn btn-outline-light btn-w py-4'
                  href='https://twitter.com/akkoros'
                  target={'_blank'}>
                  Twitter
                </a>
              </div>
              <HowToBuyModal buttonClassName='secondary-btn btn-w my-5' />
            </div>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={(key) => setActiveKey(key as LiveAuctionViewState)}>
                <TabPane
                  tab={
                    <>
                      <span className='live'></span> Live Auction
                    </>
                  }
                  key={LiveAuctionViewState.All}
                />

                <TabPane
                  tab='The Marketplace'
                  key={LiveAuctionViewState.Resale}
                />

                {/* <TabPane tab='Ended' key={LiveAuctionViewState.Ended}></TabPane> */}
                {/* {connected && (
                  <TabPane
                    tab='Participated'
                    key={LiveAuctionViewState.Participated}></TabPane>
                )} */}
              </Tabs>
            </Row>
            <Row>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className='masonry-grid'
                columnClassName='masonry-grid_column'>
                {!isLoading &&
                  sales.map((sale, idx) => <SaleCard sale={sale} key={idx} />)}
              </Masonry>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
