import Link from "next/link";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const FormTitle = ({ formType }: { formType: string }) => {
    const login =
        formType === "Login" ? (
            <span>Login</span>
        ) : (
            <Link
                href="/login"
                className="underline hover:no-underline transition"
            >
                Login
            </Link>
        );
    const register =
        formType === "Register" ? (
            <span>Register</span>
        ) : (
            <Link href="/register" className="underline hover:no-underline">
                Register
            </Link>
        );
    return (
        <h2 className={`${lusitana.className} mb-3 text-2xl`}>
            Please {login} or {register} to continue.
        </h2>
    );
};

export default FormTitle;
