import { useDispatch, useSelector } from "react-redux";
import {setTitle} from '../../state/slices/CourseSlice'

function Title(props) {
    const courseTitle = useSelector(state => state.courseData.Title)
    const dispatch = useDispatch()

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value))
    }
    return (
        <div className="w-full">
        <label className="block text-[#000] text-sm font-semibold ">Title</label>
        <input
            className="text-sm appearance-none border rounded-lg w-full h-10 py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
            type="text"
            minLength={3}
            maxLength={30}
            required
            value={courseTitle}
            onChange={handleTitleChange}
            placeholder="e.g. Introduction to Advertising"
        />
    </div>
    );
}

export default Title;