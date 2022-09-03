import Step from "components/progressTab/step";
import ModalM from "components/common/modalM";
import { useState } from "react";
import axios from "axios";
import { toSnakeCase } from "lib/JSONHelpler";
import MessageModal from "components/common/messageModal";
import PageNavagation from "components/common/pageNavagation";
export default function CourseModal(props) {
  const [stepInfo, setStepInfo] = useState(props.steps);
  const [message, setMessage] = useState({ body: "", isError: false });
  const [currentPage, setCurrentPage] = useState(1);
  const limitForAPage = 8;
  const pages = Math.ceil(stepInfo.length / limitForAPage);

  const setIsComleted = (index) => {
    let Obj = JSON.parse(JSON.stringify(stepInfo));
    Obj[index].isCompleted = !Obj[index].isCompleted;
    setStepInfo(Obj);
  };

  const update = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/progresses/bulk_update/`;
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
      <div className="h-full w-full md:h-full flex flex-col items-center">
        <span className="bg-purple-400 mt-0 text-gray-100 font-bold text-xl inline-block w-full md:text-4xl">
          進捗状況
        </span>
        <div className="grow">
          <div className="mt-2 w-48 overflow-scroll h-32 md:h-56 md:w-72 lg:w-96 bg-purple-200">
            <ol>
              {stepInfo.map((step, index) => {
                return (
                  <li key={step.id}>
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
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <button
          className="w-fit m-auto border-2 mb-4 border-black bg-purple-400"
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
      </div>
    </ModalM>
  );
}
