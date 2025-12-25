import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // ✅ 必须放行 auth API（否则 callback 必炸）
      if (nextUrl.pathname.startsWith("/api/auth")) {
        return true;
      }

      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isDashboard) {
        return isLoggedIn;
      }

      if (isLoggedIn) {
        return NextResponse.redirect(
          new URL("/dashboard", nextUrl)
        );
      }

      return true;
    },
  },
  providers: [],
};
