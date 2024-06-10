
function List(props) {
    const {title, tag, description} = props
    return (
        <div className="flex flex-col h-full">
            <div className="h-full flex space-x-2">
                <span className="text-black text-sm"> {title}</span>
                <span className="text-darkg text-sm"> {tag}</span>
            </div>
            <span className="text-black text-[13px]"> {description}</span>
        </div>
    );
}

export default List;