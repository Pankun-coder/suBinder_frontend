import Link from "next/link";
export default function IndexPageButton(props) {
  return (
    <Link href={props.href}>
      <a className="inline-block align-middle bg-white my-4 text-purple-600 hover:bg-gray-200 transition-colors duration-200 rounded-sm font-bold text-xl text-gray-100 text-gray-00 w-64 border-purple-500 border-2 py-4 ">
        {props.text} {">"}
      </a>
    </Link>
  );
}
