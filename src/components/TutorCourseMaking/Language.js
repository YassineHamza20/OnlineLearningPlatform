import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../state/slices/CourseSlice";


function Language(props) {
    const Language= [
        "Arabic",
        "English",
        "French"
    ]
    const courseLanguage = useSelector(state => state.courseData.language)
    const dispatch = useDispatch()

    const handleLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value))
    }

    return (
        <div className="">
            <label className="block text-[#000] text-sm font-semibold ">Language</label>
            <select required onChange={handleLanguageChange} value={courseLanguage} className="border focus:outline-none  z-50 px-2 active:outline-none py-1 rounded-md">
                <option disabled value=''>Choose Language</option>
                {
                    Language.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Language;