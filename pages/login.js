import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MessageModal from "../components/messageModal";
import { isEmailValid, isPasswordValid } from "../lib/userHelper";
import GuestPageTitle from "../components/guestPage/guestPageTitle";
import GuestPageBorder from "../components/guestPage/guestPageBorder";
import GuestPageInput from "../components/guestPage/guestPageInput";
import GuestPageButton from "../components/guestPage/guestPageButton";
import { isLoggedInContext } from "../lib/isLoggedInContext";
export default function Login() {
  const [message, setMessage] = useState({ body: "", isError: false });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const router = useRouter();
  if (isLoggedIn) router.push("/groupDashboard");

  const handleLogin = () => {
    if (!isEmailValid(userEmail)) {
      setMessage({ body: "メールアドレスが不正です", isError: true });
      return;
    }
    if (!isPasswordValid(userPassword)) {
      setMessage({
        body: "パスワードは数字とアルファベットを含んだ6文字以上でなければなりません",
        isError: true,
      });
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/sessions/`;
    const data = {
      user: {
        email: userEmail,
        password: userPassword,
      },
    };
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };

  return (
    <GuestPageBorder>
      <GuestPageTitle value="Login" />
      <form>
        <GuestPageInput
          value={userEmail}
          data-testid="email"
          placeHolder="メールアドレス"
          type="email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <GuestPageInput
          value={userPassword}
          data-testid="password"
          placeHolder="パスワード"
          type="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <GuestPageButton
          type="button"
          value="ログイン"
          data-testid="submit-button"
          onClick={() => {
            handleLogin();
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
