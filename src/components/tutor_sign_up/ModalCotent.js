import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { MdCancel } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io"
import { 
    setWorkExperienceDescription, 
    setWorkExperienceTag, 
    setWorkExperienceTitle, 
    removeWorkExperienceItem,
    setEducationDescription,
    setEducationTag,
    setEducationTitle,
    removeEducationItem
 } from "../../state/slices/listSlice"



function ModalContent(props) {
    const listOfWorkExperience = useSelector(state => state.listData.listOfWorkExperience)
    const listOfEducation = useSelector(state => state.listData.listOfEducation)
    const dispatch = useDispatch()

    const {Tags} = props

    //give user ability to type in the title field and change its value
    const handleTitleChange = (e) => {
        if(props.type === 'work experience'){
            dispatch(setWorkExperienceTitle({id: props.index, title: e.target.value, description:listOfWorkExperience[props.index].description, tag: listOfWorkExperience[props.index].tag}))
        }
        else if (props.type === 'education'){
            dispatch(setEducationTitle({id: props.index, title: e.target.value, description:listOfEducation[props.index].description, tag: listOfEducation[props.index].tag}))
        }
    }
    
    //give user ability to choose the options in the tag section
    const handleTagChange = (e) => {
        if(props.type === 'work experience'){
            dispatch(setWorkExperienceTag({id: props.index, title: listOfWorkExperience[props.index].title, description:listOfWorkExperience[props.index].description, tag: e.target.value}))
        }else if( props.type === 'education') {
            dispatch(setEducationTag({id: props.index, title: listOfEducation[props.index].title, description:listOfEducation[props.index].description, tag: e.target.value}))
        }
    }

    //give user ability to type in the description field and change its value
    const handleDescriptionChange = (e) => {
        if(props.type === 'work experience') {
            dispatch(setWorkExperienceDescription({id: props.index, title: listOfWorkExperience[props.index].title, description: e.target.value, tag: listOfWorkExperience[props.index].tag}))
        } else if (props.type ==='education') {
            dispatch(setEducationDescription({id: props.index, title: listOfEducation[props.index].title, description: e.target.value, tag: listOfEducation[props.index].tag}))
        }
    }

    //deleting item when pressing X icon
    const handleDelete =(e) => {
        e.preventDefault()
        if(props.type === 'work experience') {
            dispatch(removeWorkExperienceItem({id:props.index}))
        }else if(props.type === 'education') {
            dispatch(removeEducationItem({id:props.index}))
        }
    }


    const handleTitleEmptiness = () => {
        //if it's the work experience and the title is empty we return the error
        if(props.type === 'work experience'){
            if(!listOfWorkExperience[props.index].title) {
                return <span className="text-sm px-4 -translate-y-3 text-errortext">Please enter a title</span>
            }else {
                return null
            }
        }else {
              //if it's the education and the title is empty we return the error
            if(!listOfEducation[props.index].title){
                return <span className="text-sm px-4 -translate-y-3 text-errortext">Please enter a title</span>
            }else{
                return null
            }
        }
    }
    const handleDescriptionEmptiness = () => {
        //if it's the work experience and the description is empty we return the error
        if(props.type === 'work experience'){
            if(!listOfWorkExperience[props.index].description) {
                return <span className="text-sm px-4 -translate-y-3 text-errortext">Please enter a description</span>
            }else {
                return null
            }
        }else {
              //if it's the education and the description is empty we return the error
            if(!listOfEducation[props.index].description){
                return <span className="text-sm px-4 -translate-y-3 text-errortext">Please enter a description</span>
            }else{
                return null
            }
        }
    }
    return (
        <>
            <div className="flex h-full w-full justify-between items-center">
                <div className="flex h-full w-full justify-between">
                    <input onChange={handleTitleChange} placeholder='Title' value={props.type==='work experience'? listOfWorkExperience[props.index]?.title: listOfEducation[props.index]?.title} type="text" className=" w-[70%] block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></input>
                    {
                        props.index === 0?
                        null
                        :
                        <MdCancel onClick={handleDelete} size="23" color="#767676" className="cursor-pointer self-start"></MdCancel>
                    }
                </div>
            </div>
            {
                handleTitleEmptiness()
            }
            <div className="relative flex flex-col w-[70%]">
                <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    name="languages" value={props.type==='work experience'? listOfWorkExperience[props.index]?.tag: listOfEducation[props.index]?.tag} onChange={handleTagChange}
                >
                    <option value="" disabled selected>Select Tag</option>
                    {
                        Tags.sort().map((Tag, index)=> {
                            return <option key={index} value={Tag}>{Tag}</option>
                        })
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <IoIosArrowDown></IoIosArrowDown>
                </div>
            </div>
            <textarea onChange={handleDescriptionChange} value={props.type==='work experience'? listOfWorkExperience[props.index]?.description : listOfEducation[props.index]?.description} placeholder='Write something about it...' className="w-[70%] min-h-20 appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline resize-none"></textarea>
            {
                handleDescriptionEmptiness()
            }
            <hr className="h-1 w-full"></hr> 
        </>
    );
}

export default ModalContent;