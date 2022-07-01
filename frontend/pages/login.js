import axios from "axios";
import Layout from "../layouts";
import { useContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { errorMessageContext } from "../lib/errorMessageContext";

export default function Login() {
    const {errorMessage, setErrorMessage} = useContext(errorMessageContext);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/sessions/`
        const data = {
            user: {
                "email": userEmail,
                "password": userPassword
            }
        }
        axios.post(url, data, {withCredentials: true})
        .then(response => {
            axios.defaults.headers.post['X-CSRF-Token'] = response.data._csrf;
            router.push("/groupDashboard");
            console.log(response);
        })
        .catch(error => {
            setErrorMessage(error.response.data.message)
        })
    }

    return (
        <Layout>
            <section className="mt-20 w-fit mx-auto border-2 border-black p-16 pt-3 text-center">
                <form>
                        <table className=" h-20 border-separate border-spacing-y-0 border-spacing-x-2 text-l">
                            <caption className="text-3xl mb-6">Login</caption>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="email">email</label></td>
                                    <td><input id="email" onChange={(e) => setUserEmail(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="userPassword">password</label></td>
                                    <td><input id="userPassword" type="password" onChange={(e) => {setUserPassword(e.target.value)}}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    <div className="text-center">
                        <input type="button" value="submit" onClick={() => {handleLogin()}} className="border-b-2 border-black p-1 hover:drop-shadow-lg"></input>
                    </div>
                </form>
            </section>
        </Layout>

    )
}