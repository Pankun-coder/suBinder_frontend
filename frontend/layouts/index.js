import Link from "next/link"
import React, {useState} from "react";
import ShowError from "../components/showError";
import { errorMessageContext } from "../lib/errorMessageContext";

export default function Layout({children}) {
    const [errorMessage, setErrorMessage] = useState(null)

    return (
        <>
        <header>
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white justify-between relative">
                <h1 className="inline-block text-3xl align-bottom ml-0">e-C4rte</h1>
                <nav className="inline-block align-bottom">
                    <ul className="absolute bottom-0 right-0">
                        <li className="inline-block mx-4"><Link href="/"><a>home</a></Link></li>
                        <li className="inline-block mx-4"><Link href="/signUp"><a>会員登録</a></Link></li>
                    </ul>
                </nav>
            </div>

            <nav className="block bg-black text-white">
                <ul className="text-center">
                    <li className="inline-block mx-4">生徒管理</li>
                    <li className="inline-block mx-4">予約管理</li>
                    <li className="inline-block mx-4">スタッフ管理</li>
                </ul>
            </nav>
        </header>
            <errorMessageContext.Provider value={{errorMessage: errorMessage, setErrorMessage: setErrorMessage}}>
                {children}
                {errorMessage ? <ShowError errorMessage={errorMessage} hideError={() => {setErrorMessage(null)}} /> : null}
            </errorMessageContext.Provider>        

        
        </>
    )
}
