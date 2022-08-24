export default function InputS(props) {
  return (
    <input
      className="border-2 border-black w-20"
      onChange={props.onChange}
      value={props.value}
      {...props.register}
    ></input>
  );
}
