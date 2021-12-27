require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const camelCase = require('camelcase');

const assetPrefix = process.env.ASSET_PREFIX || '';
const DEFAULT_SOLANA_NETWORK = 'devnet';
const DEFAULT_SOLANA_RPC_HOST = 'https://explorer-api.devnet.solana.com';

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            '@assetPrefix': assetPrefix || "''",
            '@background-color-secondary': 'rgba(255, 255, 255)',
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
];


function hasLowerCase(str) {
  return str.toUpperCase() != str;
}


function checkEnvDefined(envVar = '', envName) {
  if (envVar) {
    return envVar;
  }
  console.warn(`Environment variable ${envName} is undefined`);
  return '';
}


var nextVars = {},
    reactVars = {},
    sysVars = {};
    
for(var env in process.env) {
  if (hasLowerCase(env)) {
    continue;
  }
  var value = process.env[env];
  if (env.includes("NEXT_")) {
    var name = camelCase(env.replace('NEXT_',''));
    nextVars[name] = checkEnvDefined(value, name);
  } else if (env.includes("REACT_APP_")) {
    var name = camelCase(env.replace('REACT_APP_',''));
    reactVars[name] = checkEnvDefined(value, name);
  } else {
    var name = camelCase(env);
    sysVars[name] = checkEnvDefined(value, name);    
  }
  // console.debug(`${env}=${value}`);
}
console.debug("Next Vars:")
console.debug(nextVars)
console.debug("React Vars:")
console.debug(reactVars)
console.debug("System Vars:")
console.debug(sysVars)


function getBasePath(basePath = '') {
  if (nextVars['basePath']) {
     if (nextVars['basePath'].startsWith("/")) {
        basePath = nextVars['basePath'];
     } else {
        basePath = "/" + nextVars['basePath'];
     }
  }
  console.debug("getBasePath() : basePath = " + basePath);
  return basePath
}
var basePath = getBasePath()


function getSolanaNetwork(network = '') {
  if (nextVars['publicSolanaNetwork']) {
    network = nextVars['publicSolanaNetwork'];
  } else {
    network = DEFAULT_SOLANA_NETWORK;
  };
  console.debug("getSolanaNetwork() : network = " + network);
  return network
}


function getSolanaRpcHost(rpcHost = '') {
  if (nextVars['publicSolanaRpcHost']) {
    rpcHost = nextVars['publicSolanaRpcHost'];
  } else {
    rpcHost = DEFAULT_SOLANA_RPC_HOST;
  };
  console.debug("getSolanaRpcHost() : rpcHost = " + rpcHost);
  return rpcHost
}


module.exports = withPlugins(plugins, {
  assetPrefix,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
  env: {
    NEXT_PUBLIC_BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
    NEXT_PUBLIC_ARWEAVE_CDN:
      process.env.ARWEAVE_CDN || 'https://arweave.cache.holaplex.dev',
    NEXT_PUBLIC_STORE_OWNER_ADDRESS:
      process.env.STORE_OWNER_ADDRESS ||
      process.env.REACT_APP_STORE_OWNER_ADDRESS_ADDRESS,
    NEXT_PUBLIC_STORE_ADDRESS: process.env.STORE_ADDRESS,
    NEXT_PUBLIC_ARWEAVE_URL:
      process.env.NEXT_PUBLIC_ARWEAVE_URL || 'https://arweave.net',
    NEXT_PUBLIC_BIG_STORE: process.env.REACT_APP_BIG_STORE,
    NEXT_PUBLIC_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
  },
  publicRuntimeConfig: {
    basePath: basePath,
    nodeType: nextVars['nodeEnv'],
    bugsSnagApiKey: sysVars['bugsSnagApiKey'],
    arweaveCdn: sysVars['arweaveCdn'] || 'https://arweave.cache.holaplex.dev',
    solanaNetwork: getSolanaNetwork(),
    solanaRpcHost: getSolanaRpcHost(),
    storeOwnerAddress: 
      sysVars['storeOwnerAddress'] ||
      reactVars['storeOwnerAddressAddress'],
    publicStoreAddress: sysVars['storeAddress'],
    arweaveUrl: nextVars['arweaveUrl'],
    bigStore: reactVars['appBigStre'],
    clientId: reactVars['clientId'],
    googleAnalyticsId: reactVars['googleAnalyticsId'],
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
});