import { useState } from "react";
import CalenderDetailModal from "./calendarDetailModal";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import DayInCalendar from "./dayInCalendar";

export default function CalendarTab() {
    const [isModalShown, setIsModalShown] = useState(false);
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [availabilitiesForDay, setAvailabilityForDay] = useState([]);

    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const validDays = Array(lastOfMonth.getDate()).fill(0).map((value, index) => index + 1);
    const preBlanks = Array(firstOfMonth.getDay()).fill(0); //0 = sun, 1 = mon...　represents how many blanks are needed
    const blocksInCalendar = preBlanks.concat(validDays);
    if (blocksInCalendar.length % 7 !== 0) {
        blocksInCalendar.push(...Array(7 - (blocksInCalendar.length % 7)).fill(0));
    }

    const { data, error } = useSWR(`http://localhost:3001/api/v0/class_availabilities/search?month=${month + 1}&year=${year}`, fetcher)
    const showDetailModal = (day) => {
        if (data) {
            const availabilities = [];
            for (const datum in data){
                if (data[datum].from.day === day){
                    availabilities.push(data[datum]);
                }
            }
            setAvailabilityForDay(availabilities);
            setDay(day);
            setIsModalShown(true);
        }
    }

    const calendarBody = (
        <table className="m-auto">
            <caption className="text-2xl">{year}年{month + 1}月</caption>
            <tbody>
            {(() => {
                const tableData = []
                const tableRows = [
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                ]
                for (let i = 0; i < blocksInCalendar.length; i++) {
                    tableData.push(
                        <td onClick={() => {showDetailModal(blocksInCalendar[i])}} key={i}>
                            <DayInCalendar day={blocksInCalendar[i]}/>
                        </td>)
                    if(i % 7 === 6){
                        tableRows.push(
                            <tr key={"tr"+tableRows.length}>{tableData.slice(i-6, i+1)}</tr>
                        );
                    }
                }
                return tableRows;
            })()}
            </tbody>
        </table>
    )

    return(
        <>
        <p onClick={() => {setMonth(month - 1%12)}} className="inline m-2">先月</p>
        <p onClick={() => {setMonth(month + 1%12)}} className="inline m-2">来月</p>
            {calendarBody}
            {isModalShown&&<CalenderDetailModal year={year} month={month} day={day} availabilities={availabilitiesForDay} hideModal={() =>{setIsModalShown(false)}} />}
        </>
    )
}