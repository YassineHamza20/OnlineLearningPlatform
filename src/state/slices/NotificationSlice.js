import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    notificationsList: [],
    pageNumber: 1, //indicator for pagination
    maxPageNumber: 0, //number of pages indicator
    unreadNotifs: 0, //how many unreadNotifications
    selectedOption: 0, //specifying which filtering option is selected
    fetchedNotifications: false //indicator that we did fetch notifications from backend at least once 
}


export const notificationSlice = createSlice({
    name: 'notification_data',
    initialState,
    reducers : {
        setNotificationsList: (state, action ) => {
            state.notificationsList = action.payload
        },
        appendNotifications: (state, action ) => {
            state.notificationsList = [...state.notificationsList, ...action.payload]
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
        },
        setMaxPageNumber: (state, action) => {
            state.maxPageNumber = action.payload
        },
        updateNotification: (state, action) => {
            const { notification, accepted, role, lesson, type } = action.payload

            if(role === "learner" && ((state.selectedOption === 2 && type === "approve") || (state.selectedOption === 3 && type ==="cancel") )) {
                const updatedNotification = {
                    ...lesson,
                    Accepted: accepted
                };
                state.notificationsList = [...state.notificationsList, updatedNotification]
                
                // If you need to sort the list, do it here
                state.notificationsList.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
            } else {
                // Find the index of the notification to update
                const index = state.notificationsList.findIndex(item => item.lesson_id === notification);
    
                console.log("index: ", index);
    
    
            
                // If the notification is found, update it
                if (index !== -1) {
                    //if we're in all we change the status of notification if we're in pending we just remove it 
                    if(state.selectedOption ===1 ){
                        state.notificationsList = state.notificationsList.filter(notif => notif.lesson_id !== notification);
                    }else {
                        const listCopy = [...state.notificationsList]  
                        console.log("listCopy[index]:", listCopy[index]);
                        const updatedNotification = {
                            ...listCopy[index],
                            Accepted: accepted
                        };
                        console.log("updatedNotification redux:", updatedNotification);
                
                        // Use map to update the specific notification, maintaining immutability
                        listCopy[index] = updatedNotification
                        state.notificationsList = listCopy
                    }
                }
            }
        
        },
        updateNotificationRead: (state, action ) => {
            const { notification, read, role } = action.payload

            let updatedNotification 
        
            console.log("lesson_id", notification)
        
            // Find the index of the notification to update
            const index = state.notificationsList.findIndex(item => item.lesson_id === notification.lesson_id);

        
            // If the notification is found, update it
            if (index !== -1) {
                if(role ==="learner") {
                    updatedNotification = {
                        ...notification, 
                        ReadByLearner: read 
                    }
                } else {
                    updatedNotification = {
                        ...notification, 
                        ReadByTutor: read
                    }
                }
        
                // Use map to update the specific notification, maintaining immutability
                state.notificationsList = state.notificationsList.map((item, i) =>
                    i === index ? updatedNotification : item
                );
            }
        },
        addNotification: (state, action )=> {
            console.log("selectedOPtion from redux :", state.selectedOption === 0 || state.selectedOption === 1 );
            if((state.selectedOption === 0 || state.selectedOption === 1) && state.fetchedNotifications) {
                state.notificationsList = [...state.notificationsList, action.payload]
                
                // If you need to sort the list, do it here
                state.notificationsList.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
            }
        },
        incrementUnreadNotifications: (state, action ) => {
            state.unreadNotifs = state.unreadNotifs +1 
        },
        decrementUnreadNotifications: (state, action ) => {
            console.log("condition: ", state.unreadNotifs -1 >=0);
            if (state.unreadNotifs -1 >=0){
                state.unreadNotifs = state.unreadNotifs-1
            }
        },
        removeNotification: (state, action) => {
            const lessonIdToRemove = action.payload

            state.notificationsList = state.notificationsList.filter(notification => notification.lesson_id !== lessonIdToRemove);
        },   
        setUnreadNotifications: (state, action )=> {
            state.unreadNotifs = action.payload
        },
        setFetchedNotifications: (state, action) => {
            state.fetchedNotifications = action.payload
        },
        setSelectedOption: (state, action ) => {
            state.selectedOption = action.payload
        },
        markAllAsRead: (state, action ) => {
            if(state.notificationsList){
                if(action.payload === "Learner"){
                    state.notificationsList = state.notificationsList.map((item, i) => 
                    item.ReadByLearner === 0 ? {...item, ReadByLearner:1} : item
                    )
                }else {
                    state.notificationsList = state.notificationsList.map((item, i) => 
                    item.ReadByTutor === 0 ? {...item, ReadByTutor:1} : item
                    )
                }
            } 
        },
        tutorIncrementNotifications: (state, action ) => {
            state.unreadNotifs = state.unreadNotifs +1  
        },
        resetFields: () => initialState
    }
})

export const {
    resetFields,
    setNotificationsList,
    updateNotification,
    removeNotification,
    setUnreadNotifications,
    addNotification,
    setPageNumber, 
    setMaxPageNumber,
    appendNotifications,
    updateNotificationRead,
    setSelectedOption,
    incrementUnreadNotifications,
    decrementUnreadNotifications,
    setFetchedNotifications,
    tutorIncrementNotifications,
    markAllAsRead
} = notificationSlice.actions
export default notificationSlice.reducer