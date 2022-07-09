import Layout from "../layouts";
import { useState } from "react";
import axios from "axios";
import LoginRequiredModal from "../components/loginRequiredModal";
import { useContext } from "react";
import { isLoggedInContext } from "../lib/isLoggedInContext";

export default function AddAvailability() {
    const {isLoggedIn, setIsLoggedIn} = useContext(isLoggedInContext);
    if (!isLoggedIn) {
        return (
            <Layout>
                <LoginRequiredModal />
            </Layout>
        )
    }
    
    const [sun, setSun] = useState(false);
    const [mon, setMon] = useState(false);
    const [tue, setTue] = useState(false);
    const [wed, setWed] = useState(false);
    const [thu, setThu] = useState(false);
    const [fri, setFri] = useState(false);
    const [sat, setSat] = useState(false);

    const [fromYear, setFromYear] = useState(null);
    const [fromMonth, setFromMonth] = useState(null);
    const [fromDay, setFromDay] = useState(null);
    const [toYear, setToYear] = useState(null);
    const [toMonth, setToMonth] = useState(null);
    const [toDay, setToDay] = useState(null);

    const [fromHour, setFromHour] = useState(null);
    const [fromMin, setFromMin] = useState(null);
    const [toHour, setToHour] = useState(null);
    const [toMin, setToMin] = useState(null);

    const [NumberOfAvailability, setNumberOfAvailability] = useState(null);

    const send = () => {
        const url = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/class_availabilities/`
        const data = {from:
                    {
                    year: fromYear,
                    month: fromMonth,
                    day: fromDay
                    },
                to: {
                    year: toYear,
                    month: toMonth,
                    day: toDay
                },
                days: [
                    sun, mon, tue, wed, thu, fri, sat
                ],
                time: {
                    from: {
                        hour: fromHour,
                        min: fromMin
                    },
                    to: {
                        hour: toHour,
                        min: toMin
                    }
                },
                how_many: NumberOfAvailability
            }
                console.log(data)
        axios.post(url, data, {withCredentials: true})
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <Layout>
            <section>
                <form>
                    <div className="m-2">
                        <input className="border-2 border-black" id="from-year" onChange={(e) => setFromYear(e.target.value)} value={fromYear}></input>
                        <label htmlFor="from-year">年</label>
                        <input className="border-2 border-black" id="from-month" onChange={(e) => setFromMonth(e.target.value)} value={fromMonth}></input>
                        <label htmlFor="from-month">月</label>
                        <input className="border-2 border-black" id="from-day" onChange={(e) => setFromDay(e.target.value)} value={fromDay}></input>
                        <label htmlFor="from-day">日から</label>
                    </div>

                    <div className="m-2">
                        <input className="border-2 border-black" id="to-year" onChange={(e) => setToYear(e.target.value)} value={toYear}></input>
                        <label htmlFor="to-year">年</label>
                        <input className="border-2 border-black" id="to-month" onChange={(e) => setToMonth(e.target.value)} value={toMonth}></input>
                        <label htmlFor="to-month">月</label>
                        <input className="border-2 border-black" id="to-day" onChange={(e) => setToDay(e.target.value)} value={toDay}></input>
                        <label htmlFor="to-day">日まで</label>
                    </div>

                    <div className="m-2">
                        <label htmlFor="sun">日</label>
                        <input id="sun" type="checkbox" onChange={(e) => setSun(e.target.checked)}/>
                        <label htmlFor="mon">月</label>
                        <input id="mon" type="checkbox" onChange={(e) => setMon(e.target.checked)}/>
                        <label htmlFor="tue">火</label>
                        <input id="tue" type="checkbox" onChange={(e) => setTue(e.target.checked)}/>
                        <label htmlFor="wed">水</label>
                        <input id="wed" type="checkbox" onChange={(e) => setWed(e.target.checked)}/>
                        <label htmlFor="thu">木</label>
                        <input id="thu" type="checkbox" onChange={(e) => setThu(e.target.checked)}/>
                        <label htmlFor="fri">金</label>
                        <input id="fri" type="checkbox" onChange={(e) => setFri(e.target.checked)}/>
                        <label htmlFor="sat">土</label>
                        <input id="sat" type="checkbox" onChange={(e) => setSat(e.target.checked)}/>
                    </div>
                    <div className="m-2">
                        <input className="border-2 border-black" id="from-hour" onChange={(e) => setFromHour(e.target.value)} value={fromHour}></input>
                        <label htmlFor="from-hour">時</label>
                        <input className="border-2 border-black" id="from-min" onChange={(e) => setFromMin(e.target.value)} value={fromMin}></input>
                        <label htmlFor="from-min">分から</label>

                        <input className="border-2 border-black" id="to-hour" onChange={(e) => setToHour(e.target.value)} value={toHour}></input>
                        <label htmlFor="to-hour">時</label>
                        <input className="border-2 border-black" id="to-min" onChange={(e) => setToMin(e.target.value)} value={toMin}></input>
                        <label htmlFor="to-min">分まで</label>
                    </div>

                    <div className="m-2">
                        <input className="border-2 border-black" id="number-of-availability" onChange={(e) => setNumberOfAvailability(e.target.value)} value={NumberOfAvailability}></input>
                        <label htmlFor="number-of-availability">人分</label>
                    </div>

                    <div className="text-center m-2">
                        <input type="button" value="予約枠を作る" onClick={() => {send()}} className="border-2 border-black"/>
                    </div>
                </form>
            </section>
        </Layout>
    )
}