interface Props {
  type: string;
  value: string;
  onClick: () => void;
}

export default function ButtonM(props: Props) {
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
