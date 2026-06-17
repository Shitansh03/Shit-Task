import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../features/api/taskApi";

import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware),
})