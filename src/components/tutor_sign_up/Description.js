import {setDescription,} from '../../state/slices/tutorSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';

function Description() {
    const maxDescriptionLength = 800
    //hook to change tutor Data in the slice
    const dispatch = useDispatch()

    //getting tutor Data from the store 
    const tutorData = useSelector(state => state.tutorData)


    
    
    //getting the value of the description field
    const handleDescriptionChange = (e) => {
        dispatch(setDescription(e.target.value))
    }
    return (
        <div className="w-[80%] md:w-[50%] h-[30%] flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
            <span className="text-black font-bold h-[15%]"> Description </span>
            <div className="relative h-[85%] w-full">
                <textarea onChange={handleDescriptionChange} value={tutorData.description} className="w-full shadow resize-none focus:outline-none border focus:border-button transition-colors duration-300 h-full rounded-xl p-2 text-sm" maxLength={maxDescriptionLength} placeholder='Start with a friendly hello and introduce yourself to students! Your introduction will be the initial impression they get when browsing through their tutor matches...'></textarea>
                <span className="bottom-0 absolute text-sm right-3 ">{tutorData.description.length}/{maxDescriptionLength}</span>
            </div>
        </div>
    );
}

export default Description;