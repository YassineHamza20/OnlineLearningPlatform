import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Popup from './Popup'; // Import the Popup component
import { useDisclosure } from '@chakra-ui/react';

const PaymentSuccessComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [popupMessage, setPopupMessage] = useState('');

    // Extract query params
    const queryParams = new URLSearchParams(location.search);
    const learnerId = queryParams.get('learnerId');
    const subId = queryParams.get('subId');
    const paymentId = queryParams.get('payment_id');
    const duration = queryParams.get('duration'); // Added duration param

    useEffect(() => {
        if (learnerId && subId && paymentId && duration) { // Added duration to the condition
            // Log the payment success details for debugging
            console.log(`Payment success for learnerId: ${learnerId}, subId: ${subId}, paymentId: ${paymentId}, duration: ${duration}`);

            // Make the API call to update the backend
            axios.get('/learner/payment_success', {
                params: {
                    learnerId,
                    subId,
                    payment_id: paymentId,
                    duration // Pass duration as a parameter
                }
            })
            .then(response => {
                console.log('Payment success response:', response.data);
                // Show the popup
                setPopupMessage('Your payment has been successfully processed!');
                onOpen();
                // Redirect to learner profile after a delay
                setTimeout(() => {
                    onClose();
                    navigate('/learner/profile/Settings/subscription'); 
                }, 3000); // Adjust the delay as needed
            })
            .catch(error => {
                console.error('Error during payment success handling:', error);
                // Handle error, maybe navigate to an error page or show a message
            });
        }
    }, [navigate, learnerId, subId, paymentId, duration, onOpen, onClose]); // Added duration to dependencies array

    return (
        <>
            <Popup message={popupMessage} isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default PaymentSuccessComponent;
