import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../../state/slices/tutorSlice";

function Description(props) {
 
    const description = useSelector(state => state.tutorData.description)
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState()
    const dispatch = useDispatch()
    const maxDescriptionLength = 800


     //trigger edit mode
    const handleClick = () => {
    if(!editing ){
            setEditing(true)
        }
    }


    
    //make api call to save modifications
    const handleSave = async (e) => {
        e.preventDefault()
        console.log("submiting");
        if(editing) {//if he's in editing mode
            if( description !== value ) {
                try{
                    await props.modifyCall(value, "desc")
                    dispatch(setDescription(value))
                }catch(err) {
                    console.log(err)
                }
            }
            setEditing(false)
        }
    }

    const handleDescriptionChange = (e) => {
        setValue(e.target.value)
    }


    useEffect(() => {
        if(description){
            setValue(description)
        }
    }, [description])



    return (
        
        <form onSubmit={handleSave} onClick={handleClick} className={` cursor-pointer border-b px-2 hover:bg-lightg justify-between items-start flex border-lightg py-2`}>
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            {
                !editing?
                <>
                    <span className=" max-w-[70%] break-words"> {description}</span>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex items-start relative w-[50%] space-x-3 ">
                        <div className="relative h-[85%] w-full">
                            <textarea 
                            onChange={handleDescriptionChange} 
                            value={value} 
                            className="w-full min-h-32 shadow resize-none focus:outline-none border focus:border-button transition-colors duration-300 rounded-xl p-2 text-sm" 
                            maxLength={maxDescriptionLength} 
                            placeholder='Start with a friendly hello and introduce yourself to students! Your introduction will be the initial impression they get when browsing through their tutor matches...'></textarea>
                            
                        </div>
                        <button type="submit" className="px-4 py-2 rounded-md bg-elements text-white"> Save</button>    
                        <span className="bottom-0 absolute text-sm right-3 ">
                                {value? value.length : 0}/{maxDescriptionLength}
                        </span>
                    </div>
                </> 
            }
            
        </form>
    );
}

export default Description;