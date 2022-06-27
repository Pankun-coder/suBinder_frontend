import { useState } from "react";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import CalendarTab from "../components/calendarTab"

export default function Carte(props) {
    const [currentTab, setCurrentTab] = useState(0);
    const { data } = useSWR(`http://localhost:3001/api/v0/students/${props.studentInfo.id}?infoType=${currentTab}`, fetcher);

    let tabBody = <div></div>
    switch (currentTab){
        case 0:
            tabBody = <CalendarTab studentInfo={props.studentInfo}/>
            break;
        default:
            tabBody = <div></div>
    }

    return(
        <section className="w-full text-center mx-auto">
            <div className="h-10">
                {props.studentInfo.name ? (<h1 className="text-3xl">{props.studentInfo.name}さん</h1>) : (<h2> </h2>)}
            </div>

            <ul>
                <li onClick={() => {setCurrentTab(0)}} className="inline-block w-24 border-2 border-black border-b-0">カレンダー</li>
                <li onClick={() => {setCurrentTab(1)}} className="inline-block w-24 border-2 border-black border-b-0">受講状況</li>
            </ul>
            <section className="border-2 border-black">
                {tabBody}
            </section>

        </section>



    )
}