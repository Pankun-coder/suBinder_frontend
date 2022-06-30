import axios from "axios";
import { getModuleBuildInfo } from "next/dist/build/webpack/loaders/get-module-build-info";
import { useState, useEffect } from "react";
import CalendarTab from "../components/calendarTab"
import SearchStudent from "../components/searchStudent"

export default function Carte(props) {
    const [currentTab, setCurrentTab] = useState(0);
    const [studentInfo, setStudentInfo] = useState({name: null, id: null});
    useEffect(() => {
        if (props.query.student){
            axios.get(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/students/${props.query.student}`, {withCredentials: true})
            .then(res => {
                setStudentInfo(res.data.student)
            })
        }
    },[props.query.student])
    let tabBody = <div></div>
    if (!studentInfo.id) {
        tabBody = null
    } else {
        switch (currentTab){
            case 0:
                tabBody = <CalendarTab studentInfo={studentInfo}/>
                break;
            default:
                tabBody = <div></div>
        }
    }

    const selected = "inline-block w-24 border-2 border-purple-500 bg-purple-500 border-b-0 text-white"
    const notSelected = "inline-block w-24 border-2 border-purple-500 border-b-0"
    return(
        <section className="w-full text-center mx-auto">
            <SearchStudent query={props.query} setStudentInfo={(studentInfo) => {setStudentInfo(studentInfo)}} />
            <div className="h-20 flex justify-center items-center">
                {studentInfo.name ? (<h1 className="text-3xl">{studentInfo.name}さん</h1>) : (<h2> </h2>)}
            </div>

            <ul>
                <li onClick={() => {setCurrentTab(0)}} className={currentTab == 0 ? selected : notSelected}>カレンダー</li>
                <li onClick={() => {setCurrentTab(1)}} className={currentTab == 1 ? selected : notSelected}>受講状況</li>
            </ul>
            <section className="w-5/6 border-2 border-purple-500 mx-auto">
                {tabBody}
            </section>

        </section>



    )
}