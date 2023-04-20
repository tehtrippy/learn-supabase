import Head from "next/head";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Learn - Supabase</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ToastContainer
        icon={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={2000}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
