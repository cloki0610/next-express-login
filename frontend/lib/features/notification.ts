import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface NotificationState {
    success: boolean | null;
    message: string;
}

// Define initial slice state
const initialNotificationState: NotificationState = {
    success: true,
    message: "",
};

const notificationSlice = createSlice({
    name: "auth",
    initialState: initialNotificationState,
    reducers: {
        update(state, action) {
            state.success = action.payload.success;
            state.message = action.payload.message;
        },
        reset(state) {
            state.success = null;
            state.message = "";
        },
    },
});

export const notificationActions = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
