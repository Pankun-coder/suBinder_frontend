import { useState, useContext } from "react";
import axios from "axios";
import LoginRequiredModal from "components/common/loginRequiredModal";
import { isLoggedInContext } from "lib/isLoggedInContext";
import BorderM from "components/common/borderM";
import InputS from "components/common/inputS";
import MessageModal from "components/common/messageModal";
import { isDateValid, isTimeValid } from "lib/addAvailabilityHelper";
import InnerBorder from "components/common/innerBorder";
import ButtonM from "components/common/buttonM";
import PageTitle from "components/common/pageTitle";
import { useForm } from "react-hook-form";
export default function AddAvailability() {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const [message, setMessage] = useState({ body: "", isError: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const send = (data) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/class_availabilities/`;

    const fromYear = data.fromDate.getFullYear();
    const fromMonth = data.fromDate.getMonth() + 1;
    const fromDay = data.fromDate.getDate();
    const toYear = data.toDate.getFullYear();
    const toMonth = data.toDate.getMonth() + 1;
    const toDay = data.toDate.getDate();
    const fromHour = parseInt(data.fromTime.slice(0, 2));
    const fromMin = parseInt(data.fromTime.slice(3, 5));
    const toHour = parseInt(data.toTime.slice(0, 2));
    const toMin = parseInt(data.toTime.slice(3, 5));
    const numberOfAvailability = parseInt(data.numberOfAvailability);
    if (!isDateValid(fromYear, fromMonth, fromDay) || !isDateValid(toYear, toMonth, toDay)) {
      setMessage({ body: "日付が不正です", isError: true });
      return;
    }
    if (!isTimeValid(fromHour, fromMin) || !isTimeValid(toHour, toMin)) {
      setMessage({ body: "時刻が不正です", isError: true });
      return;
    }
    if (fromHour > toHour || (fromHour === toHour && fromMin >= toMin)) {
      setMessage({ body: "時刻が不正です", isError: true });
      return;
    }
    if (numberOfAvailability > 100) {
      setMessage({ body: "100人分以上の枠は一度に作れません", isError: true });
      return;
    }
    const availabilityData = {
      from: {
        year: fromYear,
        month: fromMonth,
        day: fromDay,
      },
      to: {
        year: toYear,
        month: toMonth,
        day: toDay,
      },
      days: [data.sun, data.mon, data.tue, data.wed, data.thu, data.fri, data.sat],
      time: {
        from: {
          hour: fromHour,
          min: fromMin,
        },
        to: {
          hour: toHour,
          min: toMin,
        },
      },
      how_many: numberOfAvailability,
    };

    axios
      .post(url, availabilityData, { withCredentials: true })
      .then((response) => {
        setMessage({ body: response.data.message, isError: false });
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };
  if (!isLoggedIn) return <LoginRequiredModal />;

  return (
    <BorderM>
      <PageTitle value="予約枠を追加する" />
      <form
        onSubmit={handleSubmit((data) => {
          send(data);
        })}
        className="mx-auto w-full lg:w-1/2"
      >
        <InnerBorder>
          <h2>予約時間</h2>
          <div className="mx-auto my-4 w-fit">
            <input
              type="time"
              className="border-2 border-black"
              id="from-time"
              {...register("fromTime", {
                required: "入力が必須の項目です",
              })}
            />

            <label htmlFor="from-time">から</label>
            {errors.toTime && <p>{errors.toTime.message}</p>}
          </div>

          <div className="mx-auto my-4 w-fit">
            <input
              type="time"
              className="border-2 border-black"
              id="to-time"
              {...register("toTime", {
                required: "入力が必須の項目です",
              })}
            />
            <label htmlFor="to-time">まで</label>
            {errors.fromTime && <p>{errors.fromTime.message}</p>}
          </div>
        </InnerBorder>

        <InnerBorder>
          <h2>繰り返し情報</h2>
          <div className="mx-auto my-4 w-fit">
            <input
              type="date"
              id="from-date"
              className="border-2 border-black"
              {...register("fromDate", {
                required: "入力が必須の項目です",
                valueAsDate: true,
              })}
            />
            <label htmlFor="from-date">から</label>
            {errors.fromDate && <p>{errors.fromDate.message}</p>}
          </div>
          <div className="mx-auto my-4 w-fit">
            <input
              type="date"
              id="to-date"
              className="border-2 border-black"
              {...register("toDate", {
                required: "入力が必須の項目です",
                valueAsDate: true,
              })}
            />
            <label htmlFor="to-date">まで</label>
            {errors.toDate && <p>{errors.toDate.message}</p>}
          </div>
          <div className="mx-auto my-4 w-fit">
            <label htmlFor="sun">日</label>
            <input id="sun" type="checkbox" {...register("sun")} />
            <label htmlFor="mon">月</label>
            <input id="mon" type="checkbox" {...register("mon")} />
            <label htmlFor="tue">火</label>
            <input id="tue" type="checkbox" {...register("tue")} />
            <label htmlFor="wed">水</label>
            <input id="wed" type="checkbox" {...register("wed")} />
            <label htmlFor="thu">木</label>
            <input id="thu" type="checkbox" {...register("thu")} />
            <label htmlFor="fri">金</label>
            <input id="fri" type="checkbox" {...register("fri")} />
            <label htmlFor="sat">土</label>
            <input id="sat" type="checkbox" {...register("sat")} />
          </div>
        </InnerBorder>

        <div className="mx-auto my-4 w-fit">
          <InputS
            id="number-of-availability"
            register={register("numberOfAvailability", {
              required: "入力が必須の項目です",
              valueAsNumber: true,
              validate: (val) => {
                if (!parseInt(val)) {
                  return "整数を入力してください";
                } else if (parseInt(val) > 100) {
                  return "一度に作れるのは100人分までです";
                }
              },
            })}
          />
          <label htmlFor="number-of-availability">人分</label>
          {errors.numberOfAvailability && <p>{errors.numberOfAvailability.message}</p>}
        </div>
        <ButtonM type="submit" value="予約枠を作る" />
      </form>
      {message.body && (
        <MessageModal
          message={message.body}
          isError={message.isError}
          onClickClose={() => {
            setMessage({ body: "", isError: false });
          }}
        />
      )}
    </BorderM>
  );
}
