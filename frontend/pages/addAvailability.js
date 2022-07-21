import Layout from "../layouts";
import { useState } from "react";
import axios from "axios";
import LoginRequiredModal from "../components/loginRequiredModal";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";
import BorderM from "../components/borderM";
import InputS from "../components/inputS";
import MessageModal from "../components/messageModal";
import { areAllValidNumbers, isDateValid, isTimeValid } from "../lib/addAvailabilityHelper";
export default function AddAvailability() {
    const {isLoggedIn, setIsLoggedIn} = useContext(isLoggedInContext);

    const [sun, setSun] = useState(false);
    const [mon, setMon] = useState(false);
    const [tue, setTue] = useState(false);
    const [wed, setWed] = useState(false);
    const [thu, setThu] = useState(false);
    const [fri, setFri] = useState(false);
    const [sat, setSat] = useState(false);

    const [fromYear, setFromYear] = useState("");
    const [fromMonth, setFromMonth] = useState("");
    const [fromDay, setFromDay] = useState("");
    const [toYear, setToYear] = useState("");
    const [toMonth, setToMonth] = useState("");
    const [toDay, setToDay] = useState("");

    const [fromHour, setFromHour] = useState("");
    const [fromMin, setFromMin] = useState("");
    const [toHour, setToHour] = useState("");
    const [toMin, setToMin] = useState("");

    const [NumberOfAvailability, setNumberOfAvailability] = useState("");
    const [message, setMessage] = useState({body: "", isError: false})
    
    const send = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/class_availabilities/`
        if (!areAllValidNumbers([fromYear, fromMonth, fromDay, toYear, toMonth, toDay])) {
            setMessage({ body: "日付はローマ数字で入力してください", isError: true});
            return
        }
        if (!areAllValidNumbers([fromHour, fromMin, toHour, toMin])) {
            setMessage({ body: "時刻はローマ数字で入力してください", isError: true});
            return
        }
        if (!parseInt(NumberOfAvailability)) {
            setMessage({ body: "繰り返し回数が不正です", isError: true});
            return
        }
        const intFromYear = parseInt(fromYear);
        const intFromMonth = parseInt(fromMonth);
        const intFromDay = parseInt(fromDay);
        const intToYear = parseInt(toYear);
        const intToMonth = parseInt(toMonth);
        const intToDay = parseInt(toDay);
        const intFromHour = parseInt(fromHour);
        const intFromMin = parseInt(fromMin);
        const intToHour = parseInt(toHour);
        const intToMin = parseInt(toMin);
        const intNumberOfAvailability = parseInt(NumberOfAvailability);
        if (!isDateValid(intFromYear, intFromMonth, intFromDay) || !isDateValid(intToYear, intToMonth, intToDay)) {
            setMessage({ body: "日付が不正です", isError: true});
            return
        }
        if (!isTimeValid(intFromHour, intFromMin) || !isTimeValid(intToHour, intToMin)) {
            setMessage({ body: "時刻が不正です", isError: true});
            return
        }
        if (intFromHour > intToHour || (intFromHour === intToHour && intFromMin >= intToMin)) {
            setMessage({ body: "時刻が不正です", isError: true});
            return
        }
        if (intNumberOfAvailability > 100) {
            setMessage({ body: "100人分以上の枠は一度に作れません", isError: true })
            return
        }
        const data = {from:
                    {
                    year: intFromYear,
                    month: intFromMonth,
                    day: intFromDay
                    },
                to: {
                    year: intToYear,
                    month: intToMonth,
                    day: intToDay
                },
                days: [
                    sun, mon, tue, wed, thu, fri, sat
                ],
                time: {
                    from: {
                        hour: intFromHour,
                        min: intFromMin
                    },
                    to: {
                        hour: intToHour,
                        min: intToMin
                    }
                },
                how_many: intNumberOfAvailability
            }

        axios.post(url, data, {withCredentials: true})
        .then(response => {
            setMessage({body: response.data.message, isError: false})
        })
        .catch(error => {
            setMessage({body: error.response.data.message, isError: true})
        })
    }

    if (!isLoggedIn) return <LoginRequiredModal />

    return (
        <section>
            <BorderM>
            <form className="mx-auto w-1/2">
                    <div className="border-2 border-black text-center my-2">
                        <h2>予約時間</h2>
                        <div className="mx-auto my-4 w-fit">
                            <InputS  id="from-hour" onChange={(e) => {setFromHour(e.target.value)}} value={fromHour} />
                            <label htmlFor="from-hour">時</label>
                            <InputS id="from-min" onChange={(e) => setFromMin(e.target.value)} value={fromMin} />
                            <label htmlFor="from-min">分から</label>
                        </div>

                        <div className="mx-auto my-4 w-fit">
                            <InputS id="to-hour" onChange={(e) => setToHour(e.target.value)} value={toHour} />
                            <label htmlFor="to-hour">時</label>
                            <InputS id="to-min" onChange={(e) => setToMin(e.target.value)} value={toMin} />
                            <label htmlFor="to-min">分まで</label>
                        </div>
                    </div>

                    <div className="border-2 border-black text-center my-2">
                        <h2>繰り返し情報</h2>
                        <div className="mx-auto my-4 w-fit">
                            <InputS id="from-year" onChange={(e) => setFromYear(e.target.value)} value={fromYear} />
                            <label htmlFor="from-year">年</label>
                            <InputS id="from-month" onChange={(e) => setFromMonth(e.target.value)} value={fromMonth} />
                            <label htmlFor="from-month">月</label>
                            <InputS id="from-day" onChange={(e) => setFromDay(e.target.value)} value={fromDay} />
                            <label htmlFor="from-day">日から</label>
                        </div>

                        <div className="mx-auto my-4 w-fit">
                            <InputS id="to-year" onChange={(e) => setToYear(e.target.value)} value={toYear} />
                            <label htmlFor="to-year">年</label>
                            <InputS id="to-month" onChange={(e) => setToMonth(e.target.value)} value={toMonth} />
                            <label htmlFor="to-month">月</label>
                            <InputS id="to-day" onChange={(e) => setToDay(e.target.value)} value={toDay} />
                            <label htmlFor="to-day">日まで</label>
                        </div>

                        <div className="mx-auto my-4 w-fit">
                            <label htmlFor="sun">日</label>
                            <input id="sun" type="checkbox" onChange={(e) => setSun(e.target.checked)} value={sun}/>
                            <label htmlFor="mon">月</label>
                            <input id="mon" type="checkbox" onChange={(e) => setMon(e.target.checked)} value={mon}/>
                            <label htmlFor="tue">火</label>
                            <input id="tue" type="checkbox" onChange={(e) => setTue(e.target.checked)} value={tue}/>
                            <label htmlFor="wed">水</label>
                            <input id="wed" type="checkbox" onChange={(e) => setWed(e.target.checked)} value={wed}/>
                            <label htmlFor="thu">木</label>
                            <input id="thu" type="checkbox" onChange={(e) => setThu(e.target.checked)} value={thu}/>
                            <label htmlFor="fri">金</label>
                            <input id="fri" type="checkbox" onChange={(e) => setFri(e.target.checked)} value={fri}/>
                            <label htmlFor="sat">土</label>
                            <input id="sat" type="checkbox" onChange={(e) => setSat(e.target.checked)} value={sat}/>
                        </div>
                    </div>

                    <div className="mx-auto my-4 w-fit">
                        <InputS id="number-of-availability" onChange={(e) => setNumberOfAvailability(e.target.value)} value={NumberOfAvailability} />
                        <label htmlFor="number-of-availability">人分</label>
                    </div>

                    <div className="text-center m-2">
                        <input type="button" value="予約枠を作る" onClick={() => {send()}} className="border-2 border-black"/>
                    </div>
                </form>
            </BorderM>
            {message.body&&<MessageModal message={message.body} isError={message.isError} onClickClose={()=> {setMessage({body: "", isError: false})}}></MessageModal>}
        </section>
    )
}