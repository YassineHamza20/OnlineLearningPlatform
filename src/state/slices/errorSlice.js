import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error:''
  }


export const errorSlice = createSlice({
    name:'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})


export const {setError} = errorSlice.actions
export default errorSlice.reducer