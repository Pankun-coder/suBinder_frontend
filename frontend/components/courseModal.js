import Step from "./step";
import ModalM from "../components/modalM";
import { useState } from "react";
import axios from "axios";
import { toSnakeCase } from "../lib/JSONHelpler";
import MessageModal from "./messageModal";
export default function CourseModal(props) {
  const [stepInfo, setStepInfo] = useState(props.steps);
  const [message, setMessage] = useState({ body: "", isError: false });

  const setIsComleted = (index) => {
    let Obj = JSON.parse(JSON.stringify(stepInfo));
    Obj[index].isCompleted = !Obj[index].isCompleted;
    setStepInfo(Obj);
  };

  const update = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/progresses/bulk_update/`;
    const data = { progresses: toSnakeCase(stepInfo) };
    axios
      .patch(url, data, { withCredentials: true })
      .then((response) => {
        setMessage({ body: response.data.message, isError: false });
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };
  return (
    <ModalM onClickClose={props.onClickClose}>
      {stepInfo.map((step, index) => {
        return (
          <Step
            key={index}
            name={step.name}
            isCompleted={step.isCompleted}
            id={step.id}
            checked={stepInfo[index].isCompleted}
            onChange={() => {
              setIsComleted(index);
            }}
          />
        );
      })}
      <button
        type="button"
        onClick={() => {
          update();
        }}
      >
        進捗状況を確定する
      </button>
      {message.body && (
        <MessageModal
          message={message.body}
          isError={message.isError}
          onClickClose={() => {
            setMessage({ body: "", isError: false });
          }}
        />
      )}
    </ModalM>
  );
}
