import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import MessageModal from "components/common/messageModal";
import GuestPageTitle from "components/guestPage/guestPageTitle";
import GuestPageBorder from "components/guestPage/guestPageBorder";
import GuestPageInput from "components/guestPage/guestPageInput";
import GuestPageButton from "components/guestPage/guestPageButton";
import { isLoggedInContext } from "lib/isLoggedInContext";
import { useForm } from "react-hook-form";
export default function Login() {
  const [message, setMessage] = useState({ body: "", isError: false });
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const router = useRouter();
  if (isLoggedIn) router.push("/groupDashboard");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegEx = /^[a-zA-Z\d](\.?[\w-])*@[\w-]+\.[\w]+$/;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d).{6,}/;
  const passwordMinLength = 6;

  const handleLogin = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/sessions/`;
    const userData = {
      user: {
        email: data.userEmail,
        password: data.userPassword,
      },
    };
    axios
      .post(url, userData, { withCredentials: true })
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
      <form
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
        })}
      >
        <GuestPageInput
          placeHolder="メールアドレス"
          type="email"
          register={register("userEmail", {
            required: "入力が必須の項目です",
            pattern: {
              value: emailRegEx,
              message: "メールアドレスが正しくありません",
            },
          })}
        />
        {errors.userEmail && <p>{errors.userEmail.message}</p>}
        <GuestPageInput
          placeHolder="パスワード"
          type="password"
          register={register("userPassword", {
            required: "入力が必須の項目です",
            pattern: {
              value: passwordRegEx,
              message: "パスワードにはアルファベットと数字を含めてください",
            },
            minLength: { value: passwordMinLength, message: "パスワードは6文字以上にしてください" },
          })}
        />
        {errors.userPassword && <p>{errors.userPassword.message}</p>}
        <GuestPageButton type="submit" value="ログイン" />
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
