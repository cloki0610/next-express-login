import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AuthState {
    isAuth: boolean;
    username: null | string;
    userId: null | string;
    token: null | string;
}

// Define initial slice state
const initialAuthState: AuthState = {
    isAuth: false,
    token: null,
    username: null,
    userId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuth = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
        },
        logout(state) {
            state.isAuth = false;
            state.token = null;
            state.username = null;
            state.userId = null;
        },
    },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
