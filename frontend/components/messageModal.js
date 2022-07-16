import ModalS from "./modalS";
export default function MessageModal(props) {
    const style = "";
    if (props.isError) {
        style += "text-red-500 text-4xl";
    } else {
        style += "text-black text-4xl";
    }
    return (
        <ModalS onClickClose={props.onClickClose}>
            <div className="h-full w-full flex justify-center items-center">
                <h1 className={style}>{props.message}</h1>
            </div>
        </ModalS>
    )
}