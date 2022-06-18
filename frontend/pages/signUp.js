import Layout from "../layouts"
import {useState} from "react"
import {createGroup} from "../lib/group";
import {useRouter} from "next/router";
import {createUser} from "../lib/user";

export default function SignUp() {
    const [groupId, setGroupId] = useState("");
    const [groupPassword1, setGroupPassword1] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirmation, setuserPasswordConfirmation] = useState("");

    const [groupName2, setGroupName2] = useState("");
    const [groupPassword2, setGroupPassword2] = useState("");
    const [groupPasswordConfirmation, setGroupPasswordConfirmation] = useState("");

    const router = useRouter();
    const handleLogin = (groupId, groupPassword, userName, email, userPassword, userPasswordConfirmation) => {
        createUser(groupId, groupPassword, userName, email, userPassword, userPasswordConfirmation);
        router.push("/");
    }

    const handleCreateGroup = (groupName, password, passwordConfirmation) => {
        createGroup(groupName, password, passwordConfirmation);
        router.push("/");
    }
    return (
        <Layout>
            <section>
                <h1>グループがある方</h1>
                <form>
                <label for="groupId">グループID</label>
                    <input id="groupId" onChange={(e) => setGroupId(e.target.value)}></input>
                    <label for="groupPassword1">グループのパスワード</label>
                    <input id="groupPassword1" type="password" onChange={(e) => setGroupPassword1(e.target.value)}></input>
                    <label for="userName" >ユーザー名</label>
                    <input id="userName" onChange={(e) => setUserName(e.target.value)}></input>
                    <label for="email">email</label>
                    <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    <label for="userPassword">ユーザーのパスワード</label>
                    <input id="userPassword" type="password" onChange={(e) => {setUserPassword(e.target.value)}}></input>
                    <label for="userPasswordConfirmation">確認</label>
                    <input id="userPasswordConfirmation" type="password" onChange={(e) => {setuserPasswordConfirmation(e.target.value)}}></input>
                    <input type="button" value="submit" onClick={() => {handleLogin(groupId, groupPassword1, userName, email, userPassword, userPasswordConfirmation)}}></input>
                </form>
            </section>
            <section>
                <h1>グループがない方</h1>
                <form>
                    <label for="groupName2">グループ名</label>
                    <input id="groupName2" onChange={(e) => setGroupName2(e.target.value)}></input>
                    <label for="groupPassword2">パスワード</label>
                    <input id="groupPassword2" type="password" onChange={(e) => setGroupPassword2(e.target.value)}></input>
                    <label for="groupPasswordConfirmation">確認</label>
                    <input id="groupPasswordConfirmation" type="password" onChange={(e) => setGroupPasswordConfirmation(e.target.value)}></input>
                    <input type="button" value="submit" onClick={() => {createGroup(groupName2, groupPassword2, groupPasswordConfirmation)} }></input>
                </form>
            </section>
        </Layout>
    )
}