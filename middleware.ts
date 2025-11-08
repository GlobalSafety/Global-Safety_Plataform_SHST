import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Redireciona para dashboard se tentar acessar login ja autenticado
    if (pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // RBAC - Admin only para rotas /admin
    if (
      pathname.startsWith("/admin") &&
      token?.role !== "Admin"
    ) {
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/conformidade/:path*",
    "/matriz-conformidade/:path*",
    "/pss/:path*",
    "/contratadas/:path*",
    "/biblioteca/:path*",
    "/perfil/:path*",
    "/admin/:path*",
    "/login",
  ],
};