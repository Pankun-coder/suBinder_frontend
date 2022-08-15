export default function GuestPageInput(props) {
  return (
    <input
      className="border-b-2 border-gray-800 w-52 my-6 block mr-auto ml-auto w-fit"
      placeholder={props.placeHolder}
      type={props.type}
      onChange={props.onChange}
    ></input>
  );
}
