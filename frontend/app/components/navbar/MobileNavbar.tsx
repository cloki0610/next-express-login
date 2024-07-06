"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useAppSelector } from "@/lib/store";
import LogoutButton from "./LogoutButton";

interface MenuItem {
    title: string;
    path: string;
}

const MobileNavbar = ({
    open,
    menuItems,
}: {
    open: boolean;
    menuItems: MenuItem[];
}) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    return (
        <div className={`md:hidden ${open ? "block" : "hidden"}`}>
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 list-none">
                <li className="mt-3 space-x-1 flex">
                    {!isAuth && (
                        <Button
                            href="/login"
                            className="block w-full text-left text-base"
                            link
                        >
                            Login
                        </Button>
                    )}
                    {isAuth && <LogoutButton />}
                </li>
                {menuItems.map((item, idx) => (
                    <li key={idx}>
                        <Link
                            href={item.path}
                            className="block text-gray-900 hover:opacity-80 px-3 py-2 rounded-md text-base font-medium transition delay-100"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MobileNavbar;
