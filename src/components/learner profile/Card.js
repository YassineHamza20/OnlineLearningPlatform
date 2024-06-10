
function Card(props) {
    return (
        <div className="rounded-2xl px-6 py-5 h-auto flex-col flex justify-center shadow space-y-3 items-center bg-white">
            {
                props.content
            }
        </div>   
    );
}

export default Card;