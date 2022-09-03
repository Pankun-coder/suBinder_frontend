import { useState } from "react";
import { useRouter } from "next/router";
import MessageModal from "components/common/messageModal";
import GuestPageInput from "components/guestPage/guestPageInput";
import GuestPageBorder from "components/guestPage/guestPageBorder";
import GuestPageButton from "components/guestPage/guestPageButton";
import GuestPageTitle from "components/guestPage/guestPageTitle";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateUser() {
  const [message, setMessage] = useState({ body: "", isError: false });
  const router = useRouter();
  const emailRegEx = /^[a-zA-Z\d](\.?[\w-])*@[\w-]+\.[\w]+$/;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d).{6,}/;
  const passwordMinLength = 6;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { groupId: router.query.groupId } });

  const handleSignUp = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/users`;
    const userData = {
      group: {
        id: data.groupId,
        password: data.groupPassword,
      },
      user: {
        name: data.userName,
        email: data.userEmail,
        password: data.userPassword,
        password_confirmation: data.userPasswordConfirmation,
      },
    };
    axios
      .post(url, userData)
      .then((response) => {
        if (response.data.message === "user saved") router.push("/cartePage");
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };

  return (
    <GuestPageBorder>
      <GuestPageTitle value="ユーザー登録" />
      <form
        onSubmit={handleSubmit((data) => {
          handleSignUp(data);
        })}
      >
        <GuestPageInput
          placeHolder="グループID"
          register={register("groupId", { required: "入力が必須の項目です" })}
        />
        {errors.groupId && <p>{errors.groupId.message}</p>}
        <GuestPageInput
          placeHolder="グループのパスワード"
          type="password"
          register={register("groupPassword", {
            required: "入力が必須の項目です",
            pattern: {
              value: passwordRegEx,
              message: "パスワードにはアルファベットと数字を含めてください",
            },
            minLength: { value: passwordMinLength, message: "パスワードは6文字以上にしてください" },
          })}
        />
        {errors.groupPassword && <p>{errors.groupPassword.message}</p>}
        <GuestPageInput
          placeHolder="ユーザー名"
          register={register("userName", { required: "入力が必須の項目です" })}
        />
        {errors.userName && <p>{errors.userName.message}</p>}
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
          placeHolder="ユーザーのパスワード"
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
        <GuestPageInput
          placeHolder="パスワードの確認"
          type="password"
          register={register("userPasswordConfirmation", {
            required: "入力が必須の項目です",
            pattern: {
              value: passwordRegEx,
              message: "パスワードにはアルファベットと数字を含めてください",
            },
            minLength: { value: passwordMinLength, message: "パスワードは6文字以上にしてください" },
            validate: (val) => {
              if (watch("userPassword") != val) {
                return "パスワードと確認が一致しません";
              }
            },
          })}
        />
        {errors.userPasswordConfirmation && <p>{errors.userPasswordConfirmation.message}</p>}
        <GuestPageButton type="submit" value="ユーザーを作成する" />
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
