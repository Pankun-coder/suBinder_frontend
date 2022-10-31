import { useState } from "react";
import React from "react";
import AvailabilitiesModal from "components/calendarTab/availabilitiesModal";
import { areAllReserved, hasReservationBy } from "lib/calendarHelper";
export default function AvailabilitiesForTime(props) {
  const [isModalShown, setIsModalShown] = useState(false);

  let style =
    "block w-fit mx-auto cursor-pointer mb-1 md:inline-block md:rounded md:mx-2 md:py-2 md:w-60 md:text-xl border-2 border-black w-52 md:my-1 xl:w-80 xl:text-3xl";
  if (hasReservationBy(props.studentInfo.id, props.availabilities)) {
    style += " bg-red-300";
  } else if (!areAllReserved(props.availabilities)) {
    style += " bg-blue-300";
  } else {
    style += " bg-gray-400";
  }

  return (
    <>
      <span
        onClick={() => {
          setIsModalShown(true);
        }}
        className={style}
      >
        {/* time in style of HH:MM~HH:MM*/}
        {props.time.from.slice(11, 13)}:{props.time.from.slice(14, 16)}~
        {props.time.to.slice(11, 13)}:{props.time.to.slice(14, 16)}{" "}
      </span>
      {isModalShown && (
        <AvailabilitiesModal
          onClickClose={() => {
            setIsModalShown(false);
          }}
          studentInfo={props.studentInfo}
          availabilities={props.availabilities}
        />
      )}
    </>
  );
}
