import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import MessageModal from "../components/messageModal";
import { isEmailValid, isPasswordValid } from "../lib/userHelper";
import GuestPageTitle from "../components/guestPage/guestPageTitle";
import GuestPageBorder from "../components/guestPage/guestPageBorder";
import GuestPageInput from "../components/guestPage/guestPageInput";
import GuestPageButton from "../components/guestPage/guestPageButton";
export default function Login() {
  const [message, setMessage] = useState({ body: "", isError: false });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

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
    const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/sessions/`;
    const data = {
      user: {
        email: userEmail,
        password: userPassword,
      },
    };
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        axios.defaults.headers.post["X-CSRF-Token"] = response.data._csrf;
        router.push("/groupDashboard");
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
          data-testid="email"
          placeHolder="メールアドレス"
          type="email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <GuestPageInput
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
