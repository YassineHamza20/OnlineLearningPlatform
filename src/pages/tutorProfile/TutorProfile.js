import Settings from "../../components/Global/Settings";
import TutorNavBar from "../../components/tutor profile/NavBar";
import LinguaBuddy from "../learner/Profile/LinguaBuddy";
import axiosInstance from '../../interceptors/axiosInterceptor'
import { useEffect} from "react"; 
import { useDispatch, useSelector } from "react-redux"
import Courses from "./Courses";
import Feed from "./Feed";
import { fetchCountryData, isGoogleProfilePicture } from "../../components/Global/functions"
import {
    setFirstName, 
    setLastName, 
    setAboutMe, 
    setBirthday, 
    setCountry, 
    setDescription, 
    setDisplayableImage, 
    setIntroductionVideo, 
    setEducation, 
    setEmail, 
    setHasPassword,
    setTeachingStyle, 
    setTel,
    setLanguages,
    setIsLoading, 
    setWorkExperience,
    setCountryFlag,
    setId,
    setUuid,
    setCreatedAt,
    setIsVerified

} from '../../state/slices/tutorSlice'
import { fetchFile } from "../../components/Global/functions";
import { addNotification, setUnreadNotifications, tutorIncrementNotifications } from "../../state/slices/NotificationSlice"
import io from 'socket.io-client'
import NotificationsPage from './NotificationsPage'
import BigCalendar from "../../components/learner profile/BigCalendar";
import { addLessontoCurrentDayLessons, setCurrentDayLesson, setCurrentDayLessons, setNotificationModalVisibility, setVideoCallModalVisibility } from "../../state/slices/lessonsList";
import LessonReminderModal from "../../components/Global/lessonReminderModal";
import Account from "../../components/Settings/Account"
import Subscription from "../../components/Settings/Subscription"
import ProfileChange from "../../components/Settings/ProfileChange";
import Chat from "../Chat";
import { useLocation } from "react-router-dom";
import { addChatNotification, setNewMessages } from "../../state/slices/chatSlice";

function TutorProfile() {

    const dispatch = useDispatch()

    const tutorData = useSelector(state => state.tutorData)

    const unreadNotifications = useSelector(state => state.notificationsData.unreadNotifs)

    const currentDayLessons = useSelector(state => state.lessonsList.currentDayLessons)

    const notificationModalVisibility = useSelector(state => state.lessonsList.notificationModalVisibility)

     //knowing whether it's a tutor or learner signing up
     const path = window.location.pathname;

     const currentDayLesson = useSelector(state => state.lessonsList.currentDayLesson)

     const videoCallModalVisibility = useSelector(state => state.lessonsList.videoCallModalVisibility)

    
    const location = useLocation();



    
    useEffect(() => {
        //getting tutor details
        const fetchData = async () => {
            dispatch(setIsLoading(true))
            try {
                const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/tutor/details', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                })
                await Promise.all([
                    dispatch(setUuid(response.data.message.uuid)),
                    dispatch(setId(response.data.message.id)),
                    dispatch(setIsVerified(response.data.message.isVerified)),
                    dispatch(setFirstName(response.data.message.firstname)),
                    dispatch(setLastName(response.data.message.lastname)),
                    dispatch(setEmail(response.data.message.email)),
                    dispatch(setHasPassword(response.data.message.hasPassword)),
                    dispatch(setIntroductionVideo(response.data.message.introductionVideo)),
                    dispatch(setAboutMe(response.data.message.AboutMe)),
                    dispatch(setDescription(response.data.message.description)),
                    dispatch(setTeachingStyle(response.data.message.teachingStyle)),
                    dispatch(setEducation(
                        response.data.message.Education?
                        JSON.parse(response.data.message.Education)
                        :
                        []
                    )),
                    dispatch(
                        setLanguages(
                                response.data.message.Languages?
                                JSON.parse(response.data.message.Languages)
                                :
                                []
                            )),
                    dispatch(setWorkExperience(
                        response.data.message.WorkExperience?
                        JSON.parse(response.data.message.WorkExperience)
                        :
                        []
                    )),
                    dispatch(setCountry(response.data.message.country)),
                    dispatch(setTel(response.data.message.tel)),
                    dispatch(setBirthday(response.data.message.Birthday)),
                    dispatch(setCreatedAt(response.data.message.created_at))
                ])
                //if it's a google profile picture we save it and just show it, else we fetch the picture from our server
                let imageUrl = response.data.message.pfp
                if(imageUrl) {
                    if (!isGoogleProfilePicture(imageUrl)) {
                        imageUrl = await fetchFile(response.data.message.pfp, "images", "tutor", response.data.message.id);
                    }
                }
                await Promise.all([
                    dispatch(setDisplayableImage(imageUrl)),
                ])
                
               if(response.data.message.country){
                   const data = await fetchCountryData(response.data.message.country)
                   dispatch(setCountryFlag(data))
               }
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error);
                dispatch(setIsLoading(false))
            }
        };
        
        fetchData();
    }, [])


    useEffect(() => {
        //consuming api to get if there are unread notifs or not 
        const fetchNumberOfUnreadNotifs = async () => {
            try {
                const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/tutor/CountUnreadNotifications', {

                },  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                dispatch(setUnreadNotifications(response.data.unreadNotifs))
                
            }catch(err) {
                console.log(err)
            }
        }

        fetchNumberOfUnreadNotifs()
    }, [])

    const handleNotification = (data_) => {
        //if there are already notifications we add it
        console.log("adding notification");

        //adding notification
        dispatch(addNotification(data_.notification))

        dispatch(addLessontoCurrentDayLessons(data_.notification))

        console.log("unreadNotifications Value: ", unreadNotifications);
        //if there isn't we just update that there's a new notification

        dispatch(tutorIncrementNotifications())
    }
    

    useEffect(() => {
        if(tutorData.id) {
            const socket = io('${process.env.REACT_APP_BACKEND_URL}', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            });
            console.log("condition true", socket);

            socket.emit('createRoom', tutorData.id)
            // Listener for incoming notifications
            
            socket.on('Notification incoming', handleNotification)
            // Clean up function to remove event listener when component unmounts
         return () => {
            socket.disconnect();
          }
        }

         
    }, [tutorData.id, localStorage])



    const bodyContent = {
        Courses: <Courses></Courses>,
        Profile: <Feed></Feed>,
        ChatBot: <LinguaBuddy></LinguaBuddy>,
        Settings: <Settings userData={tutorData}></Settings>,
        Notifications: <NotificationsPage></NotificationsPage>,
        Calendar: <BigCalendar></BigCalendar>,
        tutorProfile: <ProfileChange></ProfileChange>,
        informationChange: <Account></Account>,
        subscription: <Subscription></Subscription>,
        Chat: <Chat></Chat>
    }




    const handleTutorBody = () => {
        if (path === '/tutor/profile') {
            return bodyContent.Profile
        }else if(path === '/tutor/profile/LinguaBuddy'){
            return bodyContent.ChatBot
        }else if(path === '/tutor/profile/Exams'){
            return bodyContent.Exams
        }else if(path === '/tutor/profile/Courses') {
            return bodyContent.Courses
        }else if(path === '/tutor/profile/Settings') {
            return bodyContent.Settings
        }else if(path ==='/tutor/profile/Notifications'){
            return bodyContent.Notifications
        }else if(path === "/tutor/profile/Calendar"){
            return bodyContent.Calendar
        }else if(path === "/tutor/profile/Settings/tutor-profile"){
            return bodyContent.tutorProfile
        }else if(path === "/tutor/profile/Settings/account") {
            return bodyContent.informationChange
        }else if(path ==="/tutor/profile/Settings/subscription"){
            return bodyContent.subscription
        }else if(location.pathname.startsWith('/tutor/profile/Chat/')){
            return bodyContent.Chat
        }
    }

    useEffect(() => {
        //fetching today's lessons 
        const currentDay= new Date()
        const dayOfMonth = currentDay.getDate()
        const month = currentDay.getMonth()+1
        const year = currentDay.getFullYear()

        const fetchTodaysUpcomingLessons = async () => {
            try {
                const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/tutor/getDayLessons', {
                    date: `${year}-${month}-${dayOfMonth}`
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                const lessons = response.data.result

                dispatch(setCurrentDayLessons(lessons))
            }catch(err) {
                console.log(err)
            }
        }

        fetchTodaysUpcomingLessons()

    }, [])// Run effect only once on component mount


    useEffect(() => {
        
        //array that will hold the timeouts
        let timeoutIds = []
        if(currentDayLessons) {

            console.log("timeout effect is running!");
            //we're gonna show the lesson confirmation modal when the difference between the current time and lesson time is 15 minutes  
            currentDayLessons.forEach(lesson => {
                const startTime = new Date(lesson.start_time)
                const notificationTime = new Date(startTime.getTime() - 15 * 60000); // 15 minutes before start time
                const videoCallTime = new Date(startTime.getTime())
                // Set timeout for notification
                const timeDifference = notificationTime.getTime() - Date.now();
                const videoCallTimeDifference = videoCallTime.getTime() - Date.now()
                if (timeDifference > 0 && lesson.Accepted ===1) {
                    const timeoutId = setTimeout(() => {
                        // Display notification to the user
                        dispatch(setCurrentDayLesson(lesson))
                        dispatch(setNotificationModalVisibility(true))
                    }, timeDifference)
    
                    timeoutIds.push(timeoutId)
                }
                if(videoCallTimeDifference> 0 && lesson.Accepted ===1 ) {
                    const timeoutId = setTimeout(() => {
                        dispatch(setCurrentDayLesson(lesson))
                        dispatch(setVideoCallModalVisibility(true))
                    }, videoCallTimeDifference)
                    timeoutIds.push(timeoutId)
                }
            });
        }
        // Clean up any timers on unmount
        return () => {
            // Clear all pending timeouts
            timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        };
        
    }, [currentDayLessons])

    const handleReceiveMessage = (data) => {
        dispatch(setNewMessages(true))
        dispatch(addChatNotification(data))
        
    }

    useEffect(() => {
        if(tutorData.id) {
            const socket = io('${process.env.REACT_APP_BACKEND_URL}', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            })

            console.log("learnerId: ", tutorData.id)
            socket.emit('createRoom', tutorData.id)
            // Listeners for incoming notifications
            
            //reject lesson error notification listener 
            socket.on('recieve_message', handleReceiveMessage)

            return () => {
                socket.disconnect();
              }
        }
    }, [tutorData.id])

    return (
        <div className="w-screen h-screen bg-backg flex flex-col">
            <TutorNavBar></TutorNavBar>
            {
                handleTutorBody()
            }
            {
                notificationModalVisibility?
                <LessonReminderModal type="reminder"></LessonReminderModal>
                :
                null
            }
            {
                videoCallModalVisibility?
                <LessonReminderModal fullName={tutorData.firstname +" "+ tutorData.lastname} type="videoCall"></LessonReminderModal>
                :
                null
            }
        </div> 
    );
}

export default TutorProfile;