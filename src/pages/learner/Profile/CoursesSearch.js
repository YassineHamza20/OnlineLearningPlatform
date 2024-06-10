import { useEffect, useState } from "react";
import { CourseLoading } from "../../../components/Global/LoadingCards";
import Course from "../../../components/LearnerCourses/Course";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { setListOfCourses } from "../../../state/slices/CourseSlice";
import Footer from "../../../components/Global/Footer";

function CoursesSearch() {
    const Category = [
        "All",
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
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState("")

    const [list, setList] = useState([])

    const dispatch = useDispatch()

    const AllCoursesList = useSelector(state => state.courseData.listOfCourses)

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.post('http://localhost:5000/learner/getAllCourses')
                console.log("myCourses: ", response.data);
                if (response.data.result.length === 0) {
                    setIsEmpty(true)
                } else {
                    dispatch(setListOfCourses(response.data.result))
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchMyCourses()
    }, [])

    useEffect(() => {
        if (AllCoursesList) {
            setList(AllCoursesList)
        }
    }, [AllCoursesList])

    const handleSelectedCategory = (Category) => {
        setSelectedCategory(Category)
        if (Category === "All") {
            setList(AllCoursesList)
        } else {
            const filteredArray = AllCoursesList.filter((item) => item.Category === Category)
            setList(filteredArray)
        }
        setIsEmpty(filteredArray.length === 0)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        const filteredProducts = AllCoursesList.filter((item) => {
            return (
                item.title.toLowerCase().includes(e.target.value.toLowerCase()) && (selectedCategory === "All" ? true : item.Category === selectedCategory)
            );
        });
        setList(filteredProducts)
        setIsEmpty(filteredProducts.length === 0)
    }

    console.log("list :", list);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-16 py-7 gap-5">
            <div className="flex flex-col w-auto justify-start items-start space-y-1 border-r-[1px] border-darkg">
                {
                    Category.map((item, index) => {
                        return <span
                            key={index}
                            onClick={() => handleSelectedCategory(item)}
                            className={`cursor-pointer min-h-10 py-2 ${selectedCategory === item ? "border-b-button font-bold text-button border-b-2" : "text-black"}`}>
                            {item}
                        </span>
                    })
                }
            </div>
            <div className="flex flex-col space-y-5 col-span-2 w-full items-center ">
                <input
                    type="search"
                    onChange={handleFilterChange}
                    value={filter}
                    placeholder="Search for course..."
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-elements transition-colors duration-300"
                />
                <div className="w-full grid col-span-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
                    {
                        loading ?
                            <>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                                <CourseLoading></CourseLoading>
                            </>
                            :
                            <>
                                {list.length > 0 ? (
                                    list.map((course, index) => (
                                        <Course key={index} course={course}></Course>
                                    ))
                                ) : (
                                    <div className="w-full text-center text-gray-500 col-span-3">No courses found</div>
                                )}
                            </>
                    }
                </div>
                {
                    isEmpty && !loading ?
                        <img
                            alt="empty"
                            src="/no-data.png"
                            className="w-72 h-72 flex justify-center items-center object-cover"
                        />
                        :
                        null
                }
            </div>
            <Footer></Footer>
        </div>
    )
};

export default CoursesSearch;
