import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    likedTutors: []
  }


export const likedTutorsSlice = createSlice({
    name:'likedTutors',
    initialState,
    reducers: {
        setLikedTutors:(state, action) => {
            state.likedTutors = action.payload
        },
        appendItem: (state, action) => {
            console.log("append item action.payload:", action.payload);
            state.likedTutors.push(action.payload);

        },
        removeItem: (state, action) => {
            console.log("remove item action.payload:", action.payload);
            state.likedTutors = state.likedTutors.filter(item => item.id !== action.payload );
        }
    }
})


export const {
    setLikedTutors,
    appendItem,
    removeItem
} = likedTutorsSlice.actions
export default likedTutorsSlice.reducer