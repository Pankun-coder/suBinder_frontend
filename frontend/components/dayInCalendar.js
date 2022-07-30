import { useState } from "react";
import { isDayReservedBy, isDayAvailable } from "../lib/calendarHelper";
import AvailableTimeModal from "./availableTimeModal";

export default function DayInCalendar(props) {
  const [isModalShown, setIsModalShown] = useState(false);
  const day = () => {
    if (!props.date) return <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16"></div>; //blanks
    const style = "border-2 border-black w-16 h-16";
    if (isDayReservedBy(props.studentInfo.id, props.availabilitiesForDay)) {
      style += " bg-red-200";
    } else if (isDayAvailable(props.availabilitiesForDay)) {
      style += " bg-blue-300";
    }
    return (
      <div
        onClick={() => {
          setIsModalShown(true);
        }}
        className={style}
      >
        <div>{props.date.getDate()}</div>
      </div>
    );
  };

  return (
    <div>
      {day()}
      {isModalShown && (
        <AvailableTimeModal
          availabilitiesForDay={props.availabilitiesForDay}
          studentInfo={props.studentInfo}
          onClickClose={() => {
            setIsModalShown(false);
          }}
        />
      )}
    </div>
  );
}
