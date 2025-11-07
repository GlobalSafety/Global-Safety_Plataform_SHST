import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function middleware(req: NextRequest & { nextauth: any }) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Verificar se o utilizador tem permissão para aceder à rota
    // Rotas protegidas por role
    const adminRoutes = ["/admin"];
    const technicianRoutes = ["/dashboard", "/conformidade", "/pss", "/contratadas", "/biblioteca", "/perfil"];
    const companyRoutes = ["/dashboard", "/conformidade", "/pss", "/contratadas", "/biblioteca", "/perfil"];

    // Se o utilizador não está autenticado, redirecionar para login
    if (!token) {
      return Response.redirect(new URL("/login", req.url));
    }

    // Verificar permissões por role
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (token.role !== "ADMIN") {
        return Response.redirect(new URL("/dashboard", req.url));
      }
    }

    return null;
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

// Configurar as rotas que devem ser protegidas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/conformidade/:path*",
    "/pss/:path*",
    "/contratadas/:path*",
    "/biblioteca/:path*",
    "/perfil/:path*",
    "/admin/:path*",
  ],
};
