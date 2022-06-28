export default function ShowError(props) {
    return (
        <section onClick={() => {props.hideError()}} className="fixed top-0 left-0 w-full h-full bg-black/30">
            <div onClick={(e) => {e.stopPropagation()}} className="left-0 right-0 top-0 bottom-0 w-1/2 h-1/2 absolute m-auto align-middle bg-gray-100 border-2 border-black shadow-2xl text-center">
                <h1 className="text-red-500 text-6xl">{props.errorMessage}</h1>
                <button onClick={() => {props.hideError()}}>閉じる</button>
            </div>
        </section>
    )
}