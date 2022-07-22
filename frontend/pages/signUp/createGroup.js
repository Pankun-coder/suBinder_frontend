import { useState } from "react";
import Link from "next/link";
import ModalS from "../../components/modalS";
import MessageModal from "../../components/messageModal";
import GuestPageInput from "../../components/guestPage/guestPageInput";
import GuestPageBorder from "../../components/guestPage/guestPageBorder";
import GuestPageButton from "../../components/guestPage/guestPageButton";
import GuestPageTitle from "../../components/guestPage/guestPageTitle";
import { isPasswordValid } from "../../lib/userHelper";
import axios from "axios";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [groupPasswordConfirmation, setGroupPasswordConfirmation] = useState("");
  const [isGroupCreatedModalShown, setIsGroupCreatedModalShown] = useState(false);
  const [message, setMessage] = useState({ body: "", isError: false });

  const handleCreateGroup = () => {
    if (!(groupName && groupPassword && groupPasswordConfirmation)) {
      setMessage({ body: "未入力の項目があります", isError: true });
      return;
    }
    if (groupPassword !== groupPasswordConfirmation) {
      setMessage({ body: "パスワードと確認が一致しません", isError: true });
      return;
    }
    if (!isPasswordValid(groupPassword) || !isPasswordValid(groupPasswordConfirmation)) {
      setMessage({
        body: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
        isError: true,
      });
      return;
    }
    const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/groups`;
    const data = {
      group: {
        name: groupName,
        password: groupPassword,
        password_confirmation: groupPasswordConfirmation,
      },
    };
    axios
      .post(url, data)
      .then((response) => {
        setIsGroupCreatedModalShown(true);
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };
  const groupCreatedModal = (
    <ModalS
      onClickClose={() => {
        setIsGroupCreatedModalShown(false);
      }}
    >
      <div className="w-full h-full p-4">
        <h1 className="text-2xl m-2">グループが作られました!</h1>
        <p className="text-xl mb-0 mt-0">
          続いて
          <Link href="/signUp/createUser">
            <a className="text-blue-700 border-b-2 border-blue-700">ユーザーの作成</a>
          </Link>
          へ
        </p>
      </div>
    </ModalS>
  );

  return (
    <GuestPageBorder>
      <GuestPageTitle value="グループの作成" />
      <form>
        <GuestPageInput
          placeHolder="グループ名"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <GuestPageInput
          placeHolder="グループのパスワード"
          type="password"
          onChange={(e) => {
            setGroupPassword(e.target.value);
          }}
        />
        <GuestPageInput
          placeHolder="パスワードの確認"
          type="password"
          onChange={(e) => {
            setGroupPasswordConfirmation(e.target.value);
          }}
        />
        <GuestPageButton
          type="button"
          value="グループを作成する"
          onClick={() => {
            handleCreateGroup();
          }}
        />
      </form>
      {isGroupCreatedModalShown && groupCreatedModal}
      {message.body && (
        <MessageModal
          message={message.body}
          isError={message.isError}
          onClickClose={() => {
            setMessage({ body: "", isError: false });
          }}
        />
      )}
    </GuestPageBorder>
  );
}
