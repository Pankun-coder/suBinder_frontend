import { useState } from "react";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import CalendarTab from "../components/calendarTab"

export default function Carte(props) {
    const [currentTab, setCurrentTab] = useState(0);
    const { data } = useSWR(`http://localhost:3001/api/v0/students/${props.studentId}?infoType=${currentTab}`, fetcher);

    let tabBody = <div></div>
    switch (currentTab){
        case 0:
            tabBody = <CalendarTab />
            break;
        default:
            tabBody = <div></div>
    }

    return(
        <>
        <h2>carte</h2>
        <div onClick={() => {setCurrentTab(0)}}>tab1</div><div onClick={() => {setCurrentTab(1)}}>tab2</div>
        <p>{props.studentId}</p>
        {tabBody}
        </>

    )
}