import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { isReservedBy, isAvailable } from "../lib/calendarHelper";
import Availability from "./availability";
import ModalS from "./modalS";
import MessageModal from "./messageModal";

export default function AvailabilitiesForTime(props) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [message, setMessage] = useState({ body: "", isError: false });
  const router = useRouter();
  let style = "h-24 w-24 inline-block border-2 border-black align-top m-1";
  if (props.status === "reservedByTheUser") {
    style += " bg-red-300";
  } else if (props.status === "available") {
    style += " bg-blue-300";
  }

  const updateReservation = ({ reservationId = null, isCancelling = false }) => {
    const data = { student_id: props.studentInfo.id };
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/class_availabilities/${reservationId}?cancel=${isCancelling}`,
        data,
        { withCredentials: true },
      )
      .then((response) => {
        router.reload();
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };

  const modal = (
    <ModalS
      onClickClose={() => {
        setIsModalShown(false);
      }}
    >
      {props.availabilities.map((value, index) => {
        if (isReservedBy(props.studentInfo.id, value)) {
          return (
            <Availability
              key={index}
              status="reservedByTheUser"
              onClick={() => {
                updateReservation({ reservationId: value.id, isCancelling: true });
              }}
              reservedBy={value.reservedBy.name}
            />
          );
        } else if (isAvailable(value)) {
          return (
            <Availability
              key={index}
              status="available"
              onClick={() => {
                updateReservation({ reservationId: value.id, isCancelling: false });
              }}
            />
          );
        } else {
          return (
            <Availability
              key={index}
              status="reserved"
              onClick={() => {
                updateReservation({ reservationId: value.id, isCancelling: false });
              }}
              reservedBy={value.reservedBy.name}
            />
          );
        }
      })}
    </ModalS>
  );

  return (
    <>
      <div
        className={style}
        onClick={() => {
          setIsModalShown(true);
        }}
      >
        <p>
          {props.time.from.hour}:{props.time.from.min}~{props.time.to.hour}:{props.time.to.min}
        </p>
      </div>
      {isModalShown && modal}
      {message.body && (
        <MessageModal
          message={message.body}
          isError={message.isError}
          onClickClose={() => {
            setMessage({ body: "", isError: false });
          }}
        />
      )}
    </>
  );
}
