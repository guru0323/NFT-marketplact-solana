import {useWallet} from '@solana/wallet-adapter-react';
import {Col, Layout, Row, Tabs} from 'antd';
import React, {useState} from 'react';
import Masonry from 'react-masonry-css';

import {useMeta} from '../../../../contexts';
import {CardLoader} from '../../../../components/MyLoader';
import {HowToBuyModal} from '../../../../components/HowToBuyModal';

import {useSales} from './hooks/useSales';
import SaleCard from './components/SaleCard';

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

  return (
    <>
      <style jsx>{``}</style>
      <Layout>
        <Content style={{display: 'flex', flexWrap: 'wrap'}}>
          <Col style={{width: '100%'}}>
            <Row></Row>
          </Col>
          <Col style={{width: '100%'}}>
            <div className={`mx-2 my-5  d-flex flex-column `}>
              <h3 className={`text-white`}>Experimental Build</h3>
              <p className='text-white'>
                This is a community-built marketplace for NFTs.
              </p>
              <HowToBuyModal buttonClassName='secondary-btn' />
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
