import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/index.less';
import '../styles/utility.css';
//import '../styles/stripe.css';
import { ThemeContext,Theme } from '../contexts/themecontext';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [theme,setTheme] = React.useState(Theme.Light)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeContext.Provider value={{theme,setTheme}}>
        <Component {...pageProps} />
        </ThemeContext.Provider>
    </>
  );
}
