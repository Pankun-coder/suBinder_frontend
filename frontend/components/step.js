export default function Step(props) {
  return (
    <div>
      <h2 className="inline">{props.name}</h2>
      <input type="checkbox" onChange={props.onChange} checked={props.checked}></input>
    </div>
  );
}
