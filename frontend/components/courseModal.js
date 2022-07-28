import Step from "./step";
import ModalM from "../components/modalM";
import { useState } from "react";
export default function CourseModal(props) {
  const [stepInfo, setStepInfo] = useState(props.steps);

  const setIsComleted = (index) => {
    let Obj = JSON.parse(JSON.stringify(stepInfo));
    Obj[index].isCompleted = !Obj[index].isCompleted;
    setStepInfo(Obj);
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
    </ModalM>
  );
}
