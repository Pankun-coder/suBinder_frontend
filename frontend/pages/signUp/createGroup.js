import Layout from "../../layouts"
import {useState} from "react"
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

export default function CreateGroup() {
    const [groupName, setGroupName] = useState("");
    const [groupPassword, setGroupPassword] = useState("");
    const [groupPasswordConfirmation, setGroupPasswordConfirmation] = useState("");
    const [isGroupCreated, setIsGroupCreated] = useState(false);
    const router = useRouter();

    const handleCreateGroup = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/groups`;
        const data = {
            group: {
                "name": groupName,
                "password": groupPassword,
                "password_confirmation": groupPasswordConfirmation
            }
        }
        axios.post(url, data)
        .then(response => {
            console.log(response);
            setIsGroupCreated(true);
        })
        .catch(error => {
            console.log(error);
        })
    }
    const createUserModal = () => {
        if (!isGroupCreated) return null;
        return (
            <section>
                <h1> Yay! Group created</h1>
                <Link href="/signUp/createUser"><a>continue creating user</a></Link>
            </section>
        )
    } 
    return (
        <Layout>
            <section>
                <h1>グループがない方</h1>
                <form>
                    <label htmlFor="groupName">グループ名</label>
                    <input id="groupName" onChange={(e) => setGroupName(e.target.value)}></input>
                    <label htmlFor="groupPassword">パスワード</label>
                    <input id="groupPassword" type="password" onChange={(e) => setGroupPassword(e.target.value)}></input>
                    <label htmlFor="groupPasswordConfirmation">確認</label>
                    <input id="groupPasswordConfirmation" type="password" onChange={(e) => setGroupPasswordConfirmation(e.target.value)}></input>
                    <input type="button" value="submit" onClick={() => {handleCreateGroup(groupName, groupPassword, groupPasswordConfirmation)} }></input>
                </form>
            </section>
            {createUserModal()}
        </Layout>
    )
}