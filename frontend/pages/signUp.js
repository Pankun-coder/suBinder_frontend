import Layout from "../layouts"
import {useState} from "react"
import createGroup from "../lib/group";
export default function SignUp() {
    const [groupName, setGroupName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const testFunc = () => {
        fetch("http://localhost:3001/api/v0/groups")
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <Layout>
            <section>
                <h1 onClick={()=>{testFunc()}}>グループがある方</h1>
            </section>
            <section>
                <h1>グループがない方</h1>
                <form>
                    <label for="groupName">グループ名</label>
                    <input id="groupName" onChange={(e) => setGroupName(e.target.value)}></input>
                    <label for="password">パスワード</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label for="passwordConfirmation">確認</label>
                    <input id="passwordConfirmation" type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                    <input type="button" value="submit" onClick={() => {createGroup(groupName, password, passwordConfirmation)} }></input>
                </form>
            </section>
        </Layout>
    )
}