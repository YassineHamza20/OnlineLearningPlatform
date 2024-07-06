import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInterceptor";

function DeleteTutor(props) {
    const [tutors, setTutors] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/tutors`)
                setTutors(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])


    const handleDelete = async (tutor) => {
        console.log("tutorId: ", tutor.id);
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/DeleteTutor`, {
                userId: tutor.id
            })
            console.log(response);
            const filteredArray = tutors.filter((item) => item.id !== tutor.id)
            setTutors(filteredArray)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
        <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Delete tutors</h3>
        </div>
        </div>
        <div className="block w-full bg-white max-h-80 overflow-x-auto shadow-lg rounded-lg" style={{ scrollbarWidth: 'none',}}>
        <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
                {/* <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">ID</th> */}
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Tutor</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Email</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Verified</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Notes / Unavailable times  </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">About me</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Teaching style & Description</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Joined at</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
            </tr>
            </thead>
            <tbody>
                {
                    tutors.map((tutor, index) => {
                        return <tr key={index} className="text-gray-700 dark:text-gray-100">
                                {/* <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{tutor.uuid}</th> */}
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{tutor.firstname+ " "+tutor.lastname}</th>
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{tutor.email}</th>
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{tutor.isVerified}</th>
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 max-w-36 overflow-ellipsis truncate text-left">{tutor.description}</th>
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 max-w-36 overflow-ellipsis truncate text-left">{tutor.AboutMe}</th>
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 max-w-36 overflow-ellipsis truncate text-left">{tutor.TeachingStyle}</th>
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 max-w-36 overflow-ellipsis truncate text-left">{new Date(tutor.created_at).toLocaleString()}</th>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <button onClick={() => handleDelete(tutor)} className="flex justify-center w-full text-white rounded-lg px-4 py-2 bg-errortext items-center">
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

export default DeleteTutor;