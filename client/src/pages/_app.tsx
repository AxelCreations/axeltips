import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';
import ReduxStore from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
        <meta
          content="My tips for everything in life"
          name="description" />

        <title>AxelTips</title>
      </Head>
      <Provider store={ReduxStore}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
