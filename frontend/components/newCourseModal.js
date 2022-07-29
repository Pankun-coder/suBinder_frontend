import useSWR from "swr";
import fetcher from "../lib/fetcher";
import ModalM from "./modalM";
import { useState } from "react";
import axios from "axios";
import MessageModal from "./messageModal";
export default function NewCourseModal(props) {
  const [message, setMessage] = useState({ body: "", isError: false });
  const { data, error } = useSWR(
    `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/courses`,
    fetcher,
  );
  if (!data) return <ModalM onClickClose={props.onClickClose}>loading</ModalM>;
  if (error) return <ModalM onClickClose={props.onClickClose}>エラーが発生しました</ModalM>;
  if (data) console.log(data);
  const addCourse = (courseId) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/progresses/bulk_create/`;
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
      <h1 className="text-4xl m-4">新しいコースを追加する</h1>
      <ul>
        {data.courses.map((course) => {
          return (
            <div
              className="text-2xl w-fit mx-auto cursor-pointer"
              key={course.id}
              onClick={() => {
                addCourse(course.id);
              }}
            >
              {course.name}
            </div>
          );
        })}
      </ul>
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
