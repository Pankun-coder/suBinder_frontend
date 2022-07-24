export default function PageNavagation(props) {
  const centerOfPageList = 5;
  const maxShownPages = 9;
  let array = new Array(props.pages).fill(0).map((value, index) => (value = index + 1));
  if (props.currentPage < centerOfPageList) {
    array = array.slice(0, maxShownPages);
  } else {
    array = array.slice(
      props.currentPage - centerOfPageList,
      props.currentPage + centerOfPageList - 1,
    );
  }
  return (
    <div className="absolute bottom-0 right-0 left-0">
      <div
        className={
          props.currentPage === 1
            ? "inline-block mx-1 h-fit w-4"
            : "inline-block mx-1 h-fit w-4 cursor-pointer"
        }
        onClick={() => {
          props.setPage(1);
        }}
      >
        {"<<"}
      </div>
      {array.map((value) => {
        return (
          <div
            className={
              value === props.currentPage
                ? "inline-block mx-1 h-fit w-4 font-bold"
                : "inline-block mx-1 h-fit w-4 cursor-pointer"
            }
            onClick={() => {
              props.setPage(value);
            }}
          >
            {value}
          </div>
        );
      })}
      <div
        className={
          props.currentPage === props.pages
            ? "inline-block mx-1 h-fit w-4"
            : "inline-block mx-1 h-fit w-4 cursor-pointer"
        }
        onClick={() => {
          props.setPage(props.pages);
        }}
      >
        {">>"}
      </div>
    </div>
  );
}
