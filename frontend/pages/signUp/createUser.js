import Layout from "../../layouts"
import {useState} from "react"
import {useRouter} from "next/router";
import axios from "axios";

export default function CreateUser() {
    const [groupId, setGroupId] = useState("");
    const [groupPassword, setGroupPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirmation, setuserPasswordConfirmation] = useState("");

    const router = useRouter();
    
    const handleLogin = () => {
        const url = "http://localhost:3001/api/v0/users/"
        const data = {
            group: {
                "id": groupId,
                "password": groupPassword
            },
            user: {
                "name": userName,
                "email": userEmail,
                "password": userPassword,
                "password_confirmation": userPasswordConfirmation
            }
        }
        axios.post(url, data)
        .then(response => {
            console.log(response);
            if (response.data.message === "user saved") router.push("/groupDashboard");
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <Layout>
            <section>
                <h1>グループがある方</h1>
                <form>
                    <label htmlFor="groupId">グループID</label>
                    <input id="groupId" onChange={(e) => setGroupId(e.target.value)}></input>

                    <label htmlFor="groupPassword">グループのパスワード</label>
                    <input id="groupPassword" type="password" onChange={(e) => setGroupPassword(e.target.value)}></input>

                    <label htmlFor="userName" >ユーザー名</label>
                    <input id="userName" onChange={(e) => setUserName(e.target.value)}></input>

                    <label htmlFor="email">email</label>
                    <input id="email" onChange={(e) => setUserEmail(e.target.value)}></input>

                    <label htmlFor="userPassword">ユーザーのパスワード</label>
                    <input id="userPassword" type="password" onChange={(e) => {setUserPassword(e.target.value)}}></input>

                    <label htmlFor="userPasswordConfirmation">確認</label>
                    <input id="userPasswordConfirmation" type="password" onChange={(e) => {setuserPasswordConfirmation(e.target.value)}}></input>
                    
                    <input type="button" value="submit" onClick={() => {handleLogin()}}></input>
                </form>
            </section>
        </Layout>
    )
}