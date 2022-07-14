import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { errorMessageContext } from "../lib/errorMessageContext"
import { isReservedBy, isAvailable } from "../lib/calendarHelper";
import Availability from "./availability";
import Modal from "./modal";

export default function AvailabilitiesForTime(props) {
    const {errorMessage, setErrorMessage} = useContext(errorMessageContext);
    const [isModalShown, setIsModalShown] = useState(false);
    const router = useRouter();
    let style = "h-24 w-24 inline-block border-2 border-black align-top m-1"
    if (props.status === "reservedByTheUser") {
        style += " bg-red-300";
    } else if (props.status === "available") {
        style += " bg-blue-300";
    }

    const updateReservation = ({reservationId = null, isCancelling = false}) => {
        console.log(reservationId)
        const data = {student_id: props.studentInfo.id}
        axios.patch(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/class_availabilities/${reservationId}?cancel=${isCancelling}`, data, { withCredentials: true })
        .then(response => {
            router.reload();
        })
        .catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }

    const modal = (
        <Modal onClickOutside={() => {setIsModalShown(false)}}>
            {props.availabilities.map((value, index) => {
                    if (isReservedBy(props.studentInfo.id, value)){
                        return <Availability key={index} status="reservedByTheUser" onClick={() => {updateReservation({reservationId: value.id, isCancelling: true})}} reservedBy={value.reservedBy.name}/>
                    } else if (isAvailable(value)) {
                        return <Availability key={index} status="available" onClick={() => {updateReservation({reservationId: value.id, isCancelling: false})}}/>
                    } else {
                        return <Availability key={index} status="reserved" onClick={() => {updateReservation({reservationId: value.id, isCancelling: false})}} reservedBy={value.reservedBy.name}/>
                    }
                }
            )}
        </Modal>
    )
    
    return (
        <>
            <div className={style} onClick={()=> {setIsModalShown(true)}}>
                <p>{props.time.from.hour}:{props.time.from.min}~{props.time.to.hour}:{props.time.to.min}</p>
            </div>
            {isModalShown&&modal}
        </>

    )
}


