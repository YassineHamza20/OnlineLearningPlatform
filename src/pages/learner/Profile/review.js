import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

const ReviewForm = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [learnerId, setLearnerId] = useState(null);
  const location = useLocation();
  const tutor_uuid = location.pathname.split('/').pop();

  useEffect(() => {
    const getLearnerIdFromToken = () => {
      const token = localStorage.getItem('accesstoken');
      if (!token) {
        console.error('Access token not found');
        setLearnerId(null);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        setLearnerId(decoded.id);
      } catch (error) {
        console.error('Invalid token:', error);
        setLearnerId(null);
      }
    };

    getLearnerIdFromToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!learnerId) {
      setMessage('Invalid learner ID.');
      return;
    }

    const reviewData = {
      learner_id: learnerId,
      tutor_uuid,
      review,
    };

    console.log('Submitting review data:', reviewData);

    try {
      const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/learner/review', reviewData);
      setMessage(response.data.message);
      setReview('');
      onReviewSubmitted(); // Call the callback function
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage(error.response?.data?.message || 'Error submitting review.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit a Professor Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Only one review is allowed</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              colorScheme="orange"
              className="w-full py-2 px-4 bg-orange-400 text-white rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </Button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReviewForm;
