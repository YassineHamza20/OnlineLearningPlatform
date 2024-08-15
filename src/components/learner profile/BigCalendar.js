import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useDispatch} from 'react-redux';
import { setFirstLessonList } from '../../state/slices/lessonsList';
import GenerateCalendarGrid from './GenerateCalendarGrid';
import axiosInstance from '../../interceptors/axiosInterceptor'
import { useLocation } from 'react-router-dom';
import Footer from '../Global/Footer';


function BigCalendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [slideDirection, setSlideDirection] = useState(null)
    const location = useLocation();

    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 
    

    const dispatch = useDispatch()

    const calendarGridRef = useRef(null);

    //handling the animation when sliding 
    useEffect(() => {
        if (slideDirection) {
            // Add animation class based on the slide direction
            calendarGridRef.current.classList.add(`slide-${slideDirection}`);
            // Remove animation class after animation ends
            const handleAnimationEnd = () => {
                calendarGridRef.current.classList.remove(`slide-${slideDirection}`);
                setSlideDirection(null);
            };
            calendarGridRef.current.addEventListener('animationend', handleAnimationEnd);
            // Clean up event listener
            return () => {
                calendarGridRef.current.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [slideDirection]);


    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    

    //control the next button
    const prevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11); // December
        } else {
            setMonth(month - 1);
        }
        setSlideDirection("right");
    };

    //contorl the next button
    const nextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0); // January
        } else {
            setMonth(month + 1);
        }
        setSlideDirection("left");
    };

    //button to get back to actual date
    const actualDay =() => {
        setYear(new Date().getFullYear())
        setMonth(new Date().getMonth())
    }

    //getting the first lesson in every day
    const fetchData = async () => {
        try {
           const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_URL}/${firstSegment}/getFirstLesson`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
            }
        })
        console.log('API Response:', response.data.message);
        dispatch(setFirstLessonList(response.data.message))
        }catch(err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])
    


    return (
        <div className={`bg-backg overflow-y-auto ${location.pathname.startsWith('/learner/profile/Tutor/')? "p-3 h-full" : "py-4 px-4 lg:px-36 h-[90%] "} overflow-x-hidden rounded-lg shadow-lg`}>
            <div className="calendar-header relative w-full flex items-center lg:justify-center mb-4">
                <div className="flex items-center space-x-7 lg:space-x-36">
                    <IoIosArrowDropleftCircle size="25" className="text-button hover:text-orange-600 cursor-pointer" onClick={prevMonth}></IoIosArrowDropleftCircle>
                    <span className="text-2xl font-bold">{`${months[month]} ${year}`}</span>
                    <IoIosArrowDroprightCircle size="25" className="text-button hover:text-orange-600 cursor-pointer" onClick={nextMonth}></IoIosArrowDroprightCircle>
                </div>
                <button onClick={actualDay} className="absolute right-4 cursor-pointer px-4 py-2 bg-lightbutton hover:bg-orange-600 hover:text-white hover:border-none border rounded-lg text-button border-button">Today</button>
            </div>
            <div ref={calendarGridRef} className={`calendar-grid grid grid-cols-7 gap-2`}>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Sun</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Mon</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Tue</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Wed</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Thu</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Fri</div>
                <div className="rounded-lg bg-lightg py-2 text-center text-black font-bold ">Sat</div>
                <GenerateCalendarGrid month={month} year={year}></GenerateCalendarGrid>
            </div>
            {
                path ==="/learner/profile/Calendar" || path === "/tutor/profile/Calendar"?
                <Footer></Footer>
                :
                null
            }
        </div>
    );
}

export default BigCalendar;
