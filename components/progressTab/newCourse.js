import { useState } from "react";
import NewCourseModal from "components/progressTab/newCourseModal";

export default function NewCourse(props) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <div
        className="w-fit mx-auto cursor-pointer mb-1 md:inline-block md:rounded md:mx-2 md:py-2 md:w-60 md:text-xl border-2 border-purple-500 font-bold text-purple-500 w-52 md:my-1 xl:w-fit xl:px-4 xl:text-3xl"
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
