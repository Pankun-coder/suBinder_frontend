import { useState } from "react";
import { useRouter } from "next/router";
import MessageModal from "../../components/messageModal";
import GuestPageInput from "../../components/guestPage/guestPageInput";
import GuestPageBorder from "../../components/guestPage/guestPageBorder";
import GuestPageButton from "../../components/guestPage/guestPageButton";
import GuestPageTitle from "../../components/guestPage/guestPageTitle";
import axios from "axios";
import { isEmailValid, isPasswordValid } from "../../lib/userHelper";

export default function CreateUser() {
  const [groupId, setGroupId] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setuserPasswordConfirmation] = useState("");
  const [message, setMessage] = useState({ body: "", isError: false });
  const router = useRouter();

  const handleSignUp = () => {
    if (
      !(
        groupId &&
        groupPassword &&
        userName &&
        userEmail &&
        userPassword &&
        userPasswordConfirmation
      )
    ) {
      setMessage({ body: "未入力の項目があります", isError: true });
      return;
    }
    if (!isPasswordValid(groupPassword)) {
      setMessage({
        body: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
        isError: true,
      });
      return;
    }
    if (!isEmailValid(userEmail)) {
      setMessage({ body: "メールアドレスが不正です", isError: true });
      return;
    }
    if (userPassword !== userPasswordConfirmation) {
      setMessage({ body: "パスワードと確認が一致しません", isError: true });
      return;
    }
    if (!isPasswordValid(userPassword) || !isPasswordValid(userPasswordConfirmation)) {
      setMessage({
        body: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
        isError: true,
      });
      return;
    }
    const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/users`;
    const data = {
      group: {
        id: groupId,
        password: groupPassword,
      },
      user: {
        name: userName,
        email: userEmail,
        password: userPassword,
        password_confirmation: userPasswordConfirmation,
      },
    };
    axios
      .post(url, data)
      .then((response) => {
        if (response.data.message === "user saved") router.push("/groupDashboard");
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };

  return (
    <GuestPageBorder>
      <GuestPageTitle value="ユーザー登録" />
      <form>
        <GuestPageInput placeHolder="グループID" onChange={(e) => setGroupId(e.target.value)} />
        <GuestPageInput
          placeHolder="グループのパスワード"
          type="password"
          onChange={(e) => setGroupPassword(e.target.value)}
        />
        <GuestPageInput placeHolder="ユーザー名" onChange={(e) => setUserName(e.target.value)} />
        <GuestPageInput
          placeHolder="メールアドレス"
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <GuestPageInput
          placeHolder="ユーザーのパスワード"
          type="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <GuestPageInput
          placeHolder="パスワードの確認"
          type="password"
          onChange={(e) => {
            setuserPasswordConfirmation(e.target.value);
          }}
        />
        <GuestPageButton
          type="button"
          value="ユーザーを作成する"
          onClick={() => {
            handleSignUp();
          }}
        />
      </form>
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
