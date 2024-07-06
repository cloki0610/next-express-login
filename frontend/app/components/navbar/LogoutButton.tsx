import { logout } from "@/lib/actions";
import { authActions } from "@/lib/features/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { redirect } from "next/navigation";

const LogoutButton = () => {
    const appDispatcher = useAppDispatch();
    const username = useAppSelector((state) => state.auth.username);
    const logoutHandler = async (formData: FormData) => {
        "use server";
        await logout();
        appDispatcher(authActions.logout());
        redirect("/");
    };
    return (
        <>
            <span>Hello, {username || "Quest"}</span>
            <form action={logoutHandler}>
                <button type="submit" className="text-sm">
                    Logout
                </button>
            </form>
        </>
    );
};

export default LogoutButton;
