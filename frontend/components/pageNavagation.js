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
      <ul>
        <li className="inline-block">
          <div
            className={props.currentPage === 1 ? "mx-1 h-fit w-4" : "mx-1 h-fit w-4 cursor-pointer"}
            onClick={() => {
              props.setPage(1);
            }}
          >
            {"<<"}
          </div>
        </li>
        {array.map((value) => {
          return (
            <li key={value} className="inline-block">
              <div
                className={
                  value === props.currentPage
                    ? "mx-1 h-fit w-4 font-bold"
                    : "mx-1 h-fit w-4 cursor-pointer"
                }
                onClick={() => {
                  props.setPage(value);
                }}
              >
                {value}
              </div>
            </li>
          );
        })}
        <li className="inline-block">
          <div
            className={
              props.currentPage === props.pages ? "mx-1 h-fit w-4" : "mx-1 h-fit w-4 cursor-pointer"
            }
            onClick={() => {
              props.setPage(props.pages);
            }}
          >
            {">>"}
          </div>
        </li>
      </ul>
    </div>
  );
}
