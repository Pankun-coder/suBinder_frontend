import "styles/globals.css";
import { useState } from "react";
import { isLoggedInContext } from "lib/isLoggedInContext";
import Layout from "layouts";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Head>
        <title>suBinder</title>
        <meta
          name="description"
          content="習い事教室での生徒管理に便利なアプリ。生徒の予約状況を管理したり、生徒の進捗状況を登録することができます。"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <isLoggedInContext.Provider value={{ isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </isLoggedInContext.Provider>
    </>
  );
}

export default MyApp;
