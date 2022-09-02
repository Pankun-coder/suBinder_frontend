import { useState } from "react";
import CourseModal from "components/progressTab/courseModal";
export default function Course(props) {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <div
        className="w-fit mx-auto cursor-pointer mb-1 md:inline-block md:rounded md:mx-2 md:py-2 md:w-60 md:text-xl border-2 border-black w-52 md:my-1 xl:w-80 xl:text-3xl"
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
