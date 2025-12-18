import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type UserWithRole = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 🔐 EXEMPLO FIXO (trocar depois por BD)
        if (
          credentials.email === "admin@globalsafety.com" &&
          credentials.password === "admin123"
        ) {
          const user: UserWithRole = {
            id: "1",
            name: "Administrador",
            email: credentials.email,
            role: "Admin",
          };

          return user;
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as UserWithRole).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "Admin" | "User";
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
