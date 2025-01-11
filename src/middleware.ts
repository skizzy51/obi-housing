// export { default } from "next-auth/middleware"

import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default async function middleware(req: NextRequestWithAuth) {
    // NextAuth middleware logic
    const response = await withAuth(req)

    return response
}

export const config = { matcher: ["/dashboard", "/sell/:path*"] }
