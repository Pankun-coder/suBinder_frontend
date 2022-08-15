import { useState } from "react";
import CourseModal from "./courseModal";
export default function Course(props) {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <div
        className="w-64 bg-purple-500 text-white px-2 inline-block mx-2 cursor-pointer"
        onClick={() => setIsModalShown(true)}
      >
        {props.courseName}
      </div>
      {isModalShown && (
        <CourseModal
          steps={props.steps}
          onClickClose={() => {
            setIsModalShown(false);
          }}
        />
      )}
    </>
  );
}
