import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { useToast } from '@chakra-ui/react';
import Footer from "../../../components/Global/Footer";
import NavBar from "../../../components/learner profile/NavBar";

const FeedbackForm = () => {
  const [learnerId, setLearnerId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const toast = useToast();

  useEffect(() => {
    // Function to decode the token and set the learnerId
    const decodeToken = () => {
      const token = localStorage.getItem('accesstoken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setLearnerId(decodedToken.id); // Assuming the token has an 'id' field for learnerId
      }
    };

    decodeToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/learner/feedback', {
        learnerId,
        feedbackText,
      });
      toast({
        title: "Feedback submitted. Please wait for the admin to post it.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFeedbackText('');
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response ? error.response.data.message : "Unable to submit feedback.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10">
        <NavBar />
      </div>
      <div className="pt-40 flex flex-col justify-between items-center min-h-screen bg-gray-50 py-12">
        <div className="w-full max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
          <h1 className="text-4xl text-center font-extrabold text-orange-700 mb-6">Submit A Review</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <textarea
                  id="feedbackText"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows="6"
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
                  placeholder="Enter your Review here"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-5 bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
         
      </div>
    </>
  );
};

export default FeedbackForm;
