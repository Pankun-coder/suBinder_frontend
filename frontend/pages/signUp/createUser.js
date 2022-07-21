import Layout from "../../layouts"
import {useState} from "react"
import {useRouter} from "next/router";
import axios from "axios";
import GuestPageInput from "../../components/guestPage/guestPageInput";
import GuestPageBorder from "../../components/guestPage/guestPageBorder";
import GuestPageButton from "../../components/guestPage/guestPageButton";
import GuestPageTitle from "../../components/guestPage/guestPageTitle";

export default function CreateUser() {
    const [groupId, setGroupId] = useState("");
    const [groupPassword, setGroupPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirmation, setuserPasswordConfirmation] = useState("");

    const router = useRouter();
    
    const handleSignUp = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/users`
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
        <GuestPageBorder>
            <GuestPageTitle value="ユーザー登録" />
            <form>
                <GuestPageInput placeHolder="グループID" onChange={(e) => setGroupId(e.target.value)} />
                <GuestPageInput placeHolder="グループのパスワード" type="password" onChange={(e) => setGroupPassword(e.target.value)} />
                <GuestPageInput placeHolder="ユーザー名" onChange={(e) => setUserName(e.target.value)} />
                <GuestPageInput placeHolder="メールアドレス" onChange={(e) => setUserEmail(e.target.value)} />
                <GuestPageInput placeHolder="ユーザーのパスワード" type="password" onChange={(e) => {setUserPassword(e.target.value)}} />
                <GuestPageInput placeHolder="パスワードの確認" type="password" onChange={(e) => {setuserPasswordConfirmation(e.target.value)}} />
                <GuestPageButton type="button" value="ユーザーを作成する" onClick={() => {handleSignUp()}} />
            </form>
        </GuestPageBorder>
    )
}