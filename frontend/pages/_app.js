import '../styles/globals.css'
import { useState } from "react";
import { errorMessageContext } from '../lib/errorMessageContext'
import ShowError from '../components/showError';
import { isLoggedInContext } from '../lib/isLoggedInContext';

function MyApp({ Component, pageProps }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <isLoggedInContext.Provider value = {{isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn}}>
      <errorMessageContext.Provider value={{errorMessage: errorMessage, setErrorMessage: setErrorMessage}}>
        <Component {...pageProps} />
        {errorMessage ? <ShowError errorMessage={errorMessage} hideError={() => {setErrorMessage(null)}} /> : null}
      </errorMessageContext.Provider>
    </isLoggedInContext.Provider>

  )
}

export default MyApp
