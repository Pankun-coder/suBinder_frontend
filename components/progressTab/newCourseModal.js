import useSWR from "swr";
import fetcher from "lib/fetcher";
import ModalM from "components/common/modalM";
import { useState } from "react";
import axios from "axios";
import MessageModal from "components/common/messageModal";
import PageNavagation from "components/common/pageNavagation";

export default function NewCourseModal(props) {
  const [message, setMessage] = useState({ body: "", isError: false });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/courses`,
    fetcher,
  );
  if (!data) return <ModalM onClickClose={props.onClickClose}>loading</ModalM>;
  if (error) return <ModalM onClickClose={props.onClickClose}>エラーが発生しました</ModalM>;

  const limitForAPage = 6;
  const pages = Math.ceil(data.courses.length / limitForAPage);

  const addCourse = (courseId) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/progresses/bulk_create/`;
    const data = { student_id: props.studentInfo.id, course_id: courseId };
    axios
      .post(url, data, { withCredentials: true })
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
          新しいコースを追加する
        </span>
        <div className="flex flex-col items-center justify-center grow">
          <ul>
            {data.courses
              .slice(limitForAPage * (currentPage - 1), limitForAPage * currentPage)
              .map((course) => {
                return (
                  <li
                    className="text-sm w-fit mx-auto cursor-pointer mb-1 md:inline-block md:rounded md:mx-2 md:py-2 md:w-60 md:text-xl border-2 border-black w-52 md:my-1 xl:w-80 xl:text-3xl"
                    key={course.id}
                    onClick={() => {
                      addCourse(course.id);
                    }}
                  >
                    <div className="md:inline-block">{course.name}</div>
                  </li>
                );
              })}
          </ul>
          <PageNavagation
            pages={pages}
            setPage={(value) => {
              setCurrentPage(value);
            }}
            currentPage={currentPage}
          />
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
      </div>
    </ModalM>
  );
}
