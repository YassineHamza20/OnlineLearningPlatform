import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../learner profile/Card';
import axiosInstance from '../../interceptors/axiosInterceptor';
import { setFirstLessonList } from '../../state/slices/lessonsList';
import { timeFormatter, handleLessonDifficultyColor } from '../Global/functions';
import { IoMdTime } from "react-icons/io";

function Calendar(props) {
  const dispatch = useDispatch();
  const weekFirstLesson = useSelector(state => state.lessonsList.firstlessonList);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const fetchFirstDayLessons = async () => {
      try {
        const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/tutor/getFirstLesson', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
          }
        });
        console.log('API Response:', response.data.message); // Debug: check the response data
        dispatch(setFirstLessonList(response.data.message));
      } catch (err) {
        console.log(err);
      }
    }
    fetchFirstDayLessons();
  }, [dispatch]);

  // Function to get the dates for the upcoming days of the week
  const getDatesForWeek = () => {
    const today = new Date(); // Get today's date
    const datesForWeek = [];

    // Loop through the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today); // Create a new date object for each day
      date.setDate(today.getDate() + i); // Set the date to the current day + i

      const day = daysOfWeek[date.getDay()]; // Get the day of the week
      const dayOfMonth = date.getDate(); // Get the day of the month

      // Determine the class name for styling based on the current date
      let className = 'text-darkg'; // Default styling for past days
      if (i === 0) className = 'text-button font-bold'; // Highlight today's date
      else if (date < today) className = 'text-darkg'; // Styling for past days

      datesForWeek.push({ day, dayOfMonth, className }); // Push the day, day of the month, and class name to the array
    }

    return datesForWeek;
  };

  const datesForWeek = getDatesForWeek(); // Get the dates for the upcoming week

  // Generate content for the calendar
  const content = [
    <span key="title" className="self-start text-lg font-bold mb-5">
      Here's An Overview Of Your Calendar For The Week  
    </span>,
    <hr key="line1" className="h-1 w-full"></hr>,
    <div key="calendar" className="w-full grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-3 rounded-3xl p-4 border border-1">
      {/* Render days of the week with their number in the month */}
      {weekFirstLesson && datesForWeek.map(({ day, dayOfMonth, className }, index) => {
        const firstLesson = weekFirstLesson.find(lesson => {
          const lessonDate = new Date(lesson.start_time);
          return lessonDate.getDate() === dayOfMonth && lessonDate.getMonth() === today.getMonth() && lessonDate.getFullYear() === today.getFullYear();
        });

        return (
          <div key={index} className="flex flex-col items-center">
            <span className={`rounded-full py-2 px-4 text-center ${className}`}>
              {day}
            </span>
            <span className={className}>{dayOfMonth}</span>
            {firstLesson ? (
              <div className="flex flex-col items-center justify-center space-y-2 bg-cellColor p-[2px] rounded-md min-w-20 max-w-20">
                <div className="font-semibold text-center text-white w-[80%] truncate">
                  {firstLesson.lesson_topic}
                </div>
                <div className={`text-xs p-1 border text-button2 bg-lightButton2 border-button2 rounded-xl`}>
                  {firstLesson.language}
                </div>
                <div className={`text-xs p-1 border ${handleLessonDifficultyColor(firstLesson.lesson_difficulty, 'other')} rounded-xl`}>
                  {firstLesson.lesson_difficulty}
                </div>
                <div className="flex flex-col items-center">
                  <IoMdTime className="text-darkg" size="15"></IoMdTime>
                  <span className="text-darkg text-xs ">
                    {timeFormatter(firstLesson.start_time)}
                  </span>
                  <span className="text-darkg text-xs ">
                    -
                  </span>
                  <span className="text-darkg text-xs ">
                    {timeFormatter(firstLesson.end_time)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="min-h-[169px] min-w-20 bg-lightg p-2 rounded-md">
              </div>
            )}
          </div>
        );
      })}
    </div>
  ];

  return (
    <>
      {weekFirstLesson ? <Card content={content}></Card> : null}
    </>
  );
}

export default Calendar;
