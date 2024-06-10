import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    time: '',
    selectedTutor: '',
    lessonTopic:'',
    lessonDifficulty: '',
    step: 0,
    selectedDate: '',
    visibility: false,
    lessonLength: '',
    language: '', 
    busyTimes: []

}


export const listSlice = createSlice({
    name: 'Schedule_data',
    initialState,
    reducers: {
        setTime: (state, action) => {
            state.time = action.payload
        },
        setSelectedTutor: (state, action) => {
            state.selectedTutor = action.payload
        },
        setLessonTopic: (state, action) => {
            state.lessonTopic = action.payload
        },
        setLessonDifficulty: (state, action) => {
            state.lessonDifficulty = action.payload
        },
        setSteps: (state, action) => {
            state.step = action.payload
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },
        setLessonLength: (state, action) => {
            state.lessonLength = action.payload
        }
        ,
        setVisibility: (state, action) => {
            state.visibility = action.payload
        },
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setBusyTimes: (state, action ) => {
            state.busyTimes = action.payload
        },  
        resetData: () => initialState

    }
})


export const { 
    setTime,
    setSelectedTutor, 
    setLessonDifficulty, 
    setLessonTopic,
    resetData,
    setSteps,
    setSelectedDate,
    setVisibility,
    setLessonLength,
    setLanguage,
    setBusyTimes
} = listSlice.actions
export default listSlice.reducer