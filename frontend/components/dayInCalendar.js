import { useState } from "react";
import AvailabilityForDay from "./availabilityForDay";

export default function DayInCalendar(props) {
    const [isModalShown, setIsModalShown] = useState(false);
    const block = () => {
        if (!props.date) return <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16"></div>

        for (const datum in props.data) {
            if (props.data[datum].reservedBy.id === props.studentInfo.id){
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
        {isModalShown&&<AvailabilityForDay date={props.date} availabilities={props.data} studentInfo={props.studentInfo} hideModal={() =>{setIsModalShown(false)}} />}
        </div>

    )


}