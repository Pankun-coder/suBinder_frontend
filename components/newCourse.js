import { useState } from "react";
import NewCourseModal from "./newCourseModal";

export default function NewCourse(props) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <div
        className="w-64 bg-purple-500 text-white px-2 inline-block mx-2 cursor-pointer"
        onClick={() => setIsModalShown(true)}
      >
        新しいコースを登録する
      </div>
      {isModalShown && (
        <NewCourseModal
          studentInfo={props.studentInfo}
          onClickClose={() => {
            setIsModalShown(false);
          }}
        />
      )}
    </>
  );
}
