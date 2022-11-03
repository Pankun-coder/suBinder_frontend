import ModalM from "components/common/modalM";
import Time from "components/calendarTab/time";
import PageNavagation from "components/common/pageNavagation";
import { useState } from "react";

export default function AvailableTimeModal(props) {
  const [currentPage, setCurrentPage] = useState(1);

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
    return Array.from(availableTimes).map((value) => JSON.parse(value));
  };

  const limitForAPage = 6;
  const pages = Math.ceil(getTimeList().length / limitForAPage);

  return (
    <ModalM onClickClose={props.onClickClose}>
      <div className="h-full w-full md:h-full flex flex-col items-center">
        <span className="bg-purple-400 mt-0 text-gray-100 font-bold text-xl inline-block w-full md:text-4xl">
          予約時間
        </span>
        <div className="flex flex-col items-center justify-center grow">
          <ul>
            {getTimeList()
              .slice(limitForAPage * (currentPage - 1), limitForAPage * currentPage)
              .map((time, index) => {
                return (
                  <li className="inline" key={index}>
                    <Time
                      time={time}
                      studentInfo={props.studentInfo}
                      availabilities={props.availabilitiesForDay.filter(
                        (av) => av.from === time.from && av.to === time.to,
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
        </div>
      </div>
    </ModalM>
  );
}
