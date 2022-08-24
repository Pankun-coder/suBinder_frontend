export default function Step(props) {
  return (
    <div className="w-4/5 h-8 text-xl my-2 mx-auto border-b-2 border-black">
      <h2 className="inline-block w-fit mr-2">{props.name}</h2>
      <input type="checkbox" onChange={props.onChange} checked={props.checked}></input>
    </div>
  );
}
