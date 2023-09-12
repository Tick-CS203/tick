export const Category = (props) => {
    return (
        <div className="flex flex-col text-center">
            <img className="rounded w-[350px] h-[200px]" src={props.imageURL} alt={props.categoryName}/>
            <p className="text-white font-bold text-lg">{props.categoryName}</p>
        </div>
    )
}