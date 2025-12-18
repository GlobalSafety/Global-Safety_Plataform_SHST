import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Credentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials?: Credentials) {
        if (!credentials) return null;

        if (
          credentials.email === "admin@globalsafety.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Administrador",
            email: credentials.email,
            role: "Admin",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
