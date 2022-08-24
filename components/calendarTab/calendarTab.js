import { useState } from "react";
import useSWR from "swr";
import { calendarDaysFor } from "lib/calendarHelper";
import fetcher from "lib/fetcher";
import DayInCalendar from "components/calendarTab/dayInCalendar";

export default function CalendarTab(props) {
  const [dateObj, setDateObj] = useState(new Date());

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/class_availabilities/search?month=${
      dateObj.getMonth() + 1
    }&year=${dateObj.getFullYear()}`,
    fetcher,
  );
  if (!data) return <h1>loading...</h1>;
  if (error) return <h1>エラーが発生しました</h1>;

  const changeMonthBy = (difference) => {
    let copy = new Date(dateObj.getFullYear(), dateObj.getMonth() + difference, 1);
    setDateObj(copy);
  };

  return (
    <>
      <div className="my-4">
        <p
          className="inline mr-2 text-xl md:mr-12  cursor-pointer"
          onClick={() => {
            changeMonthBy(-1);
          }}
        >
          前月
        </p>
        <p className="inline text-3xl mx-0">
          {dateObj.getFullYear()}年{dateObj.getMonth() + 1}月
        </p>
        <p
          className="inline ml-2 md:ml-12 text-xl cursor-pointer"
          onClick={() => {
            changeMonthBy(1);
          }}
        >
          次月
        </p>
      </div>

      <table className="m-auto">
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
    </>
  );
}
