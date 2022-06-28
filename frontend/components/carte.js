import { useState } from "react";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import CalendarTab from "../components/calendarTab"

export default function Carte(props) {
    const [currentTab, setCurrentTab] = useState(0);
    const { data } = useSWR(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/students/${props.studentInfo.id}?infoType=${currentTab}`, fetcher);

    let tabBody = <div></div>
    switch (currentTab){
        case 0:
            tabBody = <CalendarTab studentInfo={props.studentInfo}/>
            break;
        default:
            tabBody = <div></div>
    }
    const selected = "inline-block w-24 border-2 border-purple-500 bg-purple-500 border-b-0 text-white"
    const notSelected = "inline-block w-24 border-2 border-purple-500 border-b-0"
    return(
        <section className="w-full text-center mx-auto">
            <div className="h-20 flex justify-center items-center">
                {props.studentInfo.name ? (<h1 className="text-3xl">{props.studentInfo.name}さん</h1>) : (<h2> </h2>)}
            </div>

            <ul>
                <li onClick={() => {setCurrentTab(0)}} className={currentTab == 0 ? selected : notSelected}>カレンダー</li>
                <li onClick={() => {setCurrentTab(1)}} className={currentTab == 1 ? selected : notSelected}>受講状況</li>
            </ul>
            <section className="border-2 border-purple-500">
                {tabBody}
            </section>

        </section>



    )
}