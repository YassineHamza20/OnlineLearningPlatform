import { useEffect, useState } from "react"
import axiosInstance from "../../interceptors/axiosInterceptor"
import {setListOfCourses} from '../../state/slices/CourseSlice'
import CourseCard from "./CourseCard"
import {useDispatch, useSelector} from 'react-redux'
import { CourseLoading} from "../Global/LoadingCards"

function MyCourses(props) {
    const [loading, setLoading] = useState(false)
    const myCoursesList = useSelector(state => state.courseData.listOfCourses)
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/getMyCourses`)
                console.log("myCourses: ", response.data);
                if(response.data.result.length ===0) {
                    setIsEmpty(true)
                }else {
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
        if(myCoursesList.length ===0 ){
            setIsEmpty(true)
        }else {
            setIsEmpty(false)
        }
    }, [myCoursesList])
    return (
        <div className="rounded-2xl px-6 py-5 h-auto flex-col flex justify-center shadow space-y-5 items-center bg-white">
             <div className="font-bold text-lg w-full text-left">
                My Published Courses
            </div >
            <div className="w-full grid place-items-center xl:grid-cols-4 md:grid-cols-3 m-auto grid-cols-1 gap-4 items-center">
                {
                        loading? 
                        <>
                            <CourseLoading></CourseLoading>
                            <CourseLoading></CourseLoading>
                            <CourseLoading></CourseLoading>
                        </>
                        :
                        (!isEmpty?
                            myCoursesList.map((course, index) => {
                                return <>
                                    <CourseCard key={index} course={course}></CourseCard>
                                </> 
                            })
                            :
                            null
                        )
                }
            </div>
            
            {
                isEmpty?
                    <img 
                    alt="empty" 
                    src="/no-data.png" 
                    className="w-72 h-72 flex justify-center items-center object-cover"></img>
                :
                null
            }
        </div>
    );
}

export default MyCourses;