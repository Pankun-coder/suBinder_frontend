export default function calenderDetailModal(props) {
    return(
        <>
            {props.av.map((value,index) => {
                return <p key={index}>{value.from.hour}時{value.from.min}分から{value.to.hour}時{value.to.min}分まで</p>
            })}
        </>
    )
        



    

}