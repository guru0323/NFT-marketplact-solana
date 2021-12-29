import { Storefront, StoreProvider } from '@oyster/common';
import React, { FC } from 'react';
import getConfig from 'next/config';


let nextConfig = getConfig();
const publicRuntimeConfig = nextConfig.publicRuntimeConfig;

export const Providers: FC<{ storefront: Storefront }> = ({
  children,
  storefront,
}) => {
  return (
    <StoreProvider
      storefront={storefront}
      storeAddress={publicRuntimeConfig.publicStoreAddress}
    >
      {children}
    </StoreProvider>
  );
};
