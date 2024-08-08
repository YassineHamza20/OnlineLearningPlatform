// import axios from "axios";
// import { useEffect, useRef, useState} from "react";
// import { useSelector } from "react-redux";
// import ReactLoading from 'react-loading';


// function SubscriptionPlan(props) {
//     const modalRef = useRef(null)
//     const learnerData = useSelector(state => state.userData)
//     const [loading, setLoading] = useState(false)

//      //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
//      const handleOutsideClick = (event) => {
//         if (modalRef.current && !modalRef.current.contains(event.target)) {
//            props.setVisibility(false)
//         }
//       };

//     //control the visibility of the modal
//     useEffect(() => {
//         document.addEventListener('mousedown', handleOutsideClick);
    
//         // Cleanup the event listener when the component unmounts
//         return () => {
//           document.removeEventListener('mousedown', handleOutsideClick);
//         };
//       }, []);

//     const handleSubscribe = async () => {
//         try {
//             setLoading(true)
//             const response = await axios.post('https://sandbox.paymee.tn/api/v2/payments/create', {
//                 amount: process.env.REACT_APP_AMOUNT,
//                 note: "Linguify Subscription payment",
//                 first_name: learnerData.firstname,
//                 last_name: learnerData.lastname,
//                 email: learnerData.email,
//                 phone: learnerData.tel,
//                 return_url: `${process.env.REACT_APP_FRONTSERVER_URL}/learner/profile`,
//                 cancel_url: `${process.env.REACT_APP_FRONTSERVER_URL}/learner/profile`,
//                 webhook_url: `${process.env.REACT_APP_TUNNELED_SERVER_ADDRESS}/learner/payment`,
//                 order_id: learnerData.uuid
//             }, {
//                 headers: {
//                     'Authorization': `Token ${process.env.REACT_APP_SECRETPAYMEE}`
//                 }
//             })
//             console.log(response.data);
//             setLoading(false)
//             if (response.data && response.data.data.payment_url) {
//                 window.location.href = response.data.data.payment_url;
//             } else {
//                 console.error('Payment URL not found in the response');
//             }
//         } catch (error) {
//             console.error(error);
//             setLoading(false)
//         }
//     }

//     console.log("Paymeee", process.env.REACT_APP_SECRETPAYMEE);

//     return (
//         <>
//             {
//                 props.visibility?
//                 <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
//                     <div ref={modalRef} className={`bg-backg w-[90%] md:w-[50%] lg:w-[35%] xl:w-[35%] max-h-[80%] min-h-[50%] flex flex-col justify-between rounded-md `} >
//                         <div className="bg-[#f7f7f7] rounded-lg p-6">
//                             <div className="flex items-center mb-4">
//                             <img src="/logo.png" alt="Silver Logo" className="w-16 h-16 rounded-full bg-gray-300 mr-4" />
//                             <img src="/gold.png" alt=" Silver Image" className="w-17  h-12 mr-4" />
//                             </div>
//                             <p className="text-base text-gray-600 mb-6">Full access to all of Linguify</p>
//                             <ul className="list-none pl-0 mb-6">
//                             <li className="mb-2 flex items-center">
//                                 <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
//                                 <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
//                                 </svg>
//                                 Our most comprehensive experience.
//                             </li>
//                             <li className="mb-2 flex items-center">
//                                 <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
//                                 <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
//                                 </svg>
//                                 Schedule 1-1 lessons with tutors.
//                             </li>
//                             <li className="mb-2 flex items-center">
//                                 <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
//                                 <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
//                                 </svg>
//                                 Chat with tutors.
//                             </li>
//                             <li className="mb-2 flex items-center">
//                                 <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
//                                 <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
//                                 </svg>
//                                 Get Access to video call lessons.
//                             </li>
//                             <li className="mb-2 flex items-center">
//                                 <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
//                                 <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
//                                 </svg>
//                                 Get access to premium courses.
//                             </li>
//                             </ul>
//                         </div>
//                         <div className="bg-[#f0f0f0] rounded-b-lg p-6 border-t border-gray-300 flex justify-between items-center">
//                             <p className="text-sm text-gray-700">
//                                 <span className="font-bold text-lg">50 TND</span>/month
//                             </p>
//                             {
//                                 loading?
//                                 <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
//                                 :
//                                 <button onClick={handleSubscribe} className="bg-elements text-white px-6 py-3 rounded-full hover:bg-[#6C871B] focus:outline-none">Subscribe</button>
                                
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 :
//                 null
//             }
//         </>
//     );
// }

// export default SubscriptionPlan;


import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import jwtDecode from 'jwt-decode'; // Correct import statement
import { useNavigate } from 'react-router-dom';

function SubscriptionPlan(props) {
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [duration, setDuration] = useState("month"); // Default duration to month
    const navigate = useNavigate();

    // Handle clicking outside of the modal
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.setVisibility(false);
        }
    };

    // Add event listener for outside click
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            setError("");

            // Get the access token from localStorage
            const accessToken = localStorage.getItem('accesstoken');

            if (!accessToken || typeof accessToken !== 'string') {
                throw new Error('Invalid access token');
            }

            // Decode the access token to get the order_id
            const decodedToken = jwtDecode(accessToken);
            const order_id = decodedToken.id; // Adjust this based on the actual structure of your token

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/learner/payment`, {
                order_id: order_id,
                duration: duration // Pass duration to the backend
            });

            console.log(response.data);
            setLoading(false);
            if (response.data && response.data.payment_url) {
                // Navigate to the external payment URL
                window.location.href = response.data.payment_url;
            } else {
                console.error('Payment URL not found in the response');
                setError('Payment URL not found. Please try again later.');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setError('An error occurred while initiating the payment. Please try again.');
            setLoading(false);
        }
    }

    return (
        <>
            {
                props.visibility ?
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                        <div ref={modalRef} className={`bg-backg w-[90%] md:w-[50%] lg:w-[35%] xl:w-[35%] max-h-[80%] min-h-[50%] flex flex-col justify-between rounded-md`}>
                            <div className="bg-[#f7f7f7] rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <img src="/logo.png" alt="Silver Logo" className="w-16 h-16 rounded-full bg-gray-300 mr-4" />
                                    <img src="/gold.png" alt="Silver Image" className="w-17 h-12 mr-4" />
                                </div>
                                <p className="text-base text-gray-600 mb-6">Full access to all of Linguify</p>
                                <ul className="list-none pl-0 mb-6">
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                        Our most comprehensive experience.
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                        Schedule 1-1 lessons with tutors.
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                        Chat with tutors.
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                        Get Access to video call lessons.
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 fill-current text-black" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                        Get access to premium courses.
                                    </li>
                                </ul>
                                <div className="mb-6">
                                    <label htmlFor="duration" className="block text-gray-700">Choose a plan:</label>
                                    <select
                                        id="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="day">7 Day - 30 TND</option>
                                        <option value="month">1 Month - 70 TND</option>
                                        <option value="year">1 Year - 500 TND</option>
                                    </select>
                                </div>
                            </div>
                            <div className="bg-[#f0f0f0] rounded-b-lg p-6 border-t border-gray-300 flex justify-between items-center">
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold text-lg">{duration === 'day' ? '30 TND' : duration === 'month' ? '70 TND' : '500 TND'}</span>
                                    {duration === 'day' ? '/day' : duration === 'month' ? '/month' : '/year'}
                                </p>
                                {loading ? (
                                    <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                                ) : (
                                    <button onClick={handleSubscribe} className="bg-elements text-white px-6 py-3 rounded-full hover:bg-[#6C871B] focus:outline-none">
                                        Subscribe
                                    </button>
                                )}
                                {error && (
                                    <p className="mt-4 text-red-500">{error}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}

export default SubscriptionPlan;
