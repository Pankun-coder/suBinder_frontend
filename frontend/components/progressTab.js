import useSWR from "swr";
import fetcher from "../lib/fetcher";
import NewCourse from "./newCourse";
import Course from "./course";

export default function ProgressTab(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/progresses/search?student_id=${props.studentInfo.id}`,
    fetcher,
  );
  if (!data) return <h1>loading...</h1>;
  if (error) return <h1>エラーが発生しました</h1>;

  return (
    <div className="h-32">
      <ul>
        {Object.keys(data.progresses).map((key) => {
          return (
            <li className="inline-block" key={key}>
              <Course courseName={data.progresses[key].name} steps={data.progresses[key].steps} />
            </li>
          );
        })}
        <li className="inline-block">
          <NewCourse studentInfo={props.studentInfo} />
        </li>
      </ul>
    </div>
  );
}
