export default function Availability(props) {
    let style = "w-11/12 border-2 border-black mx-auto my-1 h-7"
    if (props.status == "reservedByTheUser") {
        style += " bg-red-300";
    } else if (props.status === "available") {
        style += " bg-blue-300";
    }
    return (
        <div onClick={props.onClick} className={style}>
            {props.reservedBy&&<p>{props.reservedBy}</p>}
        </div>
    )
}