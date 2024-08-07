// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate=useNavigate()
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const learnerId = params.get('learnerId');
//     const subId = params.get('subId');
//     const payment_id = params.get('payment_id');

//     // Call the backend to verify the payment
//     axios.get(`/payment_success?learnerId=${learnerId}&subId=${subId}&payment_id=${payment_id}`)
//       .then(response => {
//         console.log('Payment verified:', response.data);
//         // Handle successful verification
//         navigate('/learner/profile');
//       })
//       .catch(error => {
//         console.error('Error verifying payment:', error);
//         // Handle verification error
//       });
//   }, [location]);

//   return (
//     <div>
//       <h1>Payment Successful</h1>
//       <p>Your payment was successful. Thank you!</p>
       
//     </div>
//   );
// };

// export default PaymentSuccess;
