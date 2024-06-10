import { useEffect, useState } from "react";
import axiosInstance from '../../interceptors/axiosInterceptor'

function InformationalCards(props) {
    const [learnerCount, setLearnerCount] = useState(null)
    const [tutorCount, setTutorCount] = useState(null)
    const [totalSubscriptionCost, setTotalSubscriptionCost ] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/Dashboard`)
                console.log(response.data);
                setLearnerCount(response.data[0].learner_count)
                setTutorCount(response.data[0].tutor_count)
                setTotalSubscriptionCost(response.data[0].total_subscription_cost)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <div className="bg-elements dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-green-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-elements dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                </div>
                <div className="text-right">
                    <p className="text-2xl">{learnerCount + tutorCount}</p>
                    <p>Users</p>
                </div>
            </div>
            <div className="bg-elements dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-green-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-elements dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v5.5M12 19.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"/>
                    </svg>
                </div>
                <div className="text-right">
                    <p className="text-2xl">{learnerCount}</p>
                    <p>Learners</p>
                </div>
            </div>
            <div className="bg-elements dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-green-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-elements dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v5.5M12 19.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v5.5M12 19.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12.5L16 14M16 14l-4 1.5M16 14V10.5M4.5 12.5L8 14M8 14l4-1.5M8 14v3.5"/>
                    </svg>
                </div>
                <div className="text-right">
                    <p className="text-2xl">{tutorCount}</p>
                    <p>Tutors</p>
                </div>
            </div>
            <div className="bg-elements dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-green-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-elements dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div className="text-right">
                    <p className="text-2xl">{totalSubscriptionCost} TND</p>
                    <p>Balances</p>
                </div>
            </div>
        </div>


    );
}

export default InformationalCards;