import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    convo: [],
    Notifications: [],
    newMessages: false
  }


export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        setConvo:(state, action) => {  
            state.convo = action.payload
        },
        appendMessage:(state, action) => {
            state.convo = [...state.convo, action.payload]
            /*console.log("first message", action.payload)
                if(action.payload.Sender ==="Learner") {
                    const friendId = action.payload.IdTutor 
                    console.log("FRIEND", friendId)
                    const isThisConvo = state.convo.some(item => item.IdTutor === friendId)
                    console.log("FIRSTTHISISCONVO", isThisConvo)
               if(isThisConvo) {
                    state.convo = [...state.convo, action.payload]
           }
            }else {
               const friendId = action.payload.IdLearner
                const isThisConvo = state.convo.some(item => item.IdLearner === friendId)
            if(isThisConvo) {
           }
           }*/
           
        },
        addChatNotification: (state, action) => {
            console.log("action.payload: ", action.payload);
            const newData = {
                TextID: action.payload.TextID,
                IdLearner: action.payload.IdLearner,
                IdTutor: action.payload.IdTutor,
                message: action.payload.message,
                MessageTime: action.payload.MessageTime,
                Sender: action.payload.Sender,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                pfp: action.payload.pfp,
                uuid: action.payload.otherUuid
            }
            const chatExists = state.Notifications.findIndex(
                item => (item.IdLearner === action.payload.IdLearner) && (item.IdTutor === action.payload.IdTutor)
            )
            console.log("condition AddChatNotification: ", chatExists);
            if(chatExists >=0 ) {
                const array = [...state.Notifications]
                array[chatExists] = newData
                state.Notifications = array
                state.Notifications.sort((a, b) => a.MessageTime > b.MessageTime)

            }else {
                state.Notifications = [newData , ...state.Notifications] 
            }
        },
        setChatNotification: (state, action) => {
            state.Notifications = action.payload
        },
        setNewMessages: (state, action )=> {
            state.newMessages = action.payload
        }
    }
})

export const {
    setConvo,
    appendMessage,
    addChatNotification,
    setChatNotification,
    setNewMessages
} = chatSlice.actions
export default chatSlice.reducer