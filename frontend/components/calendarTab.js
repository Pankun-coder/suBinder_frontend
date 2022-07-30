import { useState } from "react";
import useSWR from "swr";
import { calendarDaysFor } from "../lib/calendarHelper";
import fetcher from "../lib/fetcher";
import DayInCalendar from "./dayInCalendar";

export default function CalendarTab(props) {
  const [dateObj, setDateObj] = useState(new Date());

  const { data, error } = useSWR(
    `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/class_availabilities/search?month=${
      dateObj.getMonth() + 1
    }&year=${dateObj.getFullYear()}`,
    fetcher,
  );
  if (!data) return <h1>loading...</h1>;
  if (error) return <h1>エラーが発生しました</h1>;

  const calendarBody = (
    <table className="m-auto">
      <caption className="text-2xl">
        {dateObj.getFullYear()}年{dateObj.getMonth() + 1}月
      </caption>
      <tbody>
        {(() => {
          const days = calendarDaysFor(dateObj);
          const tableData = [];
          const tableRows = [
            <tr key={0}>
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>,
          ];
          for (let i = 0; i < days.length; i++) {
            if (days[i] === 0) {
              tableData.push(
                <td key={i}>
                  <DayInCalendar
                    availabilitiesForDay={data[days[i]]}
                    studentInfo={props.studentInfo}
                  />
                </td>,
              );
            } else {
              const date = new Date(dateObj.getFullYear(), dateObj.getMonth(), days[i]);
              tableData.push(
                <td key={i}>
                  <DayInCalendar
                    date={date}
                    availabilitiesForDay={data[days[i]]}
                    studentInfo={props.studentInfo}
                  />
                </td>,
              );
            }
            if (i % 7 === 6) {
              tableRows.push(<tr key={tableRows.length}>{tableData.slice(i - 6, i + 1)}</tr>);
            }
          }
          return tableRows;
        })()}
      </tbody>
    </table>
  );

  const changeMonthBy = (difference) => {
    let copy = new Date(dateObj.getFullYear(), dateObj.getMonth() + difference, 1);
    setDateObj(copy);
  };

  return (
    <>
      <p
        onClick={() => {
          changeMonthBy(-1);
        }}
        className="inline m-2"
      >
        先月
      </p>
      <p
        onClick={() => {
          changeMonthBy(1);
        }}
        className="inline m-2"
      >
        来月
      </p>
      {calendarBody}
    </>
  );
}
