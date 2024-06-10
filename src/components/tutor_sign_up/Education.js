import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setListOfEducationVisibility, addEducation, setListOfEducationSaved, getListOfEducation } from "../../state/slices/listSlice";
import Modal from "../Global/modal";
import { MdLanguage } from "react-icons/md";
import ModalContent from "./ModalCotent";
import List from "./List";
import { MdEdit } from "react-icons/md";
import { listEmptinessChecker } from '../Global/listEmptinessChecker';
import { setEducation } from "../../state/slices/tutorSlice";




function Education(props) {

    const dispatch = useDispatch()

    const listOfEducationVisibility = useSelector(state => state.listData.listOfEducationVisibility)
    const listOfEducation = useSelector(state => state.listData.listOfEducation)
    const listOfEducationSaved = useSelector(state => state.listData.listOfEducationSaved) 

    const education = useSelector(state => state.tutorData.education)

    const handleAddEducation = (e) => {
        e.preventDefault()
        dispatch(addEducation({id: listOfEducation.length, title:'', tag: props.Tags.sort()[0], description:''}))
    }

    const handleSave = () => {
        if(!listEmptinessChecker(listOfEducation)){
            dispatch(setListOfEducationVisibility(false))
            dispatch(setEducation(listOfEducation))
            dispatch(setListOfEducationSaved(true))
        }
    }

    const handleCancel = () => {
        dispatch(setListOfEducationVisibility(false))
        dispatch(getListOfEducation(education))
    }

    const content = [
        <div key="0" className="h-full w-full flex flex-col justify-between overflow-y-auto space-y-5">
            {listOfEducation.map((field, index) => {
                return <ModalContent Tags={props.Tags} key={index} index={field.id} type='education' ></ModalContent>
            })}
        </div>,
        <button key="1" onClick={handleAddEducation} type="button" className="text-button self-start px-4 py-2">
                ADD EDUCATION
        </button>,
        <div key="2" className="flex justify-end space-x-4">
            <button onClick={handleCancel} type="button" className="text-button  px-4 py-2">
                CANCEL
            </button>
            <button onClick={handleSave} type="button" className={`bg-button ${listEmptinessChecker(listOfEducation)? 'opacity-60 cursor-default': 'cursor-pointer hover:shadow'} px-4 py-2 rounded-lg text-white`}>
                Save
            </button>
        </div>
    ]

    const handleAddEducationModal = (e) => {
        e.preventDefault()
        dispatch(setListOfEducationVisibility(true))

    }
    return (
        <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
            <div className="w-full h-[15%] flex items-center">
            {
                listOfEducationVisibility?
                <Modal content={content} title={props.title} icon={<MdLanguage size="22" color="#FFA447"></MdLanguage>}></Modal>
                :
                null
            }
                <div className="flex items-center space-x-2">
                    {props.icon}
                    <span className="text-black font-bold text-sm">{props.title}</span>
                </div>
                {
                    listOfEducationSaved?
                    <div onClick={handleAddEducationModal} className="ml-auto h-6 w-6 cursor-pointer bg-darkg opacity-75 rounded-full flex justify-center items-center">
                        <MdEdit size="17" color="#ffffff"></MdEdit>
                    </div>
                    :
                    null
                }
            </div>
            {
                listOfEducationSaved?
                education.map((item, index) => {
                    return <List key={index} title={item.title} description={item.description} tag={item.tag}></List>
                })
                :
                null
            }
            {
                !listOfEducationSaved?
                <button onClick={handleAddEducationModal} className=" bg-elements text-sm text-white w-36 h-10 rounded-lg">
                    ADD EDUCATION
                </button>
                :
                null
            }
        </div>
    );
}

export default Education;