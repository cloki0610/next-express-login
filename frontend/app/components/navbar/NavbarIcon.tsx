"use client";
const NavbarIcon = ({ open }: { open: boolean }) => {
    return (
        <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                className={open ? "hidden" : "inline-flex"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
            />
            <path
                className={open ? "inline-flex" : "hidden"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
};

export default NavbarIcon;
