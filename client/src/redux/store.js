import { configureStore } from "@reduxjs/toolkit";
import { sitterSlice } from "./features/sitterSlice";
import { userSlice } from "./features/userSlice";

export default configureStore({
    reducer:{
        user: userSlice.reducer,
        sitter: sitterSlice.reducer,
    }
})