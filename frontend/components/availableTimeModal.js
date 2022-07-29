import ModalM from "./modalM";
import { isTimeAvailable, isTimeReservedBy } from "../lib/calendarHelper";
import Time from "./time";
import { areObjectsIdentical } from "../lib/calendarHelper";

export default function AvailableTimeModal(props) {
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

  return (
    <ModalM onClickClose={props.onClickClose}>
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
}
