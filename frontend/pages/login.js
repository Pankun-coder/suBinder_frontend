import axios from "axios";
import Layout from "../layouts";
import { useState } from "react";
import { useRouter } from "next/router";
import MessageModal from "../components/messageModal";
import { isEmailValid, isPasswordValid } from "../lib/loginHelper";
export default function Login() {
    const [message, setMessage] = useState({body: "", isError: false});
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (!isEmailValid(userEmail)) {
            setMessage({ body: "メールアドレスが不正です", isError: true })
            return
        }
        if(!isPasswordValid(userPassword)) {
            setMessage({ body: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません", isError: true })
            return
        }
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
        })
        .catch(error => {
            setMessage({body: error.response.data.message, isError: true})
        })
    }

    return (
            <section className="mt-20 w-fit mx-auto border-2 border-black p-16 pt-3 text-center">
                <form>
                        <table className=" h-20 border-separate border-spacing-y-0 border-spacing-x-2 text-l">
                            <caption className="text-3xl mb-6">Login</caption>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="email">email</label></td>
                                    <td><input id="email" data-testid="email" onChange={(e) => setUserEmail(e.target.value)}></input></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="userPassword">password</label></td>
                                    <td><input id="userPassword" data-testid="password" type="password" onChange={(e) => {setUserPassword(e.target.value)}}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    <div className="text-center">
                        <input type="button" value="submit" data-testid="submit-button" onClick={() => {handleLogin()}} className="border-b-2 border-black p-1 hover:drop-shadow-lg"></input>
                    </div>
                </form>
                
                {message.body&&<MessageModal data-testid="messageModal" message={message.body} isError={message.isError} onClickClose={()=> {setMessage({body: "", isError: false})}}></MessageModal>}
            </section>


    )
}