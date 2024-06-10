import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../state/slices/CourseSlice";


function Category(props) {
    const Category = [
        "Business Language Skills",
        "Information Technology Language Skills",
        "Healthcare Language Skills",
        "Legal Language Skills",
        "Engineering Language Skills",
        "Customer Service Language Skills",
        "Academic Language Skills",
        "Hospitality and Tourism Language Skills",
        "Financial Language Skills",
        "Marketing and Sales Language Skills",
    ]

    const courseCategory = useSelector(state => state.courseData.Category)
    const dispatch = useDispatch()

    const handleCategoryChange = (e) => {
        dispatch(setCategory(e.target.value))
    }
    

    return (
        <div className="">
            <label className="block text-[#000] text-sm font-semibold ">Category</label>
            <select required onChange={handleCategoryChange} value={courseCategory} className="border focus:outline-none  z-50 px-2 active:outline-none py-1 rounded-md">
                <option className="text-darkg" disabled value=''>Choose Category</option>
                {
                    Category.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Category;