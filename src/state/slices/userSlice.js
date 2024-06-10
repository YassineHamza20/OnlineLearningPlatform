import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  uuid: '',
  firstname: '',
  lastname: '',
  subscribed: false,
  country:'', 
  tel: '', 
  Birthday: '',
  email: '',
  password: '',
  confpass: '',
  pic: 'user.png',
  proficiency:'',
  goals: [],
  topics: [],
  isLoading: false, 
  signupStep: 0, //indicates the user is currently at which step in the sign up process
  isVerified: false,
  error: '',
  verificationPlaceholder: false,
  tutorSearchList: [],
  tutorSearchPageNumber: 1,//indicates the page number when searching for tutors
  maxPageNumber : "", //indicates the max number of pages when search for tutors
  created_at: '',
  selectedTutor: {},
  filterOptions: {
    availability: '',
    language: '',
    proficiency: '',
    name: ''
  }
}

//slice that contains all the sign_up user informations
export const userSlice = createSlice({
  name: 'user_data',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setId: (state, action ) => {
      state.id = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setConfpass: (state, action) => {
      state.confpass = action.payload
    },
    setPic: (state, action) => {
      state.pic = action.payload
    },
    setProficiency: (state, action) => {
      state.proficiency = action.payload
    },
    changeGoals: (state, action) =>{
      state.goals = action.payload
    },
    setGoals: (state, action) => {
      const index = state.goals.indexOf(action.payload);
      if (index !== -1) {
          // If the goal exists, remove it from the array
          state.goals = state.goals.filter((item, idx) => idx !== index)
      }
      else {
        // If the goal doesn't exist, add it to the array
        state.goals.push(action.payload)
      }
    },
    changeTopics: (state, action) => {
      state.topics = action.payload
    },
    setTopics: (state, action) => {
      const index = state.topics.indexOf(action.payload);
      if (index !== -1) {
          // If the topic exists, remove it from the array
          state.topics = state.topics.filter((item, idx) => idx !== index)
      }
      else {
        // If the topic doesn't exist, add it to the array
        state.topics.push(action.payload)
      }
    },
    setSignUpStep: (state, action) => {
      state.signupStep = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
    ,
    setError: (state, action) => {
      state.error = action.payload
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload
    },
    setVerificationLearner: (state, action) => {
      state.verificationPlaceholder = action.payload
    },
    setFirstName: (state, action) => {
      state.firstname= action.payload
    },
    setLastName: (state, action) => {
      state.lastname = action.payload
    },
    setCountry: (state, action) => {
      state.country = action.payload
    },
    setTel: (state, action) => {
      state.tel = action.payload
    },
    setBirthday: (state, action) => {
      state.Birthday = action.payload
    },
    setSubscribed: (state, action) => {
      state.subscribed = action.payload
    },
    setTutorSearchList: (state, action) => {
      state.tutorSearchList = action.payload
    },
    appendTutorSearchList: (state, action) => {
      state.tutorSearchList = [...state.tutorSearchList, ...action.payload]
    },
    incrementPageNumber: (state, action) => {
      state.tutorSearchPageNumber = state.tutorSearchPageNumber+1
    },
    setMaxPageNumber: (state, action) => {
      state.maxPageNumber = action.payload
    },
    setUuid: (state, action) => {
      state.uuid = action.payload
    },
    setCreatedAt: (state, action) => {
      state.created_at = action.payload
    },
    setSelectedTutor: (state, action) => {
      state.selectedTutor = action.payload
    },
    setfilterOptions: (state, action )=> {
      const {type, value} = action.payload

      //resetting the page number upon every new filtering action 
      state.tutorSearchPageNumber = 1

      //saving the filtering options
      state.filterOptions[type] = value
    },
    resetPageNumber: (state, action ) => {
      state.tutorSearchPageNumber = 1
    },
    resetFilterOptions: (state, action) => {
      //resetting the page number upon every new filtering action 
      state.tutorSearchPageNumber = 1
      state.filterOptions = {
        name: state.filterOptions.name,
        proficiency :"",
        language: "",
        availability: ""
      }
    },
    resetUserData: () => initialState
  },
})


export const { 
  setEmail, 
  setPassword, 
  setConfpass, 
  setPic, 
  setProficiency, 
  setGoals, 
  setTopics, 
  setSignUpStep, 
  resetUserData, 
  setError, 
  setIsLoading, 
  setIsVerified, 
  setVerificationLearner, 
  setBirthday, 
  setCountry, 
  setFirstName, 
  setSubscribed, 
  setLastName, 
  setTel, 
  setTutorSearchList,
  setId,
  appendTutorSearchList,
  incrementPageNumber,
  setMaxPageNumber,
  setUuid,
  setCreatedAt,
  setSelectedTutor,
  setfilterOptions,
  resetPageNumber,
  resetFilterOptions,
  changeGoals,
  changeTopics
} = userSlice.actions
export default userSlice.reducer