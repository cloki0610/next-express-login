"use server";
import axios from "axios";
import { cookies } from "next/headers";

export type ActionType = typeof login | typeof register;

interface APIResponse {
    success: boolean;
    message: string;
    userId?: string;
    token?: string;
}

export async function register(
    prevState: any,
    formData: FormData
): Promise<APIResponse> {
    try {
        // Make request to backend API
        const res = await axios.post<APIResponse>(
            "http://localhost:8080/user/register",
            {
                email: formData.get("email"),
                username: formData.get("username"),
                password: formData.get("password"),
                address1: formData.get("address1"),
                address2: formData.get("address2"),
                postcode: formData.get("postcode"),
            }
        );
        const resData = res.data;
        // Redirect user into user page if login success
        if (resData.success) {
            return {
                success: true,
                message: resData.message || "",
                userId: resData.userId || "",
            };
        } else {
            // If API responds with an error message, return and update the message
            return {
                success: false,
                message: resData.message || "",
            };
        }
    } catch (error) {
        if (error instanceof Error) {
            // Set error message
            return {
                success: false,
                message: "Something went wrong.",
            };
        }
        throw error;
    }
}

export async function login(
    prevState: any,
    formData: FormData
): Promise<APIResponse> {
    try {
        // Make request to backend API
        const res = await axios.post<APIResponse>(
            "http://localhost:8080/user/login",
            {
                email: formData.get("email"),
                password: formData.get("password"),
            }
        );
        const resData: APIResponse = await res.data;
        // Redirect user into user page if login success
        if (resData.success && resData.token && resData.userId) {
            // Add login data into cookies
            let expireTime = (new Date().getTime() + 25920) * 1000;
            cookies().set("token", resData.token);
            cookies().set("expirationTime", expireTime.toString());
            cookies().set("username", resData.message);
            cookies().set("userId", resData.userId);
            return {
                success: true,
                message: resData.message || "",
                token: resData.token || "",
                userId: resData.userId || "",
            };
        } else {
            // If API responds with an error message, return and update the message
            return {
                success: false,
                message: resData.message || "",
            };
        }
    } catch (error) {
        if (error instanceof Error) {
            // Set error message
            return {
                success: false,
                message: "Something went wrong.",
            };
        }
        throw error;
    }
}

export async function logout(): Promise<APIResponse> {
    try {
        // Set empty data into cookies
        cookies().set("token", "");
        cookies().set("expirationTime", new Date().getTime().toString());
        cookies().set("username", "");
        cookies().set("userId", "");
        return {
            success: true,
            message: "sucessfully logout.",
        };
    } catch (error) {
        if (error instanceof Error) {
            // Set error message
            return {
                success: false,
                message: "Something went wrong.",
            };
        }
        throw error;
    }
}
