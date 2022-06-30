import {useState} from "react";
import AvailabilityForTime from "./availabilityForTime";
import { hasReservationFor } from "../lib/calendarHelper";
export default function AvailabilityForDay(props) {
    const [isDetailShown, setIsDetailShown] = useState(false);
    const [detailIsFor, setDetailIsFor] = useState(null);

    const timeList = () => {
        const redStyle = "h-24 w-24 inline-block bg-red-300 border-2 border-black align-top m-1";
        const normalStyle = "h-24 w-24 inline-block border-2 border-black align-top m-1";
        const availableTimes = new Set();
        for (const i in props.availabilities) {
            availableTimes.add(JSON.stringify({from: props.availabilities[i].from, to: props.availabilities[i].to}))
        }
        const availableTimeObjects = Array.from(availableTimes).map(value => JSON.parse(value));
        const result = availableTimeObjects.map((time,index) => {
            return (
                <div key={index} 
                    onClick={() =>{showDetailFor(time)}}
                    className={hasReservationFor(props.studentInfo.id, time, props.availabilities) ? redStyle : normalStyle}
                    >
                    <p>{time.from.hour}:{time.from.min}~{time.to.hour}:{time.to.min}</p>
                </div>
            )
        })
        return result;
    }

    const showDetailFor = (aTime) => {
        setDetailIsFor(aTime);
        setIsDetailShown(true);

    }

    const hideDetail = () => {
        setIsDetailShown(false);
        setDetailIsFor(null);
    }

    return (
        <section onClick={() => {props.hideModal()}} className="fixed top-0 left-0 w-full h-full bg-black/30">
            <div onClick={(e) => {e.stopPropagation()}} className="left-0 right-0 top-0 bottom-0 w-1/2 h-1/2 absolute m-auto align-middle bg-gray-100 opacity-100 border-2 border-black shadow-2xl">
                {timeList()}
                <div>
                {isDetailShown ? <AvailabilityForTime studentInfo={props.studentInfo}date={props.date} detailIsFor={detailIsFor} availabilities={props.availabilities} hideDetail={() =>{hideDetail()}}/> : null}
                </div>
            </div>

        </section>
    )
}