// app/auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  pages: {
    signIn: '/login', // 自定义登录页
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn; // 登录才允许访问 /dashboard
      } else if (isLoggedIn) {
        // 已登录访问其他页面，重定向到 dashboard
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }

      return true; // 其他情况允许访问
    },
  },
  providers: [], // 注意：最终在 auth.ts 会被 Credentials 覆盖
} satisfies NextAuthConfig;
