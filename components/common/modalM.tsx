import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  onClickClose: () => void;
}

export default function ModalM(props: Props) {
  return (
    <section onClick={props.onClickClose} className="fixed top-0 left-0 w-full h-full bg-black/30">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          "left-0 right-0 top-0 bottom-0 w-2/3 h-60 md:h-80 absolute m-auto bg-gray-200 shadow-2xl text-center"
        }
      >
        {props.children}
        <button onClick={props.onClickClose} className="top-0 right-0 absolute">
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
