import useSWR from "swr";
import fetcher from "lib/fetcher";
import NewCourse from "components/progressTab/newCourse";
import Course from "components/progressTab/course";

export default function ProgressTab(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/progresses/search?student_id=${props.studentInfo.id}`,
    fetcher,
  );
  if (!data) return <h1>loading...</h1>;
  if (error) return <h1>エラーが発生しました</h1>;

  return (
    <div className="min-h-fit h-72 flex flex-col items-center justify-center w-full">
      <ul>
        {Object.keys(data.progresses).map((key) => {
          return (
            <li className="md:inline-block" key={key}>
              <Course courseName={data.progresses[key].name} steps={data.progresses[key].steps} />
            </li>
          );
        })}
        <li className="md:inline-block">
          <NewCourse studentInfo={props.studentInfo} />
        </li>
      </ul>
    </div>
  );
}
