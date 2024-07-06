import { useDispatch, useSelector, useStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import notificationReducer from "./features/notification";

// Config redux store
export const store = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            notification: notificationReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
