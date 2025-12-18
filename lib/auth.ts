// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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

        // Login de teste - SUBSTITUIR por validação real no banco
        if (
          credentials.email === "admin@globalsafety.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Administrador",
            email: credentials.email,
            image: null,
            role: "Admin",
          };
        }

        if (
          credentials.email === "user@globalsafety.com" &&
          credentials.password === "user123"
        ) {
          return {
            id: "2",
            name: "Usuário",
            email: credentials.email,
            image: null,
            role: "User",
          };
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
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};