import { useState } from "react";
import React from "react";
import MessageModal from "./messageModal";
import AvailabilitiesModal from "./availabilitiesModal";
export default function AvailabilitiesForTime(props) {
  const [isModalShown, setIsModalShown] = useState(false);

  let style = "h-24 w-24 inline-block border-2 border-black align-top m-1";
  if (props.status === "reservedByTheUser") {
    style += " bg-red-300";
  } else if (props.status === "available") {
    style += " bg-blue-300";
  }

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
