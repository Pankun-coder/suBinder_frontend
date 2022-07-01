import { useState } from "react";
import AvailabilityForDay from "./availabilityForDay";
import { isDayReservedBy, isDayAvailable } from "../lib/calendarHelper";

export default function DayInCalendar(props) {
    const [isModalShown, setIsModalShown] = useState(false);
    const day = () => {
        if (!props.date) return <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16"></div> //blanks
        const style = "border-2 border-black w-16 h-16";
        if (isDayReservedBy(props.studentInfo.id, props.data)) {
            style += " bg-red-200"
        } else if (isDayAvailable(props.data)) {
            style += " bg-blue-300"
        }
        return (
            <div onClick={() => {setIsModalShown(true)}} className={style}>
                <div>{props.date.getDate()}</div>
            </div>
        )
    }
    return (
        <div>
        {day()}
        {isModalShown&&<AvailabilityForDay date={props.date} availabilities={props.data} studentInfo={props.studentInfo} hideModal={() =>{setIsModalShown(false)}} />}
        </div>

    )


}