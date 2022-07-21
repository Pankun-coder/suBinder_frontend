import {useState} from "react"
import axios from "axios";
import Link from "next/link";
import ModalS from "../../components/modalS";
import GuestPageInput from "../../components/guestPage/guestPageInput";
import GuestPageBorder from "../../components/guestPage/guestPageBorder";
import GuestPageButton from "../../components/guestPage/guestPageButton";
import GuestPageTitle from "../../components/guestPage/guestPageTitle";

export default function CreateGroup() {
    const [groupName, setGroupName] = useState("");
    const [groupPassword, setGroupPassword] = useState("");
    const [groupPasswordConfirmation, setGroupPasswordConfirmation] = useState("");
    const [isGroupCreatedModalShown, setIsGroupCreatedModalShown] = useState(false);

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
            setIsGroupCreatedModalShown(true);
        })
        .catch(error => {
            console.log(error);
        })
    }
    const groupCreatedModal = (
        <ModalS onClickClose={() => {setIsGroupCreatedModalShown(false)}}>
            <div className="w-full h-full p-4">
                <h1 className="text-2xl m-2">グループが作られました!</h1>
                <p className="text-xl mb-0 mt-0">続いて<Link href="/signUp/createUser"><a className="text-blue-700 border-b-2 border-blue-700">ユーザーの作成</a></Link>へ</p>
            </div>
        </ModalS>
    )

    return (
        <GuestPageBorder>
            <GuestPageTitle value="グループの作成" />
            <form>
                <GuestPageInput placeHolder="グループ名" onChange={(e) => {setGroupName(e.target.value)}} />
                <GuestPageInput placeHolder="グループのパスワード" type="password" onChange={(e) => {setGroupPassword(e.target.value)}} />
                <GuestPageInput placeHolder="パスワードの確認" type="password" onChange={(e) => {setGroupPasswordConfirmation(e.target.value)}} />
                <GuestPageButton type="button" value="グループを作成する" onClick={() => {handleCreateGroup()}} />
            </form>
            {isGroupCreatedModalShown&&groupCreatedModal}
        </GuestPageBorder>
    )
}
