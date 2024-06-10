import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    firstlessonList: [],
    allLessons: [],
    currentDayLesson: {},
    currentDayLessons: [],
    notificationModalVisibility: false,
    videoCallModalVisibility: false
}


export const lessons = createSlice( {
    name: "lessons",
    initialState,
    reducers: {
        setFirstLessonList: (state, action) => {
            state.firstlessonList = action.payload
        },
        setAllLessons: (state, action) => {
            state.allLessons = action.payload
        },
        appendLesson: (state, action) => {
            state.firstlessonList = [...state.firstlessonList, action.payload]
        },
        Addlesson: (state, action) => {
            state.allLessons = [...state.allLessons, action.payload]
        },
        replaceFirstLessonItem: (state, action) => {
            const { data, index } = action.payload;
            console.log("data: ", action, "index: ", index);
            // Clone the current state array to avoid mutation
            const lessonsCopy = [...state.firstlessonList]
            lessonsCopy[index] = data

            state.firstlessonList = lessonsCopy
        },
        updateFirstLessonList: (state, action) => {
            const {lessonId, accepted} = action.payload
            if(state.firstlessonList) {
                const lessonIndex = state.firstlessonList.findIndex(item => item.lesson_id === lessonId)
                if (lessonIndex !==-1) {
                    state.firstlessonList = state.firstlessonList.map((item, index) => 
                        index === lessonIndex? {...item, Accepted: accepted} : item
                    )
                }   
            }
        },
        replaceFirstLesson: (state, action) => {

            const lessonDate = new Date(action.payload.start_time)
            
            const lessonIndex = state.firstlessonList.findIndex(item => (new Date(item.start_time)).getDate() === lessonDate.getDate() && (new Date(item.start_time)).getMonth() === lessonDate.getMonth() && (new Date(item.start_time)).getFullYear() === lessonDate.getFullYear() )

            //if the lesson is on the same date as one of the lessons in the firstLesson Array and it's before that one we update the array 
            if(lessonIndex !== -1) {
                const firstLessonDate = new Date(state.firstlessonList[lessonIndex].start_time)
                if (lessonDate < firstLessonDate) {
                    const lessonCopy = [...state.firstlessonList]
                    lessonCopy[lessonIndex] = { ...lessonCopy[lessonIndex], start_time: action.payload.start_time, end_time: action.payload.end_time, lesson_difficulty: action.payload.lesson_difficulty, lesson_topic: action.payload.lesson_topic, language: action.payload.language}
                    state.firstlessonList = lessonCopy
                }
            }else {
                /*//if it doens't exist and it's within the next 6 days we append it in the list 

                // Create a Date object for today
                const today = new Date();

                // Calculate the date 6 days from now
                const sixDaysFromNow = new Date();
                sixDaysFromNow.setDate(today.getDate() + 6);

                // Check if the start_time is within the next 6 days
                const isWithinNextSixDays = lessonDate >= today && lessonDate <= sixDaysFromNow;

                if (isWithinNextSixDays) {
                } */
                state.firstlessonList = [...state.firstlessonList, action.payload]
            }
        },
        deleteRejectedLesson: (state, action) => {
            if(state.firstlessonList) {
                state.firstlessonList = state.firstlessonList.filter(item => item.lesson_id !== action.payload)
            }
            if(state.allLessons) {
                state.allLessons = state.allLessons.filter(item => item.lesson_id !== action.payload)
            }
        },
        updateAllLessonsList: (state, action) => {
            const {lessonId, accepted} = action.payload
            if (state.allLessons) {
                const lessonIndex = state.allLessons.findIndex(item => item.lesson_id === lessonId)
                if (lessonIndex !==-1) {
                    state.allLessons = state.allLessons.map((item, index) => 
                        index === lessonIndex ? {...item, Accepted: accepted} : item
                    )
                }
            }
        },
        setCurrentDayLesson: (state, action ) => {
            state.currentDayLesson = action.payload
        },
        setCurrentDayLessons: (state, action) => {
            state.currentDayLessons = action.payload
        },
        setNotificationModalVisibility: (state, action )=> {
            state.notificationModalVisibility = action.payload
        },
        updateCurrentDayLessons: (state, action ) => {
            const index = state.currentDayLessons.findIndex(item => item.lesson_id === action.payload)

            if (index !== -1) {
                const copy = [...state.currentDayLessons]
                copy[index] = {...copy[index], Accepted: 1}
                state.currentDayLessons = copy
            }
        },
        removeCurrentDayLessons: (state, action ) => {
            if(state.currentDayLessons) {
                state.currentDayLessons = state.currentDayLessons.filter(item => item.lesson_id !== action.payload)
            }
        },
        addLessontoCurrentDayLessons: (state, action )=> {
            const lessonDate = new Date(action.payload.start_time)
            const lessonYear = lessonDate.getFullYear()
            const lessonMonth = lessonDate.getMonth()
            const lessonDay = lessonDate.getDate()

            const today = new Date()
            const thisYear = today.getFullYear()
            const thisMonth = today.getMonth()
            const thisDay = today.getDate()

            if(lessonYear === thisYear && thisMonth === lessonMonth && lessonDay === thisDay){
                state.currentDayLessons = [...state.currentDayLessons, action.payload]
                state.currentDayLessons.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
            }
        },
        setVideoCallModalVisibility: (state, action ) => {
            state.videoCallModalVisibility = action.payload
        },
        resetAllLessons: (state, action) => {
            state.allLessons = []
        }
    }
})


export const {
    setFirstLessonList, 
    setAllLessons,
    appendLesson,
    Addlesson,
    resetAllLessons,
    replaceFirstLessonItem,
    updateAllLessonsList,
    updateFirstLessonList,
    deleteRejectedLesson,
    replaceFirstLesson,
    setCurrentDayLesson,
    setNotificationModalVisibility,
    setCurrentDayLessons,
    updateCurrentDayLessons,
    removeCurrentDayLessons,
    addLessontoCurrentDayLessons,
    setVideoCallModalVisibility
    
} = lessons.actions

export default lessons.reducer