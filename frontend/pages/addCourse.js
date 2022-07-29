import InputM from "../components/inputM";
import BorderM from "../components/borderM";
import PageTitle from "../components/pageTitle";
import MessageModal from "../components/messageModal";
import { useState } from "react";
import InnerBorder from "../components/innerBorder";
import axios from "axios";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [steps, setSteps] = useState([]);
  const [stepName, setStepName] = useState("");
  const [message, setMessage] = useState({ body: "", isError: false });

  const addCourse = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/courses`;
    const data = { course: { name: courseName }, steps: steps };
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        setMessage({ body: response.data.message, isError: false });
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };

  const addStep = () => {
    setSteps([...steps, { name: stepName }]);
    setStepName("");
  };

  const deleteStep = (stepNum) => {
    const copiedStep = steps.concat();
    copiedStep.splice(stepNum, 1);
    setSteps(copiedStep);
  };

  const addStepWithEnterKey = (e) => {
    addStep();
    e.preventDefault();
  };
  return (
    <BorderM>
      <PageTitle value="教材を追加する" />
      <InnerBorder>
        <h2>教材情報</h2>
        <InputM
          value={courseName}
          placeholder="教材名"
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
        />
      </InnerBorder>
      <InnerBorder>
        <h2>チェックポイント情報</h2>
        <ol>
          {steps.map((step, index) => {
            return (
              <li key={index}>
                <div className="my-2">
                  <button
                    className="border-2 border-black mx-2"
                    type="button"
                    onClick={() => {
                      deleteStep(index);
                    }}
                  >
                    削除
                  </button>
                  {step.name}
                </div>
              </li>
            );
          })}
        </ol>

        <form
          action=""
          onSubmit={(e) => {
            addStepWithEnterKey(e);
          }}
        >
          <InputM
            value={stepName}
            placeholder="チェックポイント名"
            onChange={(e) => {
              setStepName(e.target.value);
            }}
          />
          <button type="submit">追加</button>
        </form>
      </InnerBorder>
      <button
        type="button"
        onClick={() => {
          addCourse();
        }}
      >
        教材を追加する
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
    </BorderM>
  );
}
