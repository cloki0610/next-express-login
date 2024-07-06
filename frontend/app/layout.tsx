import { Inter } from "next/font/google";
import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/navbar/Navbar";
import Notification from "./components/ui/Notification";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Keep Industry Working",
    description: "A sample landing page with login feature.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>
                    <Navbar />
                    {/* <Notification /> */}
                    <main className="min-h-screen w-full">{children}</main>
                </StoreProvider>
            </body>
        </html>
    );
}
