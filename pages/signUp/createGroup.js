import { useEffect, useState } from "react";
import Link from "next/link";
import ModalS from "../../components/modalS";
import MessageModal from "../../components/messageModal";
import GuestPageInput from "../../components/guestPage/guestPageInput";
import GuestPageBorder from "../../components/guestPage/guestPageBorder";
import GuestPageButton from "../../components/guestPage/guestPageButton";
import GuestPageTitle from "../../components/guestPage/guestPageTitle";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateGroup() {
  const [isGroupCreatedModalShown, setIsGroupCreatedModalShown] = useState(false);
  const [message, setMessage] = useState({ body: "", isError: false });
  const [groupId, setGroupId] = useState("");

  const passwordMinLength = 6;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d).{6,}/;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const handleCreateGroup = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/groups`;
    const groupData = {
      group: {
        name: data.groupName,
        password: data.groupPassword,
        password_confirmation: data.groupPasswordConfirmation,
      },
    };
    axios
      .post(url, groupData)
      .then((response) => {
        setGroupId(response.data.group_id);
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
        <dl className="text-2xl mb-4">
          <dt className="inline mx-2">グループID:</dt>
          <dd className="inline mx-2">{groupId}</dd>
        </dl>
        <p className="text-xl mb-0 mt-0">
          続いて
          <Link href={`/signUp/createUser?groupId=${groupId}`}>
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
      <form
        onSubmit={handleSubmit((data) => {
          handleCreateGroup(data);
        })}
      >
        <GuestPageInput
          placeHolder="グループ名"
          register={register("groupName", { required: "入力が必須の項目です" })}
        />
        {errors.groupName && <p>{errors.groupName.message}</p>}
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
          placeHolder="パスワードの確認"
          type="password"
          register={register("groupPasswordConfirmation", {
            required: "入力が必須の項目です",
            pattern: {
              value: passwordRegEx,
              message: "パスワードにはアルファベットと数字を含めてください",
            },
            minLength: { value: passwordMinLength, message: "パスワードは6文字以上にしてください" },
            validate: (val) => {
              if (watch("groupPassword") != val) {
                return "パスワードと確認が一致しません";
              }
            },
          })}
        />
        {errors.groupPasswordConfirmation && <p>{errors.groupPasswordConfirmation.message}</p>}
        <GuestPageButton type="submit" value="グループを作成する" />
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
