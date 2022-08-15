export default function GuestPageButton(props) {
  return (
    <button
      className="border-b-2 border-gray-800 m-4 w-40"
      type={props.type}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
