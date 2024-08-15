import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { FaStar } from "react-icons/fa";
import './style.css'; // Correctly import your CSS file

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const accessToken = localStorage.getItem('accesstoken');
        if (!accessToken) {
          throw new Error('No access token found');
        }
console.log(accessToken)
        const decodedToken = jwtDecode(accessToken);
        const tutor_uuid = decodedToken.uuid;

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/learner/review/${tutor_uuid}`);
        setReviews(response.data);
      } catch (error) {
        setError('Error fetching reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="review-container">
      <h5 className="review-heading">
        <FaStar className="star-icon" />
        Your Reviews
      </h5>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="learner-info">
              <img 
                src={review.pic} 
                alt={`${review.learner_name} ${review.learner_lastname}`} 
              />
              <div>
                <p className="name">{review.learner_name} {review.learner_lastname}</p>
                <p className="date">{new Date(review.created_at).toLocaleString('en-US', { month: 'long', year: 'numeric' })}. {review.country}</p>
              </div>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewReviews;
