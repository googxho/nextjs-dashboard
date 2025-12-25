import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  // Secret used by Auth.js/NextAuth for signing tokens. Prefer setting
  // NEXTAUTH_SECRET in environment for production.
  secret: process.env.AUTH_SECRET || 's3cr3t_xJkM2s9fPqL1vZ0aH8',
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
