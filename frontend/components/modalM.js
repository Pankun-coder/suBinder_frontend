export default function ModalM({ children, onClickClose, isError }) {
  let textStyle = "";
  if (isError) {
    textStyle = "text-4xl text-red-500 table-cell align-middle ";
  } else {
    textStyle = "textl4xl text-black";
  }
  return (
    <section onClick={onClickClose} className="fixed top-0 left-0 w-full h-full bg-black/30">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          "left-0 right-0 top-0 bottom-0 w-1/2 h-1/2 absolute m-auto bg-gray-100 border-2 border-black shadow-2xl text-center"
        }
      >
        {children}
        <button onClick={onClickClose} className="top-0 right-0 absolute">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
