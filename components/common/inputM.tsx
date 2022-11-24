import { UseFormRegisterReturn } from "react-hook-form";

type AttributesForInput = JSX.IntrinsicElements["input"];
interface Props extends AttributesForInput {
  register?: UseFormRegisterReturn;
}

export default function InputM(props: Props) {
  const { register, ...attributes } = props;
  return <input className="border-2 border-black w-42" {...attributes} {...register} />;
}
