import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import DayInCalendar from "./dayInCalendar";

export default function CalendarTab(props) {
    const [dateObj, setDateObj] = useState(new Date());
    const firstOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    const lastOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
    const validDays = Array(lastOfMonth.getDate()).fill(0).map((value, index) => index + 1);
    const preBlanks = Array(firstOfMonth.getDay()).fill(0); //0 = sun, 1 = mon...　represents how many blanks are needed
    const blocksInCalendar = preBlanks.concat(validDays);
    if (blocksInCalendar.length % 7 !== 0) {
        blocksInCalendar.push(...Array(7 - (blocksInCalendar.length % 7)).fill(0));
    }

    const { data, error } = useSWR(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/class_availabilities/search?month=${dateObj.getMonth() + 1}&year=${dateObj.getFullYear()}`, fetcher);
    if (!data) return <h1>loading...</h1>
    if (error) return <h1>An error has occured.</h1>

    const calendarBody = (
        <table className="m-auto">
            <caption className="text-2xl">{dateObj.getFullYear()}年{dateObj.getMonth() + 1}月</caption>
            <tbody>
            {(() => {
                const tableData = []
                const tableRows = [
                    <tr key={0}>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                ]
                for (let i = 0; i < blocksInCalendar.length; i++) {
                    if (blocksInCalendar[i] === 0){
                        tableData.push(
                            <td key={i}>
                                <DayInCalendar data={data[blocksInCalendar[i]]} studentInfo={props.studentInfo}/>
                            </td>)
                    } else {
                        const date = new Date(dateObj.getFullYear(), dateObj.getMonth(), blocksInCalendar[i]);
                        tableData.push(
                            <td key={i}>
                                <DayInCalendar date={date} data={data[blocksInCalendar[i]]} studentInfo={props.studentInfo}/>
                            </td>)
                    }
                    if(i % 7 === 6){
                        tableRows.push(
                            <tr key={tableRows.length}>{tableData.slice(i-6, i+1)}</tr>
                        );
                    }
                }
                return tableRows;
            })()}
            </tbody>
        </table>
    )
    const changeMonth = (diff) => {
        let copy = new Date(dateObj.getFullYear(), dateObj.getMonth() + diff, 1);

        setDateObj(copy);
    }

    return(
        <>
        <p onClick={() => {changeMonth(-1)}} className="inline m-2">先月</p>
        <p onClick={() => {changeMonth(1)}} className="inline m-2">来月</p>
        {calendarBody}
        </>
    )
}