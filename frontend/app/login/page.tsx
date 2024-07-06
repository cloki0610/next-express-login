import { login } from "@/lib/actions";
import Form from "../components/ui/Form";

export default function Login() {
    const fields = [
        { label: "E-mail", name: "email", type: "email" },
        { label: "password", name: "password", type: "password" },
    ];
    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-orange-600">
            <Form formType="Login" fields={fields} formAction={login} />
        </div>
    );
}
