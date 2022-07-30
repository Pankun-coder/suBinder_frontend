import ModalM from "./modalM";
import { isTimeAvailable, isTimeReservedBy } from "../lib/calendarHelper";
import Time from "./time";
import { areObjectsIdentical } from "../lib/calendarHelper";
import PageNavagation from "./pageNavagation";
import { useState } from "react";

export default function AvailableTimeModal(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const limitForAPage = 10;

  const getTimeList = () => {
    const availableTimes = new Set();
    for (const i in props.availabilitiesForDay) {
      availableTimes.add(
        JSON.stringify({
          from: props.availabilitiesForDay[i].from,
          to: props.availabilitiesForDay[i].to,
        }),
      );
    }
    const availableTimeObjects = Array.from(availableTimes).map((value) => JSON.parse(value));
    return availableTimeObjects;
  };

  const pages = Math.ceil(getTimeList().length / limitForAPage);

  const isAvailavilityForATime = (arg1, time) => {
    if (areObjectsIdentical(arg1.from, time.from) && areObjectsIdentical(arg1.to, time.to)) {
      return true;
    }
    return false;
  };

  return (
    <ModalM onClickClose={props.onClickClose}>
      <ul>
        {getTimeList()
          .slice(limitForAPage * (currentPage - 1), limitForAPage * currentPage)
          .map((time, index) => {
            if (isTimeReservedBy(props.studentInfo.id, time, props.availabilitiesForDay)) {
              return (
                <li className="inline" key={index}>
                  <Time
                    status="reservedByTheUser"
                    time={time}
                    studentInfo={props.studentInfo}
                    availabilities={props.availabilitiesForDay.filter((av) =>
                      isAvailavilityForATime(av, time),
                    )}
                  />
                </li>
              );
            } else if (isTimeAvailable(time, props.availabilitiesForDay)) {
              return (
                <li className="inline" key={index}>
                  <Time
                    status="available"
                    time={time}
                    studentInfo={props.studentInfo}
                    availabilities={props.availabilitiesForDay.filter((av) =>
                      isAvailavilityForATime(av, time),
                    )}
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
                  availabilities={props.availabilitiesForDay.filter((av) =>
                    isAvailavilityForATime(av, time),
                  )}
                />
              </li>
            );
          })}
      </ul>
      <PageNavagation
        pages={pages}
        setPage={(page) => {
          setCurrentPage(page);
        }}
        currentPage={currentPage}
      />
    </ModalM>
  );
}
