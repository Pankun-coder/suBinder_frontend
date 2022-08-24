import axios from "axios";
import { useState, useContext } from "react";
import { isLoggedInContext } from "lib/isLoggedInContext";
import LoginRequiredModal from "components/common/loginRequiredModal";
import BorderM from "components/common/borderM";
import MessageModal from "components/common/messageModal";
import InputM from "components/common/inputM";
import PageTitle from "components/common/pageTitle";
import ButtonM from "components/common/buttonM";
import { useForm } from "react-hook-form";

export default function AddUser() {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const [message, setMessage] = useState({ body: "", isError: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createStudent = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/students`;
    const studentData = { name: data.studentName };
    axios
      .post(url, studentData, { withCredentials: true })
      .then((response) => {
        setMessage({ body: response.data.message, isError: false });
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };

  if (!isLoggedIn) return <LoginRequiredModal />;

  return (
    <section>
      <BorderM>
        <PageTitle value="生徒を登録する" />
        <form
          onSubmit={handleSubmit((data) => {
            createStudent(data);
          })}
        >
          <div className="w-fit mx-auto my-4">
            <InputM
              placeholder="生徒名"
              register={register("studentName", { required: "入力が必要な項目です" })}
            />
            {errors.studentName && <p>{errors.studentName.message}</p>}
          </div>
          <ButtonM type="submit" value="生徒登録" />
        </form>
      </BorderM>
      {message.body && (
        <MessageModal
          message={message.body}
          isError={message.isError}
          onClickClose={() => {
            setMessage({ body: "", isError: false });
          }}
        />
      )}
    </section>
  );
}
