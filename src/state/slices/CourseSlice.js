import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Title: '',
    Category: '',
    language: '',
    level: '',
    type: '',
    description: '',
    numberOfpages: 1,
    pdf: '',
    formError: '',
    loading: false,
    listOfCourses: []
  }


export const courseSlice = createSlice({
    name:'courseData',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.Title = action.payload
        },
        setCategory: (state, action) => {
            state.Category = action.payload
        },
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setLevel: (state, action) => {
            state.level = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setNumberOfPages: (state, action) => {
            state.numberOfpages = action.payload
        },
        setPdf: (state, action) => {
            state.pdf = action.payload
        },
        setType: (state, action) => {
            state.type = action.payload
        },
        setFormError: (state, action) => {
            state.formError = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }, 
        setListOfCourses:(state, action) => {
            state.listOfCourses = action.payload
        },
        appendListOfCourses: (state, action) => {
            console.log('Action payload:', action.payload);
            console.log('State before:', state.listOfCourses);
            if (action.payload) {
                const newArray = [action.payload, ...state.listOfCourses]

                state.listOfCourses = newArray
            }
            console.log('State after:', state.listOfCourses);
        },
        deleteCourse: (state, action)=> {
            state.listOfCourses = state.listOfCourses.filter(item => item.id !== action.payload)
        },
        resetCourseData: (state, action) => {
            state.Title= ''
            state.Category = ''
            state.language = ''
            state.level = ''
            state.type = ''
            state.description = ''
            state.numberOfpages = 1
            state.pdf = ''
            state.formError = ''
            state.loading = false            
        }
    }
})


export const {
    setCategory,
    setDescription,
    setLanguage,
    setLevel,
    setNumberOfPages,
    setPdf,
    setTitle,
    setType,
    setFormError,
    setLoading,
    resetCourseData,
    setListOfCourses,
    appendListOfCourses,
    deleteCourse
} = courseSlice.actions
export default courseSlice.reducer