import { FormField } from "./Form";

interface FormItemProps {
    field: FormField;
}

const FormItem = ({ field }: FormItemProps) => {
    return (
        <div className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            <label htmlFor={field.name}>{field.label}</label>
            <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
            />
        </div>
    );
};

export default FormItem;
