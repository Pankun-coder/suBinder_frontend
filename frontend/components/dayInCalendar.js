import { useState } from "react";
import { isDayReservedBy, isDayAvailable } from "../lib/calendarHelper";
import ModalM from "./modalM";
import { isTimeAvailable, isTimeReservedBy } from "../lib/calendarHelper";
import Time from "./time";
import { areObjectsIdentical } from "../lib/calendarHelper";

export default function DayInCalendar(props) {
  const [isModalShown, setIsModalShown] = useState(false);
  const day = () => {
    if (!props.date) return <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16"></div>; //blanks
    const style = "border-2 border-black w-16 h-16";
    if (isDayReservedBy(props.studentInfo.id, props.data)) {
      style += " bg-red-200";
    } else if (isDayAvailable(props.data)) {
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
  const timeList = () => {
    const availableTimes = new Set();
    for (const i in props.data) {
      availableTimes.add(JSON.stringify({ from: props.data[i].from, to: props.data[i].to }));
    }
    const availableTimeObjects = Array.from(availableTimes).map((value) => JSON.parse(value));
    return availableTimeObjects;
  };
  const isAvailavilityForATime = (arg1, time) => {
    if (areObjectsIdentical(arg1.from, time.from) && areObjectsIdentical(arg1.to, time.to)) {
      return true;
    }
    return false;
  };

  const availableTimeModal = (
    <ModalM
      onClickClose={() => {
        setIsModalShown(false);
      }}
    >
      <ul>
        {timeList().map((time, index) => {
          if (isTimeReservedBy(props.studentInfo.id, time, props.data)) {
            return (
              <li className="inline" key={index}>
                <Time
                  status="reservedByTheUser"
                  time={time}
                  studentInfo={props.studentInfo}
                  availabilities={props.data.filter((av) => isAvailavilityForATime(av, time))}
                />
              </li>
            );
          } else if (isTimeAvailable(time, props.data)) {
            return (
              <li className="inline" key={index}>
                <Time
                  status="available"
                  time={time}
                  studentInfo={props.studentInfo}
                  availabilities={props.data.filter((av) => isAvailavilityForATime(av, time))}
                />
              </li>
            );
          }
          return (
            <li className="inline" key={index}>
              <Time
                status="full"
                time={time}
                studentInfo={props.studentInfo}
                availabilities={props.data.filter((av) => isAvailavilityForATime(av, time))}
              />
            </li>
          );
        })}
      </ul>
    </ModalM>
  );

  return (
    <div>
      {day()}
      {isModalShown && availableTimeModal}
    </div>
  );
}
