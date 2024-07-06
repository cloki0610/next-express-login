"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "../lib/store";
import { authActions } from "@/lib/features/auth";
import { cookies } from "next/headers";

const calculateRemainingTime = (expirationTime: string) => {
    // A helper function to calculate the remaining duration
    const currentTime = new Date().getTime();
    const adjustExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustExpirationTime - currentTime;
    return remainingDuration;
};

const rertrieveStoredToken = () => {
    // A helper function to rertrieve token in cookies store create by next
    const storedToken = cookies().get("token");
    const storedExpirationDate =
        cookies().get("expirationTime")?.value ||
        new Date().getTime().toString();
    const storedUsername = cookies().get("username");
    const storedUserId = cookies().get("userId");
    if (storedExpirationDate) {
        const remainingTime = calculateRemainingTime(storedExpirationDate);
        if (remainingTime <= 60000) {
            cookies().delete("token");
            cookies().delete("expirationTime");
            cookies().delete("username");
            cookies().delete("userId");
            return null;
        }
        return {
            token: storedToken,
            username: storedUsername,
            userId: storedUserId,
            duration: remainingTime,
        };
    }
    return null;
};

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store();
    }
    useEffect(() => {
        if (storeRef.current) {
            // If token data already exists in cookies, then init the auth state
            const tokenData = rertrieveStoredToken();
            let initialToken, initialUsername, initialUserId;
            if (tokenData) {
                initialToken = tokenData.token;
                initialUsername = tokenData.username;
                initialUserId = tokenData.userId;
                storeRef.current.dispatch(
                    authActions.login({
                        token: initialToken,
                        username: initialUsername,
                        userId: initialUserId,
                    })
                );
            }
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
