import Form from "../components/ui/Form";
import { register } from "@/lib/actions";

export default function Register() {
    const fields = [
        { label: "Your username", name: "username", type: "text" },
        { label: "Your e-mail", name: "email", type: "email" },
        { label: "Your password", name: "password", type: "password" },
        { label: "Repeat password", name: "repeatpassword", type: "password" },
        { label: "Address 1", name: "address1", type: "text" },
        { label: "Address 2", name: "address2", type: "text" },
        { label: "Postcode", name: "postcode", type: "text" },
    ];
    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-orange-600 py-5">
            <Form formType="Register" fields={fields} formAction={register} />
        </div>
    );
}
