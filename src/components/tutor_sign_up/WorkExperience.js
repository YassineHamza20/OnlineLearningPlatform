import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setListOfWorkExperienceVisibility, setListOfWorkExperienceSaved, getListOfWorkExperience } from "../../state/slices/listSlice"
import { MdWork } from "react-icons/md"
import ModalContent from "./ModalCotent"
import Modal from "../Global/modal"
import { addWorkExperience } from "../../state/slices/listSlice"
import List from "./List"
import { MdEdit } from "react-icons/md";
import {setWorkExperience} from '../../state/slices/tutorSlice'
import { listEmptinessChecker } from '../Global/listEmptinessChecker';


function WorkExperience(props) {
    const listOfWorkExperienceVisibility = useSelector(state => state.listData.listOfWorkExperienceVisibility)//controls the visibility of the modal
    const listOfWorkExperience = useSelector(state => state.listData.listOfWorkExperience) //list of workexperience given by the user 
    const listOfWorkExperienceSaved = useSelector(state => state.listData.listOfWorkExperienceSaved) //controls if the changes are saved in the workExperience or not

    //final list of workexperience
    const workExperience = useSelector(state => state.tutorData.workExperience)

    const dispatch = useDispatch()

    //controlling modal visibility
    const handleWorkExperienceModal = (e) => {
        e.preventDefault()
        dispatch(setListOfWorkExperienceVisibility(true))
    }

    const handleAddWorkExperience = () => {
        dispatch(addWorkExperience({id: listOfWorkExperience.length, title:'', description:'', tag: props.Tags.sort()[0]}))
    }

    
    
    //in case of saving with correct fields, we remove the modal and the save the final list
    const handleSave = () => {
        if(!listEmptinessChecker(listOfWorkExperience)) {
            dispatch(setListOfWorkExperienceVisibility(false))
            dispatch(setWorkExperience(listOfWorkExperience))
            dispatch(setListOfWorkExperienceSaved(true))
        }
    }

    //in case of canceling we remove the modal and remove new changes
    const handleCancel = () => {
        dispatch(setListOfWorkExperienceVisibility(false))
        dispatch(getListOfWorkExperience(workExperience))
    }
    
    const content = [
        <div key="0" className="h-full w-full flex flex-col justify-between overflow-y-auto space-y-5">
            {listOfWorkExperience.map((field, index) => {
                return <ModalContent Tags={props.Tags} key={index} index={field.id} type='work experience' ></ModalContent>
            })}
        </div>,
        <button key="1" onClick={handleAddWorkExperience} type="button" className="text-button self-start px-4 py-2">
                ADD WORK EXPERIENCE
        </button>,
        <div key="2" className="flex justify-end space-x-4">
            <button onClick={handleCancel} type="button" className="text-button  px-4 py-2">
                CANCEL
            </button>
            <button onClick={handleSave} type="button" className={`bg-button ${listEmptinessChecker(listOfWorkExperience)? 'opacity-60 cursor-default': 'cursor-pointer hover:shadow'} px-4 py-2 rounded-lg text-white`}>
                Save
            </button>
        </div>
    ]

    return (
        <>
            <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">    
                <div className="w-full h-[15%] flex items-center">
                {
                    listOfWorkExperienceVisibility?
                    <Modal content={content} title={props.title} icon={<MdWork size="22" color="#FFA447"></MdWork>}></Modal>
                    :
                    null
                }
                    <div className="flex items-center space-x-2">
                        {props.icon}
                        <span className="text-black font-bold text-sm">{props.title}</span>
                    </div>
                    {
                        listOfWorkExperienceSaved?
                        <div onClick={handleWorkExperienceModal} className="ml-auto h-6 w-6 cursor-pointer bg-darkg opacity-75 rounded-full flex justify-center items-center">
                            <MdEdit size="17" color="#ffffff"></MdEdit>
                        </div>
                        :
                        null
                    }
                </div>
                {
                    listOfWorkExperienceSaved?
                    workExperience.map((item, index) => {
                        return <List key={index} title={item.title} description={item.description} tag={item.tag}></List>
                    })
                    :
                    null
                }
                {
                    !listOfWorkExperienceSaved?
                    <button onClick={handleWorkExperienceModal} className=" bg-elements text-sm text-white w-48 h-10 rounded-lg">
                        ADD WORK EXPERIENCE
                    </button>
                    :
                    null
                }
            </div>
        </>
    );
}

export default WorkExperience;