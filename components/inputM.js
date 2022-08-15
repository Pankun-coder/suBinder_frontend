export default function InputM(props) {
  return (
    <input
      className="border-2 border-black w-42"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
}
