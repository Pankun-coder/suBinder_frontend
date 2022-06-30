import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";
import React from "react";
import { errorMessageContext } from "../lib/errorMessageContext";
export default function AvailabilityForTime(props) {
    const {errorMessage, setErrorMessage} = useContext(errorMessageContext);
    const router = useRouter();
    const addReservation = (reservationId) => {
        const data = {student_id: props.studentInfo.id}
        axios.patch(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/class_availabilities/${reservationId}`, data, { withCredentials: true })
        .then(res => {
            router.reload();
        })
        .catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }

    const normalStyle = "w-11/12 border-2 border-black mx-auto my-1 h-7"
    const redStyle = "w-11/12 border-2 border-black mx-auto my-1 h-7 bg-red-300"

    const detailedData = []
    for (const i in props.availabilities) {
        if (JSON.stringify(props.availabilities[i].from) == JSON.stringify(props.detailIsFor.from) && JSON.stringify(props.availabilities[i].to) == JSON.stringify(props.detailIsFor.to)) {
            detailedData.push(
                <div key={i} onClick={() => {addReservation(props.availabilities[i].id)}} className={props.availabilities[i].reservedBy.id == props.studentInfo.id ? redStyle : normalStyle}>
                    <p>{props.availabilities[i].reservedBy.name}</p>
                </div>
            )
        }
    }
    const result = (
        <div className="fixed top-0 left-0 w-full h-full" onClick={() => {props.hideDetail()}}>
            <div onClick={(e) => {e.stopPropagation(e)}} className="left-0 right-0 top-0 bottom-0 w-1/3 h-1/3 absolute m-auto align-middle bg-gray-200 border-2 border-black shadow-2xl">
                {detailedData}
            </div>

        </div>
    )
    return result;
}