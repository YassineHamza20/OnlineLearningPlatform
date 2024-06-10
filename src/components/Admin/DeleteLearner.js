import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInterceptor";


function DeleteLearner(props) {
    const [learners, setLearners] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/learners`)
                setLearners(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const deleteLearner = async (learner) => {
        console.log("learnerId: ", learner.id);
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/DeleteAccount`, {
                userId: learner.id
            })
            console.log(response);
            const filteredArray = learners.filter((item) => item.id !== learner.id)
            setLearners(filteredArray)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
        <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Delete learner</h3>
        </div>
        </div>
        <div className="block bg-white w-full max-h-80 overflow-x-auto shadow-lg rounded-lg" style={{ scrollbarWidth: 'none',}}>
        <table className="items-center w-full bg-transparent border-collapse" >
            <thead>
            <tr>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">ID</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Learner</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Email</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Country</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Verified</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Premium</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">Joined at</th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
            </tr>
            </thead>
            <tbody>
            {
                learners.map((learner, index) => {
                    return <tr key={index} className="text-gray-700 dark:text-gray-100">
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{learner.uuid}</th>
                    <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{learner.firstname+ " "+ learner.lastname}</th>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{learner.email}</td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{learner.country}</td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{learner.isVerified}</td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{learner.subscription_status}</td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{new Date(learner.created_at).toLocaleString()}</td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button onClick={() =>deleteLearner(learner)} className="flex justify-center w-full text-white rounded-lg px-4 py-2 bg-errortext items-center">
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

export default DeleteLearner;