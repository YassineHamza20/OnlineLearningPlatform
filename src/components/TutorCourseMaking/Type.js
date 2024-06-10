import { useDispatch, useSelector } from "react-redux";
import { setType } from "../../state/slices/CourseSlice";


function Type(props) {
    const Type = [
        "Premium",
        "Free"
    ]
    const courseType = useSelector(state => state.courseData.type)
    const dispatch = useDispatch()

    const handleType = (e) =>{
        dispatch(setType(e.target.value))
    }

    return (
        <div className="w-full justify-items-start items-center">
            <label className="block text-[#000] text-sm font-semibold ">Type</label>
            <select required onChange={handleType} value={courseType} className="border focus:outline-none  z-50 px-2 active:outline-none py-1 rounded-md">
                <option disabled value=''>Choose Type</option>
                {
                    Type.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Type;