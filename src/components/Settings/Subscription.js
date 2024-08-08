import { useEffect, useState } from "react";
import Title from "./Title";
import axiosInstance from "../../interceptors/axiosInterceptor";

function Subscription(props) {
    const [subHistory, setSubHistory] = useState([]);

    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/learner/SubHistory`);
                setSubHistory(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title="Subscription"></Title>
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-lightg text-black">
                                <th className="py-2 px-4 border-b text-left">Subscription ID</th>
                                <th className="py-2 px-4 border-b text-left">Cost</th>
                                <th className="py-2 px-4 border-b text-left">Payment Date</th>
                                <th className="py-2 px-4 border-b text-left">Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subHistory.map((payment) => (
                                <tr key={payment.SubId} className="hover:bg-gray-100 transition-colors duration-200">
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.SubId}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{payment.cost / 1000} DT</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        📅 {formatDate(payment.PayementDate)}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        📅 {formatDate(payment.ExpirationDate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
