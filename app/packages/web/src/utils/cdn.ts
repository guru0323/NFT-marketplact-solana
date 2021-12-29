import getConfig from 'next/config';

const nextConfig = getConfig();
const publicRuntimeConfig = nextConfig.publicRuntimeConfig;

const ARWEAVE_CDN = publicRuntimeConfig.publicArweaveCdn;

export const maybeCDN = (uri: string) => {
  if (ARWEAVE_CDN) {
    const res = uri.replace(
      /https:\/\/(www.)?arweave\.net(:443)?/g,
      ARWEAVE_CDN,
    );

    return res;
  }

  return uri;
};
