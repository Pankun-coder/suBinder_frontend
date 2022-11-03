import ModalS from "components/common/modalS";
export default function MessageModal(props) {
  return (
    <ModalS onClickClose={props.onClickClose}>
      <div className="w-full md:h-full flex flex-col">
        {props.isError ? (
          <span className="bg-red-600 mt-0 text-gray-100 font-bold text-xl inline-block w-full md:text-4xl md:py-2">
            ERROR
          </span>
        ) : (
          <div className="bg-purple-400 mt-0 text-gray-100 font-bold text-xl inline-block w-full md:text-4xl md:py-2">
            MESSAGE
          </div>
        )}
        <div className="flex items-center justify-center grow">
          <h1 className="text-black text-xl md:text-4xl md:font-thin">{props.message}</h1>
        </div>
      </div>
    </ModalS>
  );
}
