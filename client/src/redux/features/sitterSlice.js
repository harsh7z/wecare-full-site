import { createSlice } from "@reduxjs/toolkit";

export const sitterSlice = createSlice({
    name:'sitter',
    initialState:{
        sitter:null
    },
    reducers:{
        setSitter:(state,action) => {
            state.sitter = action.payload
        }
    }
})

export const { setSitter } = sitterSlice.actions