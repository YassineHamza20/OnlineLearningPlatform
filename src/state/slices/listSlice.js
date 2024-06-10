import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    listOfLanguages: [
        {id:0, language: 'English'}
    ],
    listOfLanguagesVisibility: false,
    listOfLanguagesSaved: false,
    listOfWorkExperience: [
        {id:0, title:'', tag:'Advertising', description:''}
    ],
    listOfWorkExperienceVisibility: false,
    listOfWorkExperienceSaved: false,
    listOfEducation : [
        {id:0, title:'', tag:'Advertising', description:''}
    ],
    listOfEducationVisibility: false,
    listOfEducationSaved: false

}


export const listSlice = createSlice({
    name: 'list_data',
    initialState,
    reducers: {
        setListOfLanguages: (state, action) => {
            const { id, language } = action.payload;
            const existingLanguageIndex = state.listOfLanguages.findIndex(item => item.id === id);
            
            if (existingLanguageIndex !== -1) {
                // If the language with the given id exists, update its value
                state.listOfLanguages[existingLanguageIndex].language = language;
            } else {
                // If the language with the given id doesn't exist, add it to the list
                state.listOfLanguages.push(action.payload);
            }
        },
        deleteLanguageItem: (state, action) => {
            const {id} = action.payload
            // Filter out the language with the specified id
            state.listOfLanguages = state.listOfLanguages.filter(item => item.id !== id);

        },
        resetLanguageList: (state, action) => {
            state.listOfLanguages = [
                {id:0, language: 'English'}
            ]
        },
        setListOfLanguagesVisibility: (state, action) => {
            state.listOfLanguagesVisibility = action.payload
        },
        setListOfWorkExperienceVisibility: (state, action) => {
            state.listOfWorkExperienceVisibility = action.payload
        },
        setWorkExperienceTitle: (state, action) => {
            const { id, title } = action.payload;
            const existingWorkIndex = state.listOfWorkExperience.findIndex(item => item.id === id);
            
            if (existingWorkIndex !== -1) {
                // If the work with the given id exists, update its value
                state.listOfWorkExperience[existingWorkIndex].title = title
            }
        },
        setWorkExperienceTag: (state, action) => {
            const { id, tag } = action.payload;
            const existingWorkIndex = state.listOfWorkExperience.findIndex(item => item.id === id);
            
            if (existingWorkIndex !== -1) {
                // If the work with the given id exists, update its value
                state.listOfWorkExperience[existingWorkIndex].tag = tag
            } 
        },
        setWorkExperienceDescription: (state, action) => {
            const { id, description } = action.payload;
            const existingWorkIndex = state.listOfWorkExperience.findIndex(item => item.id === id);
            
            if (existingWorkIndex !== -1) {
                // If the work with the given id exists, update its value
                state.listOfWorkExperience[existingWorkIndex].description = description
            } 
        },
        addWorkExperience: (state, action) => {
            state.listOfWorkExperience.push(action.payload)
        },
        removeWorkExperienceItem: (state, action) => {
            const {id} = action.payload
            // Filter out the workexperience with the specified id
            state.listOfWorkExperience = state.listOfWorkExperience.filter(item => item.id !== id);
        },
        resetListOfWorkExperience: (state, action ) => {
            state.listOfWorkExperience = [
                {id:0, title:'', tag:'Advertising', description:''}
            ]
        },
        setListOfEducationVisibility: (state, action ) => {
            state.listOfEducationVisibility = action.payload
        },
        setEducationTitle: (state, action) => {
            const { id, title } = action.payload;
            const existingEducationIndex = state.listOfEducation.findIndex(item => item.id === id);
            
            if (existingEducationIndex !== -1) {
                // If the education with the given id exists, update its value
                state.listOfEducation[existingEducationIndex].title = title
            }
        },
        setEducationTag: (state, action) => {
            const { id, tag } = action.payload;
            const existingEducationIndex = state.listOfEducation.findIndex(item => item.id === id);
            
            if (existingEducationIndex !== -1) {
                // If the education with the given id exists, update its value
                state.listOfEducation[existingEducationIndex].tag = tag
            }
        },
        setEducationDescription: (state, action) => {
            const { id, description } = action.payload;
            const existingEducationIndex = state.listOfEducation.findIndex(item => item.id === id);
            
            if (existingEducationIndex !== -1) {
                // If the education with the given id exists, update its value
                state.listOfEducation[existingEducationIndex].description = description
            }
        },
        addEducation: (state, action) => {
            state.listOfEducation.push(action.payload)
        },
        setListOfLanguagesSaved: (state, action) => {
            state.listOfLanguagesSaved = action.payload
        },
        setListOfEducationSaved: (state, action) => {
            state.listOfEducationSaved = action.payload
        },
        setListOfWorkExperienceSaved: (state, action) => {
            state.listOfWorkExperienceSaved = action.payload
        }, 
        removeEducationItem: (state, action) => {
            const {id} = action.payload
            // Filter out the education with the specified id
            state.listOfEducation = state.listOfEducation.filter(item => item.id !== id);
        },
        resetListOfEducation: (state, action ) => {
            state.listOfEducation = [ 
                {id:0, title:'', tag:'Advertising', description:''}
            ]
        },
        //these reducers are responsible for setting the list of languages with the true list 
        getListOfLanguages: ( state, action) => { 
            state.listOfLanguages = action.payload
        },
        getListOfWorkExperience: (state, action )=> {
            state.listOfWorkExperience= action.payload
        },
        getListOfEducation: (state, action) => {
            state.listOfEducation = action.payload
        },
        resetLists: () => initialState

    }
})


export const { 
    setListOfLanguages, 
    deleteLanguageItem, 
    resetLanguageList, 
    setListOfLanguagesVisibility, 
    setListOfWorkExperienceVisibility, 
    setWorkExperienceDescription, 
    setWorkExperienceTitle, 
    setWorkExperienceTag, 
    addWorkExperience, 
    removeWorkExperienceItem, 
    resetListOfWorkExperience, 
    setListOfEducationVisibility,
    setEducationTitle,
    setEducationTag,
    setEducationDescription,
    addEducation,
    removeEducationItem,
    resetListOfEducation,
    setListOfWorkExperienceSaved,
    setListOfLanguagesSaved,
    setListOfEducationSaved,
    getListOfLanguages,
    getListOfEducation,
    getListOfWorkExperience,
    resetLists
} = listSlice.actions
export default listSlice.reducer