export default function ButtonM(props) {
  return (
    <div className="text-center m-2">
      <input
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        className="border-2 border-black cursor-pointer w-fit"
      />
    </div>
  );
}
