
import { useRef, useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {resetData, setBusyTimes, setSteps, setVisibility} from '../../state/slices/Schedule'
import FirstStep from "./CalendarSchedule/FirstStep"
import SecondStep from "./CalendarSchedule/SecondStep"
import ThirdStep from "./CalendarSchedule/ThridStep"
import { setTutorSearchList } from "../../state/slices/userSlice"
import axiosInstance from "../../interceptors/axiosInterceptor"
import ReactLoading from 'react-loading';
import { dateExistenceTester } from "../Global/functions"
import { useLocation } from 'react-router-dom';



function Schedule(props) {
    const modalRef = useRef(null)
    const scheduleData = useSelector(state => state.scheduleData) 
    const learnerData = useSelector(state => state.userData)
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const selectedTutorData = useSelector(state => state.userData.selectedTutor)

    const dispatch = useDispatch()


    const times = [];

    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            //upon canceling we reset the data 
            dispatch(resetData()) 
            dispatch(setTutorSearchList([]))
            dispatch(setVisibility(false))
        }
    };

    //getting the busy times in a specific day
    const fetchTimes = async () => {
        if(scheduleData.selectedDate) {
            setLoading(true)
            try {
                let response;
                //if we're scheduling from a tutors profile 
                if(location.pathname.startsWith('/learner/profile/Tutor/')){
                    response = await axiosInstance.post('http://localhost:5000/learner/getTutorAndLearnerBusyTimes', {
                        selectedDate: scheduleData.selectedDate,
                        tutorId: selectedTutorData.id
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                        }
                    })
                    console.log("response coming from getTutorAndLearnerBusyTimes");
                }else {
                    //if we're scheduling from general calendar
                    response = await axiosInstance.post('http://localhost:5000/getBusyTimes', {
                        selectedDate: scheduleData.selectedDate
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                        }
                    })
                    console.log("response coming from getBusyTimes");

                }
                dispatch(setBusyTimes(response.data.message))
                setLoading(false)
            }catch(err) {
                console.log("err", err)
            }
            finally{
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchTimes()
    }, [])
    

    //formatting the current date 
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    //formatting the dates to get them in the same format as the busyDates that we're getting from the server
    //format YYYY-MM-DD
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const conditionDate = new Date(props.selectedDate).toLocaleDateString('en-US', options)
    const month = conditionDate.split('/')[0]
    const day = conditionDate.split('/')[1]
    const year = conditionDate.split('/')[2]

    const busyDate = `${year}-${month}-${day}`

    // Check if the selected date is today
    if (formattedDate === props.selectedDate) {


        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const startHour = currentHour + 2; // Start showing times from 2 hours ahead of the current time
        const startMinute = currentMinute < 45 ? 0 : 15; // Start from the next quarter hour

        for (let hour = startHour; hour < 24; hour++) {
            const minuteStart = (hour === startHour) ? startMinute : 0;
            for (let minute = minuteStart; minute < 60; minute += 15) {
                const {test, result } =dateExistenceTester(scheduleData.busyTimes, hour, minute, busyDate)
                if(!test) {
                    times.push(result);
                }
            }
        }
    } else {
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                
                const {test, result} = dateExistenceTester(scheduleData.busyTimes, hour, minute, busyDate)
                if(!test) {
                    times.push(result);
                }
            }
        }
    }


    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

    
    //handling the next button
    const handleNavigateBack = () => {
        if(scheduleData.step > 0) {
            dispatch(setSteps(scheduleData.step-1))
        }
    }

    
    //handling the back button
    const handleNavigateForward = () => {
        if(scheduleData.step < 2) {
            if(scheduleData.step === 0 && scheduleData.time && scheduleData.lessonLength && scheduleData.language){
                dispatch(setSteps(scheduleData.step+1))
            }
            else if( scheduleData.step === 1 && scheduleData.lessonTopic && scheduleData.lessonDifficulty){
                dispatch(setSteps(scheduleData.step+1))
            }
        }
    }
  
    //steps to fill schedule a lesson
    const content = [
        <FirstStep selectedDate={props.selectedDate} times={times} moveForward={handleNavigateForward} moveBackwards={handleNavigateBack}></FirstStep>,
        <SecondStep  selectedDate={props.selectedDate} moveForward= {handleNavigateForward} moveBackwards={handleNavigateBack} ></SecondStep>,
        <ThirdStep selectedDate={props.selectedDate} moveBackwards={handleNavigateBack}></ThirdStep>
    ]

    return (<>
            {
                scheduleData.visibility?
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
                    <div ref={modalRef} className={`${learnerData.tutorSearchList.length>0? 'max-h-[70%]' : ''} bg-backg flex flex-col justify-center max-w-[90%] lg:max-w-[40%] space-y-5 shadow-lg rounded-lg p-6 z-30`}>
                        {
                            loading?
                            <ReactLoading type="spin" color="#FFA447" height={'40px'} width={'40px'} />
                            :
                            content[scheduleData.step]
                        }
                    </div>
                </div>
                :
                null
            }
    </>
    );
}

export default Schedule;

