import axios from "axios";
import { useState, useEffect } from "react";
import CalendarTab from "../components/calendarTab";
import SearchStudent from "../components/searchStudent";
import ProgressTab from "../components/progressTab";
import { useRouter } from "next/router";
export default function Carte(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [studentInfo, setStudentInfo] = useState({ name: null, id: null });
  const router = useRouter();
  useEffect(() => {
    if (props.query.studentId) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/students/${props.query.studentId}`;
      axios
        .get(url, {
          withCredentials: true,
        })
        .then((res) => {
          if (JSON.stringify(studentInfo) !== JSON.stringify(res.data.student))
            setStudentInfo(res.data.student);
        })
        .catch((error) => {
          console.log("値が不正です");
        });
    }
    if (props.query.tab) {
      setCurrentTab(parseInt(props.query.tab));
    }
  }, [props.query, studentInfo]);

  const changeTabTo = (tab) => {
    if (tab === currentTab) return null;
    router.push(`/groupDashboard?studentId=${studentInfo.id}&tab=${tab}`);
  };

  const tab = () => {
    if (!studentInfo.id) return null;
    switch (currentTab) {
      case 0:
        return <CalendarTab studentInfo={studentInfo} />;
      case 1:
        return <ProgressTab studentInfo={studentInfo} />;
      default:
        return <div></div>;
    }
  };

  const selected =
    "inline-block w-24 border-2 border-purple-500 bg-purple-500 border-b-0 text-white";
  const notSelected = "inline-block w-24 border-2 border-purple-500 border-b-0 cursor-pointer";

  return (
    <section className="w-full text-center mx-auto">
      <SearchStudent
        query={props.query}
        setStudentInfo={(studentInfo) => {
          setStudentInfo(studentInfo);
        }}
      />
      <div className="h-20 flex justify-center items-center">
        {studentInfo.name ? <h1 className="text-3xl">{studentInfo.name}さん</h1> : <h2> </h2>}
      </div>
      <ul>
        <li
          onClick={() => {
            changeTabTo(0);
          }}
          className={currentTab == 0 ? selected : notSelected}
        >
          カレンダー
        </li>
        <li
          onClick={() => {
            changeTabTo(1);
          }}
          className={currentTab == 1 ? selected : notSelected}
        >
          受講状況
        </li>
      </ul>
      <section className="w-5/6 border-2 border-purple-500 mx-auto">{tab()}</section>
    </section>
  );
}
