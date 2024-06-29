import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../interceptors/axiosInterceptor';

function ScheduleLessonFromTutorProfile() {
    const dispatch = useDispatch();
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axiosInstance.get('/lessons');
                setLessons(response.data);
            } catch (error) {
                console.error('Error fetching lessons', error);
            }
        };

        fetchLessons();
    }, [dispatch]);

    return (
        <div>
            <h1>Schedule Lesson</h1>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.id}>{lesson.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleLessonFromTutorProfile;
