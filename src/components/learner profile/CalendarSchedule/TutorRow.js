
import { useState, useEffect } from "react";
import { convertTime, fetchCountryData} from "../../Global/functions";
import { fetchFile } from "../../Global/functions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTutor } from "../../../state/slices/Schedule";
import { Addlesson, addLessontoCurrentDayLessons, appendLesson, replaceFirstLessonItem } from "../../../state/slices/lessonsList"
import { resetData, setVisibility } from "../../../state/slices/Schedule"
import axiosInstance from "../../../interceptors/axiosInterceptor"
import io from 'socket.io-client'
import { useRef } from "react";
import { addNotification, incrementUnreadNotifications } from "../../../state/slices/NotificationSlice";
import { useLocation } from 'react-router-dom';
import { FaCalendarPlus } from "react-icons/fa6"
import { MdNavigateNext } from "react-icons/md"


function TutorRow(props) {
    const dispatch = useDispatch()
    const socket = useRef(null)
    
    const learnerData= useSelector(state => state.userData)

    const lessonList = useSelector(state => state.lessonsList.firstlessonList)

    const scheduleData = useSelector(state => state.scheduleData)

    const selectedTutorData = useSelector(state => state.userData.selectedTutor)
    
    const location = useLocation()

    //tutor profile picture
    const [imageData, setImageData] = useState()

    //flag image of the tutor's country
    const [countryData, setCountryData] = useState(null);

    //fetching tutor profile picture from backend when booking from general calendar
    async function fetchData () {
        if(!location.pathname.startsWith('/learner/profile/Tutor/')) {
            if(props.tutor.pfp && props.tutor.id ){
                fetchFile(props.tutor.pfp, "images", "Tutor", props.tutor.id)
                .then(response => {
                    setImageData(response)
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
    }

    //get country flag when booking from general calendar
    const fetchFlag = async () => {
    if(!location.pathname.startsWith('/learner/profile/Tutor/')) {
        const data = await fetchCountryData(props.tutor.Country);
        setCountryData(data)
    }
    }

    useEffect(() => {
        //when booking from general calendar
        //getting tutor picture
        fetchData()
        //getting the flag of the tutor's country 
        fetchFlag()
    }, [props.tutor])

    
    const handleBookLesson = async () => {
            dispatch(setSelectedTutor(location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.id: props.tutor.id))

            const {formattedHours, formattedMinutes} = convertTime(scheduleData.time)
            
            // Construct the normal time string
            const normalTime = `${formattedHours}:${formattedMinutes}`

            //we contact the api here that's responsible for scheduling lessons then we reset the fields after finish the transaction
            try {
                const selectedDate = scheduleData.selectedDate + " "+ normalTime
                const sentData =  {
                    tutorId: location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.id: props.tutor.id,
                    lessonTopic: scheduleData.lessonTopic,
                    lessonDifficulty: scheduleData.lessonDifficulty,
                    selectedDate: selectedDate,
                    lessonLength: scheduleData.lessonLength,
                    lessonLanguage: scheduleData.language
                }
                const response = await axiosInstance.post('http://localhost:5000/learner/scheduleLesson', sentData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })

                dispatch(incrementUnreadNotifications())
                
                //current Date
                const currentDate = new Date();
                const currentDateTimeString = currentDate.toISOString()

                const data = {
                    lesson_id: response.data.lesson_id,
                    tutor_id: location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.id: props.tutor.id,
                    start_time: response.data.start_time,
                    end_time: response.data.end_time,
                    lesson_topic: scheduleData.lessonTopic,
                    lesson_difficulty: scheduleData.lessonDifficulty,
                    duration: scheduleData.lessonLength,
                    Accepted: -1,
                    language: scheduleData.language,
                    pfp: learnerData.pic,
                    firstname: learnerData.firstname,
                    lastname: learnerData.lastname,
                    scheduling_date: currentDateTimeString,
                    private_learner_id: learnerData.id,
                    ReadByTutor: 0,
                    ReadByLearner: 0

                }

                const currentDayLessonsData = {
                    lesson_id: response.data.lesson_id,
                    tutor_id: location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.id: props.tutor.id,
                    start_time: response.data.start_time,
                    end_time: response.data.end_time,
                    lesson_topic: scheduleData.lessonTopic,
                    lesson_difficulty: scheduleData.lessonDifficulty,
                    duration: scheduleData.lessonLength,
                    Accepted: -1,
                    language: scheduleData.language,
                    pfp: location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.pfp: props.tutor.pfp,
                    firstname: location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.firstname: props.tutor.firstname,
                    lastname: location.pathname.startsWith('/learner/profile/Tutor/')? selectedTutorData.lastname: props.tutor.lastname,
                    scheduling_date: currentDateTimeString,
                    private_learner_id: learnerData.id,
                    ReadByTutor: 0,
                    ReadByLearner: 0

                }
                socket.current = io('http://localhost:5000', {
                    auth: {
                    token: localStorage.getItem('accesstoken')
                    }
                })
                console.log("learnerId: ", learnerData.id);
                socket.current.emit('notification', data)

                console.log("socket: ", socket.current);

                dispatch(addNotification(currentDayLessonsData))
 
                

                //we're verifying if the we got a lesson on that date or not
                let test =false
                let index = -5

                for (let i = 0; i < lessonList.length; i++) {
                    const lesson = lessonList[i]
                    const lessonDate = new Date(lesson.start_time)
                    const options = { 
                        day: '2-digit', 
                        month: '2-digit',
                        year: 'numeric'
                    };

                

                    const formattedDate = lessonDate.toLocaleDateString('en-US', options)
                    if (formattedDate === scheduleData.selectedDate){


                        // console.log("lessonDate:", lessonDate)
                        const hours = lessonDate.getHours().toString().padStart(2, '0')
                        const minutes = lessonDate.getMinutes().toString().padStart(2, '0')
                        /*console.log(hours);
                        console.log("minutes", minutes);
                        console.log("hours eli hatinehom: ", formattedHours, " hours taa existing lesson: ", hours);
                        console.log("hours condition", formattedHours  === hours);
                        console.log("minutes condition: ", formattedMinutes < minutes)*/

                        //compare the hours ken eli jebneh jdid 9bal eli deja mawjoud wa9tha nekhdou el index
                        if(formattedHours < hours  ) {
                            //console.log("formattedHours < hours", formattedHours, " < ", hours  );
                            index = i
                        }else if(formattedHours === hours) {
                            if(formattedMinutes < minutes) {
                                console.log("formattedHours < minutes");
                                index = i 
                            }
                        }

                        test = true
                        break
                    }
                }


                console.log("data: ", data);

                //if there's no lessons in that day we show it in the calendar
                if(!test) {
                    dispatch(appendLesson(currentDayLessonsData))
                }else {
                    if(index >= 0){
                        console.log("replaceFirstLessonItem Worked");
                        dispatch(replaceFirstLessonItem({currentDayLessonsData, index}))
                    }
                }
                //adding it to the list containing all lessons
                dispatch(Addlesson(currentDayLessonsData))

                

                dispatch(addLessontoCurrentDayLessons(currentDayLessonsData))



                dispatch(setVisibility(false))
                dispatch(resetData())
            }catch(err) {
                console.log(err)
            }
    }

    return (
        <>
            {
                location.pathname.startsWith('/learner/profile/Tutor/')? 
                <div onClick={handleBookLesson} className={`flex p-2 ${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'hover:bg-lightg cursor-pointer': ''} rounded-md items-center  space-x-6`}> 
                    <FaCalendarPlus size="25" className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-active' : 'text-disabled'} `}></FaCalendarPlus>
                    <span className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-active' : 'text-disabled'}`}>Book the lesson</span>
                    <div className="flex-grow"></div>
                    <MdNavigateNext size="25" className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-elements' : 'text-disabled'}`}></MdNavigateNext>
                </div>
                :
                    <div onClick={handleBookLesson} className="flex cursor-pointer hover:bg-lightg rounded-md p-2 w-full items-center space-x-2">
                    <img src={imageData} alt="tutorprofilepicture" className=" min-w-20  min-h-20 max-h-20 max-w-20 object-cover rounded-full"></img>
                    <div className="flex truncate flex-col justify-center">
                        <span className="text-black">{props.tutor.firstname && props.tutor.lastname ? props.tutor.firstname + " " + props.tutor.lastname : props.tutor.email}</span>
                        <div className="flex space-x-2 items-center">
                            {countryData && countryData[0]?.flags && (
                                <img className="rounded-lg min-w-4 min-h-4 max-h-4 max-w-4 object-cover" src={countryData[0].flags.png} alt={props.tutor.Country} />
                            )}
                            <span className=" ml-4 text-sm text-darkg">{props.tutor.Country}</span>
                        </div>
                        <span className="text-darkg mt-2 text-sm">{props.tutor.description}</span>
                    </div>
                </div>
            }
        </>

        
    );
}

export default TutorRow;