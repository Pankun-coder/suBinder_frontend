import { useState } from "react";
import CalenderDetailModal from "./calendarDetailModal";
export default function DayInCalendar(props) {
    const [isModalShown, setIsModalShown] = useState(false);
    const block = () => {
        if (!parseInt(props.day)) return <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16"></div>

        for (const datum in props.data) {
            if (props.data[datum].reserved_by === props.studentInfo.id){
                return (
                    <div onClick={() => {setIsModalShown(true)}} className="border-2 border-black w-16 h-16 bg-red-200">
                        <div>{props.day}</div>
                    </div>
                )
            }
        }
        return (
            <div className="border-2 border-black w-16 h-16">
                <div>{props.day}</div>
            </div>
        )
    }
    return (
        <div>
        {block()}
        {isModalShown&&<CalenderDetailModal year={props.year} month={props.month} day={props.day} availabilities={props.data} hideModal={() =>{setIsModalShown(false)}} />}
        </div>

    )


}