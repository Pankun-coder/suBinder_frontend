import useSWR from "swr";
import fetcher from "../lib/fetcher";
import NewCourse from "./newCourse";
import Course from "./course";

export default function ProgressTab(props) {
  const { data, error } = useSWR(
    `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/progresses/search?student_id=${props.studentInfo.id}`,
    fetcher,
  );
  if (!data) return <h1>loading...</h1>;
  if (error) return <h1>エラーが発生しました</h1>;
  console.log(data.progresses);
  return (
    <div className="h-32">
      {Object.keys(data.progresses).map((key) => {
        return (
          <Course
            key={key}
            courseName={data.progresses[key].name}
            steps={data.progresses[key].steps}
          />
        );
      })}
      <NewCourse studentInfo={props.studentInfo} />
    </div>
  );
}
