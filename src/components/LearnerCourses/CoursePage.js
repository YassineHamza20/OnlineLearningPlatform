import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { IoIosArrowBack } from "react-icons/io";
import CourseMaker from "./courseMaker";
import { fetchFile } from "../Global/functions";
import ReactLoading from 'react-loading';
import { useSelector } from "react-redux";

function CoursePage(props) {
    //getting the uuid from the url
    const param = useParams()
    const [loading, setLoading] = useState(false)
    const [courseInfo, setCourseInfo] = useState([]) 
    const learnerData = useSelector(state => state.userData)



    useEffect (() => {
        const fetchCourseData = async () => {
            try {
                const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/learner/getCourseInfo', {
                    courseUuid: param.uuid
                })
                console.log("CourseData", response.data.result);
                setCourseInfo(response.data.result)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseData()
    }, [])


    const handleDownload= () => {
        const fetchData = async () => {
            try {
                
                setLoading(true)
                const response = await fetchFile(courseInfo.Course, "courses", "tutor", courseInfo.tutorId)
                const byteCharacters = atob(response.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                // Create a Blob from the byteArray
                const blob = new Blob([byteArray], { type: 'application/pdf' });

                // Create a link element and trigger the download
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute('download', `${courseInfo.title}.pdf`); // Set the file name
                document.body.appendChild(link);
                link.click();

                // Clean up
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
                setLoading(false)
            } catch (error) {   
                console.log(error)
                setLoading(false)
            }
        }

        fetchData()
    }
     
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-[90%] overflow-y-auto px-2 sm:px-15 lg:px-28 py-7 gap-5">
            <div key="leftpart" className="flex flex-col col-span-1 h-auto space-y-5">
                <NavLink
                to="/learner/profile/Courses"
                className="text-button flex items-center space-x-1">
                    <IoIosArrowBack className="25"></IoIosArrowBack>
                    <span>All Courses</span>
                </NavLink>
                <div className="w-80 flex space-y-2 flex-col rounded-3xl bg-white">
                    <img
                    className="w-full rounded-t-3xl object-cover h-64"
                    src={`/coursecovers/${courseInfo.courseCover}`}
                    ></img>
                    <div className="px-4 pb-5 flex-col space-y-5">
                        <span className="font-bold text-xl">
                            {courseInfo.title}
                        </span>
                        {
                            loading?
                            <div className="flex items-center justify-center">
                                <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                            </div>
                            :
                            (
                                learnerData.subscribed || courseInfo.Type==="Free" ?
                                <button onClick={handleDownload} className="w-full rounded-lg hover:bg-green-900 bg-elements px-4 py-2 text-white">
                                    Download
                                </button>
                                :
                                null
                            )

                        }
                    </div>
                </div>
                <span className="font-bold text-lg">
                    Tutor who teachs this course
                </span>
                <CourseMaker info={courseInfo}></CourseMaker>
            </div>
            <div key="rightpart" className="flex flex-col col-span-1 xl:col-span-2 h-auto space-y-5">
                <span className="text-xl">
                    Overview
                </span>
                <div className="flex flex-col space-y-2"> 
                    <span>
                        Description
                    </span>
                    <span className="text-darkg">
                        {courseInfo.description}
                    </span>
                </div>
                <div className="flex flex-col space-y-2"> 
                    <span>
                        Category
                    </span>
                    <span className="text-darkg">
                        {courseInfo.Category}
                    </span>
                </div>
                <div className="flex flex-col space-y-2 "> 
                    <span>
                        Language
                    </span>
                    <span className="text-darkg">
                        {courseInfo.Language}
                    </span>
                </div>
                <div className="flex flex-col space-y-2"> 
                    <span>
                        Level
                    </span>
                    <span className="text-darkg">
                        {courseInfo.Level}
                    </span>
                </div>
                <div className="flex flex-col space-y-2"> 
                    <span>
                        Type
                    </span>
                    <span className="text-darkg">
                        {courseInfo.Type}
                    </span>
                </div>
                <div className="flex flex-col space-y-2"> 
                    <span>
                        Number of pages
                    </span>
                    <span className="text-darkg">
                        {courseInfo.numberOfPages}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CoursePage;