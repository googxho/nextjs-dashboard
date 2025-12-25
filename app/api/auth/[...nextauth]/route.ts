// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import type { User } from "@/app/lib/definitions";
import { authConfig } from "@/app/auth.config";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function getUser(email: string): Promise<User | null> {
  const users = await sql<User[]>`
    SELECT id, email, password
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;
  return users[0] ?? null;
}

const handler = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        // ⚠️ 必须返回「干净对象」
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
