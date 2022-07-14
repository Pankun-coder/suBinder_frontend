
export default function ModalS({children, onClickClose}) {
    return (
        <section onClick={onClickClose} className="fixed top-0 left-0 w-full h-full bg-black/30">
            <div onClick={(e) => {e.stopPropagation()}} className="left-0 right-0 top-0 bottom-0 w-1/3 h-1/3 absolute m-auto align-middle bg-gray-100 border-2 border-black shadow-2xl text-center">
                {children}
                <button onClick={onClickClose} className="top-0 right-0 absolute">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </section>
    )

}