import {useEffect, useRef} from 'react'
import { 
    setListOfEducationVisibility, 
    setListOfLanguagesVisibility, 
    setListOfWorkExperienceVisibility,
    resetLanguageList,
    resetListOfEducation,
    resetListOfWorkExperience,
    getListOfWorkExperience,
    getListOfEducation
} from '../../state/slices/listSlice';
import { getListOfLanguages } from '../../state/slices/listSlice';
import { useDispatch, useSelector } from 'react-redux';
function Modal(props) {
    const modalRef = useRef(null)

    const listOfLanguagesSaved = useSelector(state => state.listData.listOfLanguagesSaved)
    const listOfEducationSaved = useSelector(state => state.listData.listOfEducationSaved)
    const listOfWorkExperienceSaved = useSelector(state => state.listData.listOfWorkExperienceSaved)
    const languages = useSelector(state => state.tutorData.languages)
    const workExperience = useSelector(state => state.tutorData.workExperience)
    const education = useSelector(state => state.tutorData.education)

    const dispatch = useDispatch()

    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            if(props.title === 'Languages') {
                dispatch(setListOfLanguagesVisibility(false))
                if(!listOfLanguagesSaved){
                    dispatch(resetLanguageList())
                }else {
                    dispatch(getListOfLanguages(languages))
                }
            }
            else if (props.title === 'Work Experience') {
                dispatch(setListOfWorkExperienceVisibility(false))
                if(!listOfWorkExperienceSaved){
                    dispatch(resetListOfWorkExperience())
                }else {
                    dispatch(getListOfWorkExperience(workExperience))
                }
            }
            else if(props.title === 'Education') {
                dispatch(setListOfEducationVisibility(false))
                if(!listOfEducationSaved) {
                    dispatch(resetListOfEducation())
                }
                else {
                    dispatch(getListOfEducation(education))
                }
            }
        }
      };

    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
        <div ref={modalRef} className={`bg-backg w-[90%] px-5 py-3 md:w-[50%] lg:w-[35%] xl:w-[35%] max-h-[80%] min-h-[50%] flex flex-col justify-between rounded-md `} >
            <div className="flex space-x-2 py-3 items-center">
                {
                    props.icon
                }
                <span className="text-black text-xl">{props.title}</span>
            </div>
            {
                props.content
            }
        </div>
    </div>
    );
}

export default Modal;