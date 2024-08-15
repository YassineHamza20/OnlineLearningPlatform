import NavBar from "../../../components/learner profile/NavBar";
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { useEffect} from "react";
import { setId, setIsLoading, setBirthday, setCountry, setEmail, setFirstName, setSubscribed, setLastName, setPic, setTel, setUuid, setCreatedAt, setIsVerified, setProficiency, changeGoals, changeTopics } from "../../../state/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CoursesSearch from "./CoursesSearch";
import TutorsSearch from "./TutorsSearch";
import Body from '../../../components/learner profile/Body'
import LinguaBuddy from "./LinguaBuddy";
import Settings from "../../../components/Global/Settings";
import BigCalendar from '../../../components/learner profile/BigCalendar'
import io from 'socket.io-client'
import { setUnreadNotifications, updateNotification } from "../../../state/slices/NotificationSlice";
import { appendLesson, deleteRejectedLesson, removeCurrentDayLessons, setCurrentDayLesson, setCurrentDayLessons, setNotificationModalVisibility, setVideoCallModalVisibility, updateAllLessonsList, updateCurrentDayLessons, updateFirstLessonList } from "../../../state/slices/lessonsList";
import NotificationsPage from '../NotificationsPage'
import { fetchFile, isGoogleProfilePicture } from "../../../components/Global/functions";
import TutorProfile from "../../../components/learner profile/TutorProfile";
import { useLocation } from 'react-router-dom';
import LessonReminderModal from "../../../components/Global/lessonReminderModal";
import ProfileChange from '../../../components/Settings/ProfileChange'
import Account from '../../../components/Settings/Account'
import Subscription from "../../../components/Settings/Subscription";
import CoursePage from "../../../components/LearnerCourses/CoursePage";
import Chat from "../../Chat";
import { addChatNotification, setNewMessages } from "../../../state/slices/chatSlice";
import FeedbackForm from "./FeedbackForm";


function LearnerProfile() {
    const dispatch = useDispatch()
    const learnerId = useSelector(state => state.userData.id)
    const lessonModalVisibility = useSelector(state => state.lessonsList.notificationModalVisibility)
    const currentDayLessons = useSelector(state => state.lessonsList.currentDayLessons)
    
    const learnerfirstName = useSelector(state => state.userData.firstname)
    const learnerLastName = useSelector(state => state.userData.lastname)

    const currentDayLesson = useSelector(state => state.lessonsList.currentDayLesson)

    const videoCallModalVisibility = useSelector(state => state.lessonsList.videoCallModalVisibility)

    const learnerData = useSelector(state => state.userData)



    const location = useLocation();


    useEffect(() => {
        //getting tutor details
        const fetchData = async () => {
            dispatch(setIsLoading(true))
            try {
                const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/details', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                });
                
                console.log(response.data.message)

                // Dispatch actions sequentially
                await Promise.all([
                    dispatch(setUuid(response.data.message.uuid)),
                    dispatch(setId(response.data.message.id)),
                    dispatch(setFirstName(response.data.message.firstname)),
                    dispatch(setLastName(response.data.message.lastname)),
                    dispatch(setIsVerified(response.data.message.isVerified)),
                    dispatch(setEmail(response.data.message.email)),
                    dispatch(setSubscribed(response.data.message.isSubscribed)),
                    dispatch(setCountry(response.data.message.country)),
                    dispatch(setTel(response.data.message.tel)),
                    dispatch(changeGoals(JSON.parse(response.data.message.learning_goals))),
                    dispatch(changeTopics(JSON.parse(response.data.message.interested_topics))),
                    dispatch(setBirthday(response.data.message.Birthday)),
                    dispatch(setCreatedAt(response.data.message.created_at)),
                    dispatch(setProficiency(response.data.message.language_proficiency))
                ]);

                //if it's a google profile picture we save it and just show it, else we fetch the picture from our server
                let imageUrl = response.data.message.pfp
                if(imageUrl) {
                    if (!isGoogleProfilePicture(imageUrl)) {
                        imageUrl = await fetchFile(response.data.message.pfp, 'images', 'Learner', response.data.message.id);
                    }
                }
                console.log("image: ", imageUrl);
                dispatch(setPic(imageUrl))

                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error);
                dispatch(setIsLoading(false))
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        //consuming api to get if there are unread notifs or not 
        const fetchNumberOfUnreadNotifs = async () => {
            try {
                const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/CountUnreadNotifications', {

                },  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                console.log("number of unreadNotifs: ", response.data)
                dispatch(setUnreadNotifications(response.data.unreadNotifs))
                
            }catch(err) {
                console.log(err)
            }
        }

        fetchNumberOfUnreadNotifs()
    }, [])

 
    //action to do when there's error in rejection query it server side
    const handleCancelLessonError = (err) => {
        console.log("error canceling lesson : ", err.removedLesson);
    }

    //action to do when lesson gets canceled by tutor
    const handleCancelLesson = (data_) => {
        console.log(data_)

       
        //setting how many unreadNotif left
        dispatch(setUnreadNotifications(data_.ReadByLearner))
        
        
        
        //updating notification status 
        dispatch(updateNotification({ notification: data_.removedLesson, accepted: 0, role: "learner", lesson: data_.lesson, type:"cancel"}))
        


        //removing the rejected lesson from the ui
        dispatch(deleteRejectedLesson(data_.removedLesson))

        console.log("new first lesson: ", data_.firstLesson);
        //showing the next approved lesson in the ui if it exists
        if(data_.firstLesson) {
            dispatch(appendLesson(data_.firstLesson))
        } 

        dispatch(removeCurrentDayLessons(data_.removedLesson))
        console.log("remove lesson Notification")
    }

    //action to do when lesson gets approved by tutor
    const handleApproveLesson = (data_) => {
        console.log("Approve lesson Data: ", data_);
        const lessonId= data_.approvedLesson

        //setting how many unreadNotif left
        dispatch(setUnreadNotifications(data_.ReadByLearner))
        

        //updating notification status 
        dispatch(updateNotification({ notification: data_.approvedLesson, accepted: 1, role: "learner", lesson: data_.lesson, type:"approve"}))
        

        //changing lesson status to accepted if it exists 
        dispatch(updateAllLessonsList({lessonId: lessonId, accepted: 1}))
        dispatch(updateFirstLessonList({lessonId: lessonId, accepted: 1}))

        dispatch(updateCurrentDayLessons(data_.approvedLesson))
        console.log("approve lesson Notificaiton")
    }

    useEffect(() => {
        if(learnerId) {
            const socket = io('${process.env.REACT_APP_BACKEND_URL}', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            })

            console.log("learnerId: ", learnerId)
            socket.emit('createRoom', learnerId)
            // Listeners for incoming notifications
            
            //reject lesson error notification listener 
            socket.on('CancelLesson Error', handleCancelLessonError)

            //lesson rejected by tutor notification listener
            socket.on('Cancel Notification', handleCancelLesson)

            //listen approved by tutor notification listener
            socket.on('Approvement Notification', handleApproveLesson)
            return () => {
                socket.disconnect();
              }
        }
    }, [learnerId, localStorage])
    



    
    const bodyContent = {
        CoursesSearch: <CoursesSearch></CoursesSearch>,
        TutorsSearch: <TutorsSearch></TutorsSearch>,
        TutorProfile: <TutorProfile></TutorProfile>,
        Profile: <Body></Body>,
        ChatBot: <LinguaBuddy></LinguaBuddy>,
        Settings: <Settings userData={learnerData}></Settings>,
        calendar: <BigCalendar></BigCalendar>,
        feedback: <FeedbackForm></FeedbackForm>,
        Notifications: <NotificationsPage></NotificationsPage>,
        studentProfile: <ProfileChange></ProfileChange>,
        informationChange: <Account></Account>,
        subscription: <Subscription></Subscription>,
        coursePage: <CoursePage></CoursePage>,
        Chat: <Chat></Chat>,
        


    }
    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;



    const handleBody = () => {
        if (path === '/learner/profile') {
            return bodyContent.Profile
        }else if (path === '/learner/profile/Tutors') {
            return bodyContent.TutorsSearch
        }else if(path === '/learner/profile/LinguaBuddy'){
            return bodyContent.ChatBot
        }else if(path === '/learner/profile/Courses') {
            return bodyContent.CoursesSearch
        }else if(path === '/learner/profile/Settings') {
            return bodyContent.Settings
        }else if (path === '/learner/profile/Calendar') {
            return bodyContent.calendar
        }else if(path === '/learner/profile/FeedbackForm') {
                return bodyContent.FeedbackForm
        }else if(path === '/learner/profile/Notifications') {
            return bodyContent.Notifications
        }else if(location.pathname.startsWith('/learner/profile/Tutor/')) {
            return bodyContent.TutorProfile
        }else if(path === "/learner/profile/Settings/student-profile"){
            return bodyContent.studentProfile
        }else if(path ==="/learner/profile/Settings/account") {
            return bodyContent.informationChange
        }else if(path ==="/learner/profile/Settings/subscription") {
            return bodyContent.subscription
        }else if(location.pathname.startsWith('/learner/profile/Courses/')) {
            return bodyContent.coursePage
        }else if(location.pathname.startsWith('/learner/profile/Chat/')){
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
                const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/getDayLessons', {
                    date: `${year}-${month}-${dayOfMonth}`
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                const lessons = response.data.result
                console.log("today's lessons: ", lessons)

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
                        console.log("currentDayLesson: ", currentDayLesson);
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
        if(learnerId) {
            const socket = io('${process.env.REACT_APP_BACKEND_URL}', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            })

            console.log("learnerId: ", learnerId)
            socket.emit('createRoom', learnerId)
            // Listeners for incoming notifications
            
            //reject lesson error notification listener 
            socket.on('recieve_message', handleReceiveMessage)

            return () => {
                socket.disconnect();
              }
        }
    }, [learnerId])

    return (
        <>
        <div className="w-screen h-screen bg-backg flex flex-col">
            <NavBar></NavBar>
            
            {
                handleBody()
            }
            
            {
                lessonModalVisibility?
                    <LessonReminderModal type=""></LessonReminderModal>
                :
                null
            }
             {
                videoCallModalVisibility?
                <LessonReminderModal fullName={learnerfirstName +" "+ learnerLastName} type="videoCall"></LessonReminderModal>
                :
                null
            }
           
        </div>
       
        </>
    );
}

export default LearnerProfile;