import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../../state/slices/CourseSlice";


function Description(props) {
    const maxDescriptionLength = 1200
    const courseDescription = useSelector(state => state.courseData.description)
    const dispatch = useDispatch()
    
    const handleDescriptionChange = (e) => {
        dispatch(setDescription(e.target.value))
    }
   
    return (
        <div className="w-full">
            <label className="block text-[#000] text-sm font-semibold ">Notes / Unavailable times </label>
            <div className="flex items-start relative space-x-3 ">
                <div className="relative h-[85%] w-full">
                    <textarea 
                    onChange={handleDescriptionChange} 
                    value={courseDescription}
                    required
                    className="w-full min-h-32 resize-none focus:outline-none border focus:border-button transition-colors duration-300 rounded-xl p-2 text-sm" 
                    maxLength={maxDescriptionLength} 
                    placeholder='Start with a friendly hello and introduce yourself to students! Your introduction will be the initial impression they get when browsing through their tutor matches...'></textarea>
                    
                </div>
            </div>
            <span className="text-left text-sm text-darkg">
                    {courseDescription? courseDescription.length : 0}/{maxDescriptionLength}
            </span>
        </div>
    );
}

export default Description;