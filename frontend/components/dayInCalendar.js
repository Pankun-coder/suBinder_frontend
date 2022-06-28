import { useState } from "react";
import CalenderDetailModal from "./calendarDetailModal";
export default function DayInCalendar(props) {
    const [isModalShown, setIsModalShown] = useState(false);
    const block = () => {
        if (!props.date) return <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16"></div>

        for (const datum in props.data) {
            if (props.data[datum].reserved_by === props.studentInfo.id){
                return (
                    <div onClick={() => {setIsModalShown(true)}} className="border-2 border-black w-16 h-16 bg-red-200">
                        <div>{props.date.getDate()}</div>
                    </div>
                )
            }
        }
        return (
            <div onClick={() => {setIsModalShown(true)}} className="border-2 border-black w-16 h-16">
                <div>{props.date.getDate()}</div>
            </div>
        )
    }
    return (
        <div>
        {block()}
        {isModalShown&&<CalenderDetailModal date={props.date} availabilities={props.data} hideModal={() =>{setIsModalShown(false)}} />}
        </div>

    )


}