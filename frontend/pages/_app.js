import '../styles/globals.css'
import { useState } from "react";
import { isLoggedInContext } from '../lib/isLoggedInContext';
function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <isLoggedInContext.Provider value = {{isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn}}>
        <Component {...pageProps} />
    </isLoggedInContext.Provider>
  )
}

export default MyApp
