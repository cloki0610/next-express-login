import Link from "next/link";

interface ButtonProps {
    link?: boolean;
    type?: "submit" | "button" | "reset" | undefined;
    href?: string;
    className?: string;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
    children: JSX.Element | JSX.Element[] | string | string[];
}

const Button = ({
    link = false,
    className,
    type,
    href,
    onClick,
    disabled,
    children,
}: ButtonProps) => {
    let style =
        "bg-gray-900 text-white px-3 py-2 rounded-md font-medium hover:opacity-80 transition delay-100";
    style += className;
    if (link && href) {
        return (
            <Link href={href} className={style}>
                {children}
            </Link>
        );
    } else {
        return (
            <button
                onClick={() => onClick}
                type={type}
                disabled={disabled}
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition delay-100"
            >
                {children}
            </button>
        );
    }
};

export default Button;
