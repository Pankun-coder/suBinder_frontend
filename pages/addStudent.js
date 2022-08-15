import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import LoginRequiredModal from "../components/loginRequiredModal";
import BorderM from "../components/borderM";
import MessageModal from "../components/messageModal";
import InputM from "../components/inputM";
import PageTitle from "../components/pageTitle";
import ButtonM from "../components/buttonM";

export default function AddUser() {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState({ body: "", isError: false });

  const createUser = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/students`;
    const data = { name: studentName };
    axios
      .post(url, data, { withCredentials: true })
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
        <form>
          <div className="w-fit mx-auto my-4">
            <InputM
              value={studentName}
              placeholder="生徒名"
              onChange={(e) => {
                setStudentName(e.target.value);
              }}
            />
          </div>
          <ButtonM
            onClick={() => {
              createUser();
            }}
            value="生徒登録"
          />
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
