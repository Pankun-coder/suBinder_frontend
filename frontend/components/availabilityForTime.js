import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { errorMessageContext } from "../lib/errorMessageContext"
import { isReservedBy, isAvailable, areObjectsIdentical } from "../lib/calendarHelper";
import Availability from "./availability";


export default function AvailabilityForTime(props) {
    const {errorMessage, setErrorMessage} = useContext(errorMessageContext);
    const router = useRouter();

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

    const onClickHandle = (availability) => {
        if (availability.reservedBy.id !== props.studentInfo.id) {
            updateReservation({reservationId: availability.id, isCancelling: false});
        } if (availability.reservedBy.id === props.studentInfo.id) {
            updateReservation({reservationId: availability.id, isCancelling: true})
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full" onClick={() => {props.hideDetail()}}>
            <div onClick={(e) => {e.stopPropagation(e)}} className="left-0 right-0 top-0 bottom-0 w-1/3 h-1/3 absolute m-auto align-middle bg-gray-200 border-2 border-black shadow-2xl">
                    {props.availabilities.map((value, index) => {
                        if (JSON.stringify(value.from) == JSON.stringify(props.targetTime.from) && JSON.stringify(value.to) == JSON.stringify(props.targetTime.to)){
                            (areObjectsIdentical(value.from, props.targetTime.from) && areObjectsIdentical(value.to, props.targetTime.to))
                            if (isReservedBy(props.studentInfo.id, value)){
                                return <Availability key={index} status="reservedByTheUser" onClick={() => {onClickHandle(value)}} reservedBy={value.reservedBy.name}/>
                            } else if (isAvailable(value)) {
                                return <Availability key={index} status="available" onClick={() => {onClickHandle(value)}}/>
                            } else {
                                return <Availability key={index} status="reserved" onClick={() => {onClickHandle(value)}} reservedBy={value.reservedBy.name}/>
                            }
                        }
                    })}
            </div>
        </div>
    )
}


