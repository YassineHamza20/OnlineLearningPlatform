import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import errorReducer from './slices/errorSlice'
import tutorReducer from './slices/tutorSlice'
import loginReducer from './slices/loginSlice'
import listReducer from './slices/listSlice'
import scheduleReducer from './slices/Schedule'
import showMoreReducer from './slices/ShowMore'
import lessonsListReducer from './slices/lessonsList'
import notificationsReducer from './slices/NotificationSlice'
import likedTutorReducer from './slices/likedTutorSlice'
import courseReducer from './slices/CourseSlice'
import chatReducer from './slices/chatSlice'
import adminReducer from './slices/adminSlice'
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";


//store that contains a global state
const store = configureStore({
  reducer: {
    userData: userReducer, //contains signup user Data
    Error: errorReducer, // contains Errors to show
    tutorData: tutorReducer, //contains tutor signup Data
    loginData: loginReducer, //contains user login Data
    listData: listReducer, //contains the lists of the tutor personalization part
    scheduleData: scheduleReducer, //contains the information about scheduling a lesson
    showMoreData:  showMoreReducer, //contains the data concering the show more modal
    lessonsList: lessonsListReducer, //contains the lessons
    notificationsData: notificationsReducer, //contains the notifications
    likedTutors: likedTutorReducer,
    courseData: courseReducer,
    chatData: chatReducer,
    adminData: adminReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createStateSyncMiddleware({
      whitelist: [
        //lessons actions
        'lessons/setFirstLessonList',
        'lessons/updateAllLessonsList',
        'lessons/deleteRejectedLesson',
        'lessons/replaceFirstLesson',
        'lessons/updateFirstLessonList',
        'lessons/replaceFirstLessonItem',
        'lessons/appendLesson',
        'lessons/setNotificationModalVisibility',
        'lessons/updateCurrentDayLessons',
        'lessons/addLessontoCurrentDayLessons',
        'lessons/setVideoCallModalVisibility',
        'lessons/removeCurrentDayLessons',
        //notifications action
        'notification_data/setUnreadNotifications',
        'notification_data/updateNotification',
        'notification_data/incrementUnreadNotifications',
        'notification_data/markAllAsRead',
        'notification_data/decrementUnreadNotifications',
        'notification_data/updateNotificationRead',
        

      ],
    }))
    /*getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tutor_data/setIntroductionVideo'],
      },
    }),*/
})

initMessageListener(store);
export default store;