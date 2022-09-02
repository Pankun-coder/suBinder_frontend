import { useState } from "react";
import React from "react";
import AvailabilitiesModal from "components/calendarTab/availabilitiesModal";
export default function AvailabilitiesForTime(props) {
  const [isModalShown, setIsModalShown] = useState(false);

  let style =
    "block w-fit mx-auto cursor-pointer mb-1 md:inline-block md:rounded md:mx-2 md:py-2 md:w-60 md:text-xl border-2 border-black w-52 md:my-1 xl:w-80 xl:text-3xl";
  if (props.status === "reservedByTheUser") {
    style += " bg-red-300";
  } else if (props.status === "available") {
    style += " bg-blue-300";
  } else if (props.status === "full") {
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
        {props.time.from.hour}:{props.time.from.min}~{props.time.to.hour}:{props.time.to.min}
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
