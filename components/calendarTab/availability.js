export default function Availability(props) {
  let style =
    "block w-fit mx-auto cursor-pointer mb-1 md:inline-block md:rounded md:mx-2 md:py-2 md:w-60 md:text-xl border-2 border-black w-52 md:my-1 xl:w-80 xl:text-3xl";
  if (props.status == "reservedByTheUser") {
    style += " bg-red-300";
  } else if (props.status === "available") {
    style += " bg-blue-300";
  } else if (props.status === "full") {
    style += " bg-gray-400";
  }
  return (
    <>
      <span onClick={props.onClick} className={style}>
        {props.reservedBy ? props.reservedBy : "空き"}
      </span>
      <div className="hidden">a</div>
    </>
  );
}
