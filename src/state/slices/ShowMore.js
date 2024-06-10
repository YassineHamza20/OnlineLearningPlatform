import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    visibility:false
  }


export const showMore = createSlice({
    name:'show_more',
    initialState,
    reducers: {
        setVisibility: (state, action) => {
            state.visibility = action.payload
        }
    }
})


export const {
    setVisibility
} = showMore.actions
export default showMore.reducer