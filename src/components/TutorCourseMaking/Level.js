import { useDispatch, useSelector } from "react-redux";
import { setLevel } from "../../state/slices/CourseSlice";

function Level(props) {
    const Level = [
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
    ]
    const courseLevel = useSelector(state => state.courseData.level)
    const dispatch = useDispatch()

    const handleLevel = (e) => {
        dispatch(setLevel(e.target.value))
    }
    return (
        <div className="">
            <label className="block text-[#000] text-sm font-semibold ">Level</label>
            <select
            required 
            onChange={handleLevel} 
            value={courseLevel} 
            className="border focus:outline-none  z-50 px-2 active:outline-none py-1 rounded-md">
                <option disabled value=''>Choose Level</option>
                {
                    Level.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Level;