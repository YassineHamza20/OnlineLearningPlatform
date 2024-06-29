import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setFirstLessonList } from '../../state/slices/lessonsList';
import GenerateCalendarGrid from './GenerateCalendarGrid';
import axiosInstance from '../../interceptors/axiosInterceptor';
import { useLocation } from 'react-router-dom';
import Footer from '../Global/Footer';

function BigCalendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [slideDirection, setSlideDirection] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const calendarGridRef = useRef(null);

    const path = window.location.pathname;
    const segments = path.split('/');
    const firstSegment = segments[1];

    useEffect(() => {
        if (slideDirection) {
            calendarGridRef.current.classList.add(`slide-${slideDirection}`);
            const handleAnimationEnd = () => {
                calendarGridRef.current.classList.remove(`slide-${slideDirection}`);
                setSlideDirection(null);
            };
            calendarGridRef.current.addEventListener('animationend', handleAnimationEnd);
            return () => {
                calendarGridRef.current.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [slideDirection]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
        setSlideDirection("right");
    };

    const nextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
        setSlideDirection("left");
    };

    const actualDay = () => {
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth());
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.post(`https://onlinelearningplatform-d9w2.onrender.com/${firstSegment}/getFirstLesson`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            console.log('API Response:', response.data.message);
            dispatch(setFirstLessonList(response.data.message));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, firstSegment]);

    return (
        <div className={`bg-backg overflow-y-auto ${location.pathname.startsWith('/learner/profile/Tutor/') ? "p-3 h-full" : "py-4 px-4 lg:px-36 h-[90%] "} overflow-x-hidden rounded-lg shadow-lg`}>
            <div className="calendar-header relative w-full flex items-center lg:justify-center mb-4">
                <div className="flex items-center space-x-7 lg:space-x-36">
                    <IoIosArrowDropleftCircle size="25" className="text-button hover:text-orange-600 cursor-pointer" onClick={prevMonth}></IoIosArrowDropleftCircle>
                    <span className="text-2xl font-bold">{`${months[month]} ${year}`}</span>
                    <IoIosArrowDroprightCircle size="25" className="text-button hover:text-orange-600 cursor-pointer" onClick={nextMonth}></IoIosArrowDroprightCircle>
                </div>
                <button onClick={actualDay} className="absolute right-4 cursor-pointer px-4 py-2 bg-lightbutton hover:bg-orange-600 hover:text-white hover:border-none border rounded-lg text-button border-button">Today</button>
            </div>
            <div ref={calendarGridRef} className={`calendar-grid grid grid-cols-7 gap-2`}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">{day}</div>
                ))}
                <GenerateCalendarGrid month={month} year={year}></GenerateCalendarGrid>
            </div>
            {["/learner/profile/Calendar", "/tutor/profile/Calendar"].includes(path) && <Footer />}
        </div>
    );
}

export default BigCalendar;
