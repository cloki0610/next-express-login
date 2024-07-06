"use client";
import { useEffect } from "react";
import { notificationActions } from "@/lib/features/notification";
import { useAppDispatch, useAppSelector } from "@/lib/store";

const Notification = () => {
    const appDispatch = useAppDispatch();
    const message = useAppSelector((state) => state.notification.message);
    const success = useAppSelector((state) => state.notification.success);
    let bgColor = success ? "bg-green-500" : "bg-red-500";
    useEffect(() => {
        const timeout = setTimeout(() => {
            appDispatch(notificationActions.reset());
        }, 30000);
        return () => {
            clearTimeout(timeout);
        };
    }, [appDispatch]);
    return (
        <>
            {message && (
                <div
                    className={`w-full h-10 sticky top-0 shadow-lg text-center py-2 ${bgColor}`}
                >
                    <span>{message}</span>
                </div>
            )}
        </>
    );
};

export default Notification;
