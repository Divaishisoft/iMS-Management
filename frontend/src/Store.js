import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import studentsReducer from "./Features/Student/StudentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentsReducer,
    },
});