import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInterceptor";

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/getAllFeedback`);
            setFeedbacks(response.data.feedback);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };

    const toggleFeedback = async (feedbackId, currentState) => {
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/admin/updatefeedback`, { feedbackId });
            console.log(response.data.message);
            fetchFeedback();  // Re-fetch feedback to update the list
        } catch (error) {
            console.error("Error toggling feedback state:", error);
        }
    };

    return (
        <div className="mt-4 mx-4">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="flex flex-wrap items-center px-4 py-2">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Review List</h3>
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Full Name</th>
                                <th className="px-4 py-3">Feedback</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        <table className="w-full">
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {feedbacks.map((feedback) => (
                                    <tr key={feedback.feedback_id} className="text-gray-700 dark:text-gray-400">
                                        <td className="px-6 py-3 text-sm">
                                            <div className="flex space-x-2">
                                                <span>{feedback.firstname}</span>
                                                <span>{feedback.lastname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{feedback.feedback_text}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {feedback.feedback_state === 0 ? (
                                                <button onClick={() => toggleFeedback(feedback.feedback_id, feedback.feedback_state)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                                                    Post
                                                </button>
                                            ) : (
                                                <button onClick={() => toggleFeedback(feedback.feedback_id, feedback.feedback_state)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                                    Unpost
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedbackList;
