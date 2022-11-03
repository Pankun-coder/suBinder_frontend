import { useState } from "react";
import useSWR from "swr";
import { getFirstDayOfMonth, getLastDayOfMonth } from "lib/calendarHelper";
import fetcher from "lib/fetcher";
import DayInCalendar from "components/calendarTab/dayInCalendar";

export default function CalendarTab(props) {
  const [dateObj, setDateObj] = useState(new Date());

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v1/class_availabilities/search?month=${
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

  const getArrayOfSquaresForCalendar = (dateObj) => {
    const firstOfMonth = getFirstDayOfMonth(dateObj);
    const lastOfMonth = getLastDayOfMonth(dateObj);
    const daysForCells = [];

    const preBlanks = Array(firstOfMonth.getDay()).fill(0); //0 = sun, 1 = mon...　represents how many blanks are needed
    daysForCells.push(...preBlanks);

    const validDays = Array(lastOfMonth.getDate())
      .fill(0)
      .map((_, index) => index + 1);
    daysForCells.push(...validDays);

    if (daysForCells.length % 7 !== 0) {
      const postBlanks = Array(7 - (daysForCells.length % 7)).fill(0);
      daysForCells.push(...postBlanks);
    }

    let tableCells = [];
    for (let i = 0; i < daysForCells.length; i++) {
      if (daysForCells[i] === 0) {
        tableCells.push(
          <td key={i}>
            <DayInCalendar availabilitiesForDay={null} studentInfo={props.studentInfo} />
          </td>,
        );
      } else {
        const date = new Date(dateObj.getFullYear(), dateObj.getMonth(), daysForCells[i]);
        tableCells.push(
          <td key={i}>
            <DayInCalendar
              date={date}
              availabilitiesForDay={data.filter(
                (availability) =>
                  Math.trunc(Number(availability.from.slice(8, 10))) == daysForCells[i],
              )}
              studentInfo={props.studentInfo}
            />
          </td>,
        );
      }
    }
    return tableCells;
  };

  const calendarCells = getArrayOfSquaresForCalendar(dateObj);
  const calendarRows = [];
  for (const i = 0; i < calendarCells.length; i++) {
    if (i % 7 === 6) {
      calendarRows.push(<tr key={calendarRows.length}>{calendarCells.slice(i - 6, i + 1)}</tr>);
    }
  }

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
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
          {calendarRows}
        </tbody>
      </table>
    </>
  );
}
