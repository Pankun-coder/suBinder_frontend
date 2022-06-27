export default function calenderDetailModal(props) {
    return(
        <section onClick={(e) => {props.hideModal()}} className="fixed top-0 left-0 w-full h-full bg-black/30">
            <div onClick={(e) => {e.stopPropagation()}} className="left-0 right-0 top-0 bottom-0 w-1/2 h-1/2 absolute m-auto align-middle bg-gray-200 opacity-100 border-2 border-black">
            {props.availabilities.map((value,index) => {
                return (
                    <p key={index}>{value.from.hour}時{value.from.min}分から{value.to.hour}時{value.to.min}分まで</p>
                )
            })}
            </div>
        </section>





    )
        



    

}