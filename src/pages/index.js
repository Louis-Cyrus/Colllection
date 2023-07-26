import Image from 'next/image';
import Head from 'next/head';
import App from '../components/App';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jammming, create your playlist !</title>
        <meta name="description" content="Jammming, create your playlist !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <App />
      </div>
    </>
  )
}
