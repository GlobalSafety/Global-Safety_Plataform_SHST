"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function PerfilPage() {
  const { data: session } = useSession();

  const formData = useMemo(() => {
    if (!session?.user) return null;
    return {
      name: session.user.name ?? "",
      email: session.user.email ?? "",
    };
  }, [session]);

  if (!formData) {
    return <p className="p-6">Carregando perfil...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Meu Perfil</h1>

      <p><strong>Nome:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
    </div>
  );
}
