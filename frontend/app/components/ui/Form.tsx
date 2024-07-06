"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Button from "./Button";
import FormTitle from "./FormTitle";
import FormItem from "./FormItem";
import { useAppDispatch } from "@/lib/store";
import { notificationActions } from "@/lib/features/notification";
import type { ActionType } from "@/lib/actions";
import { redirect } from "next/navigation";
import { authActions } from "@/lib/features/auth";

export interface FormField {
    label: string;
    name: string;
    type: string;
}

interface FormProps {
    formType: "Login" | "Register";
    fields: FormField[];
    formAction: ActionType;
}

const Form = ({ formType, fields, formAction }: FormProps) => {
    const [message, dispatch, isPending] = useFormState(formAction, null);
    const appDispatch = useAppDispatch();

    // Use useEffect react to api response
    useEffect(() => {
        if (message && message.success) {
            // If response is success, check the form type and redirect to login/user page
            appDispatch(
                notificationActions.update({
                    success: true,
                    message: message,
                })
            );
            if (formType === "Login" && message.token && message.userId) {
                // If it is login page, update auth state and redirect to user page
                appDispatch(
                    authActions.login({
                        token: message.token,
                        username: message.message,
                        userId: message.userId,
                    })
                );
                redirect("/user");
            } else {
                // Else redirect to login page
                redirect("/login");
            }
        } else if (message && !message.success) {
            // If api response failed, update notification
            appDispatch(
                notificationActions.update({
                    success: false,
                    message: message,
                })
            );
        }
    }, [formType, message, appDispatch]);

    return (
        <div className="space-y-3">
            <form
                action={dispatch}
                className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8"
            >
                <FormTitle formType={formType} />
                {fields.map((field, index) => (
                    <FormItem key={index} field={field} />
                ))}
                {message && !message.success && (
                    <p className="text-sm text-red-500">{message.message}</p>
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                    {formType}
                </Button>
            </form>
        </div>
    );
};

export default Form;
