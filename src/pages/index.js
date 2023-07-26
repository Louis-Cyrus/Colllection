import Image from 'next/image';
import Head from 'next/head';
import App from '../components/App/App';

export default function Home() {
  return (
    <>
      <Head>
        <title>Colllection, ma collection de films et livres</title>
        <meta name="description" content="Colllection, ma collection de films et livres." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <App />
      </div>
    </>
  )
}
