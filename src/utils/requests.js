import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequest : (state, action) => action.payload,
        removeUserFromRequest: (state, action) => {
            const newArr = state.filter((request) => request._id !== action.payload)
            return newArr
        }
    }
})

export const {addRequest, removeUserFromRequest} = requestSlice.actions
export default requestSlice.reducer