import '../styles/globals.css'
import { useState } from "react";
import { isLoggedInContext } from '../lib/isLoggedInContext';
import Layout from '../layouts';
function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <isLoggedInContext.Provider value = {{isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </isLoggedInContext.Provider>
  )
}

export default MyApp
