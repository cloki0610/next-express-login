"use client";
import React, { useState } from "react";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import NavbarIcon from "./NavbarIcon";
import LogoutButton from "./LogoutButton";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { authActions } from "@/lib/features/auth";
import { redirect } from "next/navigation";
import { logout } from "@/lib/actions";

const Navbar = () => {
    const appDispatcher = useAppDispatch();
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const username = useAppSelector((state) => state.auth.username);
    const [open, setOpen] = useState(false);
    const logoutHandler = async (formData: FormData) => {
        "use server";
        await logout();
        appDispatcher(authActions.logout());
        redirect("/");
    };
    const menuItems = [
        { title: "Home", path: "/" },
        { title: "About", path: "/" },
    ];
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <ul className="flex items-center list-none">
                        <li className="flex-shrink-0 flex items-center">
                            <a
                                href="#"
                                className="text-3xl font-bold text-gray-900 hover:scale-125 transition delay-100"
                            >
                                <span className="text-orange-600">Keep</span>IW
                            </a>
                        </li>
                        <li className="hidden md:ml-6 md:flex md:space-x-8">
                            {menuItems.map((item, idx) => (
                                <Link
                                    href={item.path}
                                    key={idx}
                                    className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-md font-medium hover:opacity-80 transition delay-100"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </li>
                    </ul>
                    <div className="flex items-center">
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {!isAuth && (
                                <Button href="/login" link className="text-sm">
                                    Login
                                </Button>
                            )}
                            {isAuth && <LogoutButton />}
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() =>
                                    setOpen((prevState) => !prevState)
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:border-gray-700 focus:outline-none focus:border-gray-700"
                            >
                                <NavbarIcon open={open} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MobileNavbar open={open} menuItems={menuItems} />
        </nav>
    );
};

export default Navbar;
