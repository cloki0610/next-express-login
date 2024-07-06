import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("username")?.value;

    // If user is not logged in then redirect to the login page.
    if (!currentUser && request.nextUrl.pathname.startsWith("/user")) {
        return Response.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
