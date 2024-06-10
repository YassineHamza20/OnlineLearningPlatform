import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setEducation } from "../../state/slices/tutorSlice"
import List from "../tutor_sign_up/List";
import { IoIosArrowDown } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { MdEdit } from "react-icons/md";


function Education(props) {
    
    const Education = useSelector(state => state.tutorData.education)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState([])
    
    
   //list of tags
   const Tags = [
    'Education',
    'It',
    'Advertising',
    'Agriculture',
    'Entrepreneurship',
    'Government',
    'Law',
    'Customer Support',
]

      //trigger edit mode
      const handleClick = async () => {
        if(!editing ){
            setEditing(true)  
            }
            
        }
    

        const areListsEqual = (list1, list2) => {
            if (list1.length !== list2.length) {
                return false; // Lists are not the same length, so they can't be equal
            }
        
            const compareObjects = (obj1, obj2) => {
                return obj1.title === obj2.title &&
                       obj1.tag === obj2.tag &&
                       obj1.description === obj2.description;
            };
        
            return list1.every(item1 => 
                list2.some(item2 => compareObjects(item1, item2))
            ) && list2.every(item2 => 
                list1.some(item1 => compareObjects(item2, item1))
            );
        };
        
    
        
        //make api call to save modifications
        const handleSave = async (e) => {
            e.preventDefault()
            console.log("submiting");
            if(editing) {//if he's in editing mode
                if(!(value.some(item => item.title === null || item.title === "" || item.description === null || item.description === "")||  areListsEqual(value, Education))) {
                    try {
                        await props.modifyCall(value, 'Education')
                        dispatch(setEducation(value))
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    setValue(Education)
                }
                setEditing(false)
            }
        }

        //changing title value
        const handleEducationTitleChange = (e, wxp) => {
            const newValue= { ...wxp, title: e.target.value}
            const newArray = value.map((xp, index) => {
                if(xp.id === newValue.id) {
                    return newValue
                }else {
                    return xp
                }
            })
            setValue(newArray)
        }
        
        //chaging description value
        const handleEducationDescriptionChange = (e, wxp) => {
            const newValue= { ...wxp, description: e.target.value}
            const newArray = value.map((xp) => {
                if(xp.id === newValue.id) {
                    return newValue
                }else {
                    return xp
                }
            })
            setValue(newArray)
        }

        const handleAddEducation = () => {
            setValue([...value, {
                id: value.length? value[value.length-1].id+1 : 0, 
                title: '',
                tag: Tags.sort()[0],
                description: ''
            }])
        }
        
        const handleEducationTagChange = (e, wxp) => {
            const newValue= { ...wxp, tag: e.target.value}
            const newArray = value.map((xp) => {
                if(xp.id === newValue.id) {
                    return newValue
                }else {
                    return xp
                }
            })
            setValue(newArray)
        }

        
        const handleDelete = (e, wxp) => {
            const filteredArray = value.filter(item => item.id !== wxp.id)
            setValue(filteredArray)
        }


        const handleInput=() => {
            const workExpInput = value.map((wxp, index) => {
                
                return <div key={index} className="flex flex-col space-y-3 relative w-full justify-center">
                    {
                        (value.length >1)?
                        <MdCancel onClick={(e) => handleDelete(e, wxp)} size="23" color="#767676" className="cursor-pointer absolute right-3 top-3"></MdCancel>
                        : 
                        null
                    }
                    <input 
                    onChange={(e) => handleEducationTitleChange(e, wxp)} 
                    placeholder='Title' value={wxp.title}  
                    type="text" 
                    className=" w-[70%] block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></input>

                    <div className="relative flex flex-col w-[70%]">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        name="languages" value={wxp.tag} onChange={(e) => handleEducationTagChange(e, wxp)}
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
                <textarea onChange={(e) => handleEducationDescriptionChange(e, wxp)} value={wxp.description} placeholder='Write something about it...' className="w-[70%] min-h-20 appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline resize-none"></textarea>
                </div>

            }) 

            return workExpInput
        }




    useEffect(() => {
        setValue(Education)
    }, [Education])
    

    return (
         
        <form onSubmit={handleSave} onClick={handleClick} className={` cursor-pointer border-b px-2 hover:bg-lightg justify-between items-start flex border-lightg py-2`}>
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            {
                !editing?
                <>
                     <div className="rounded-2xl h-auto flex flex-col space-y-2">
                        {
                            value.map((item, index) => {
                                return <List key={index} title={item.title} description={item.description} tag={item.tag}></List>
                            })
                        }
                    </div>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex flex-col items-center relative w-[50%]  ">
                        {
                            handleInput()
                        }
                        <button key="1" onClick={handleAddEducation} type="button" className="text-button self-start px-4 py-2">
                            ADD WORK EXPERIENCE
                        </button>
                    </div>
                    <button type="submit" className="px-4 py-2 rounded-md bg-elements text-white"> Save</button>    
                </> 
            }
            
        </form>
    )
}

export default Education;