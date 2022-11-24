import { UseFormRegisterReturn } from "react-hook-form";

type AttributesForInput = JSX.IntrinsicElements["input"];
interface Props extends AttributesForInput {
  register?: UseFormRegisterReturn;
}

export default function InputS(props: Props) {
  const { register, ...attributes } = props;
  return <input className="border-2 border-black w-20" {...attributes} {...props.register}></input>;
}
