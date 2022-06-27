
export default function DayInCalendar(props) {
    if (parseInt(props.day)){
        return (
            <div className="border-2 border-black w-16 h-16">
                <div>{props.day}</div>
            </div>
        )
    } else {
        return (
            <div className="border-2 border-gray-400 bg-gray-200 w-16 h-16">
            </div>
        )
    }

}