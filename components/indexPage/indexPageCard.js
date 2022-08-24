export default function IndexPageCard(props) {
  return (
    <dl className="text-left pl-2 w-40 lg:w-72 h-32 lg:h-48 align-top bg-white shadow-xl flex-shrink-0">
      <dt className="w-fit border-b-2 border-gray-200 pr-4 h-fit my-1 text:base lg:text-xl">
        {props.title}
      </dt>
      <dd className="text-sm lg:text-lg mt-1/2 font-light">{props.text}</dd>
    </dl>
  );
}
