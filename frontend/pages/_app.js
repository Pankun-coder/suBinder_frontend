import '../styles/globals.css'
import { useState } from "react";
import { errorMessageContext } from '../lib/errorMessageContext'
import ShowError from '../components/showError';

function MyApp({ Component, pageProps }) {
  const [errorMessage, setErrorMessage] = useState("");
  return (
      <errorMessageContext.Provider value={{errorMessage: errorMessage, setErrorMessage: setErrorMessage}}>
        <Component {...pageProps} />
        {errorMessage ? <ShowError errorMessage={errorMessage} hideError={() => {setErrorMessage(null)}} /> : null}
      </errorMessageContext.Provider>
  )
}

export default MyApp
