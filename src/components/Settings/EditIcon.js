import { MdEdit } from "react-icons/md";

function EditIcon(props) {
    
    return (
        <div className="cursor-pointer hover:text-white text-black h-10 w-10 hover:bg-darkg bg-backg opacity-75 rounded-full flex justify-center items-center">
            <MdEdit size="17" className=""></MdEdit>
        </div>
    );
}

export default EditIcon;