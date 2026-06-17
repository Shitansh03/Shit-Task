import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    authReady: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        setCredentials: (state, action) => {

            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );

            localStorage.setItem(
                "token",
                action.payload.token
            );
        },

        logout: (state) => {

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },

        setAuthReady: (state, action) => {
            state.authReady = action.payload;
        }
    },
});

export const {
    setCredentials,
    logout,
    setAuthReady,
} = authSlice.actions;

export default authSlice.reducer;