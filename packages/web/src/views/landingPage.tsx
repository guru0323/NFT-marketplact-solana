import React from 'react';
import {useRouter} from 'next/router';
import {useStore} from '@oyster/common';
import {Link} from 'react-router-dom';
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
            margin-top: -175px;
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
        `}
      </style>
      <div className={`landing-page`}>
        <div className={`landing-page-header`}>
          <div className={`d-flex flex-column justify-content-between mb-5`}>
            <h1 className={`p-5`}>{storefront.meta.title}</h1>
            <p className={`p-4`}>{storefront.meta.description}</p>
            <div className={`d-flex flex-row justify-content-around my-5`}>
              <button
                onClick={() => router.push('https://discord.gg/DnbkrC8')}
                className='btn btn-outline-light landing-page-btn text-uppercase'>
                Discord
              </button>

              <button
                onClick={() => router.push('https://twitter.com/akkoros')}
                className='btn btn-outline-light landing-page-btn text-uppercase'>
                Twitter
              </button>

              <button
                onClick={() =>
                  router.push('https://github.com/AKKOROWEB/akkoro-client')
                }
                className='btn btn-outline-light landing-page-btn text-uppercase'>
                Github
              </button>
            </div>
          </div>
          <Link to='/store'>
            <button className='btn btn-outline-light landing-page-btn text-uppercase mt-5'>
              Enter App
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
