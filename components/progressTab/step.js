export default function Step(props) {
  return (
    <div className="w-fit h-7 text-xl my-1 mx-auto border-b-2 border-black md:px-8 lg:px-12">
      <h2 className="inline-block w-fit mr-2">{props.name}</h2>
      <input type="checkbox" onChange={props.onChange} checked={props.checked}></input>
    </div>
  );
}
