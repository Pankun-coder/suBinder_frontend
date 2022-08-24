import { useState } from "react";
import CourseModal from "components/progressTab/courseModal";
export default function Course(props) {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <div
        className="w-64 border-2 border-black bg-purple-400 my-2 text-black text-white px-2 inline-block mx-2 cursor-pointer"
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
