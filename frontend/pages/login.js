import Layout from "../layouts"
import {useState} from "react"
import {useRouter} from "next/router";
import axios from "axios";



export default function createUser() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const router = useRouter();
    
    const handleLogin = () => {
        const url = "http://localhost:3001/api/v0/sessions/"
        const data = {
            user: {
                "email": userEmail,
                "password": userPassword
            }
        }
        axios.post(url, data,
            {withCredentials: true})
        .then(response => {
            console.log(response);
            axios.defaults.headers.post['X-CSRF-Token'] = response.data._csrf;
            console.log(response.data._csrf)
            if (response.data.message === "authenticated") router.push("/groupDashboard");
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <Layout>
            <section>
                <form>
                    <label for="email">email</label>
                    <input id="email" onChange={(e) => setUserEmail(e.target.value)}></input>
                    <label for="userPassword">ユーザーのパスワード</label>
                    <input id="userPassword" type="password" onChange={(e) => {setUserPassword(e.target.value)}}></input>
                    <input type="button" value="submit" onClick={() => {handleLogin()}}></input>
                </form>
            </section>
        </Layout>
    )
}