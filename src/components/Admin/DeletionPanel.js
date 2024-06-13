import { useEffect, useState } from "react";
import axios from "axios"
import {fetchFile} from '../Global/functions'
import axiosInstance from "../../interceptors/axiosInterceptor";

function DeletionPanel(props) {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchData= async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/learner/getAllCourses`)
                setCourses(response.data.result)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const deleteCourse = async (course) => {
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/DeleteCourse`, {
                courseId: course.id
            })
            const filteredArray = courses.filter((item) => item.id !== course.id)
            setCourses(filteredArray)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDownload= (course) => {
        const fetchData = async () => {
            try {
                
                const response = await fetchFile(course.Course, "courses", "tutor", course.tutorId)
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
                link.setAttribute('download', `${course.title}.pdf`); // Set the file name
                document.body.appendChild(link);
                link.click();

                // Clean up
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {   
                console.log(error)
            }
        }

        fetchData()
    }

    

    return (
        <div className="rounded-t mb-0 px-0 border-0">
            <div className="flex flex-wrap items-center px-4 py-2">
            <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Delete Courses</h3>
            </div>
            </div>
            <div className="block max-h-80 bg-white w-full overflow-x-auto shadow-lg rounded-lg"  style={{ scrollbarWidth: 'none',}}>
            <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr>
                    {/* <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Id</th> */}
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Creator</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">title</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Category</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Language</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Level</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Type</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Course</th>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                </tr>
                </thead>
                <tbody>
                    {
                        courses.map((course, index) => {
                            return <tr key={index} className="text-gray-700 dark:text-gray-100">
                                    {/* <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{course.uuid}</th> */}
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{course.firstname + " "+course.lastname}</td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{course.title}</td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{course.Category}</td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{course.Language}</td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{course.Level}</td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{course.Type}</td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <button onClick={() => handleDownload(course)} className="flex justify-center w-full text-white rounded-lg px-4 py-2 bg-elements items-center">
                                            Download
                                        </button>
                                    </td>
                                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <button onClick={()=> deleteCourse(course)} className="flex justify-center w-full text-white rounded-lg px-4 py-2 bg-errortext items-center">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default DeletionPanel;