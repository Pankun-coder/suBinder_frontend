export default function Step(props) {
  return (
    <div className="w-fit text-2xl my-2  mx-auto border-b-2 border-black">
      <h2 className="inline-block w-64 ">{props.name}</h2>
      <input type="checkbox" onChange={props.onChange} checked={props.checked}></input>
    </div>
  );
}
