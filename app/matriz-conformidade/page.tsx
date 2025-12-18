"use client";

import { useMemo } from "react";

type Requisito = {
  id: string;
  nome: string;
  categoria: string;
};

const requisitos: Requisito[] = [
  { id: "1", nome: "Uso de EPI", categoria: "Segurança" },
  { id: "2", nome: "Formação SHST", categoria: "Formação" },
];

export default function MatrizConformidadePage() {
  const filtros = { categoria: "Segurança" };

  const requisitosFiltrados = useMemo(() => {
    return requisitos.filter(
      (req) => req.categoria === filtros.categoria
    );
  }, [filtros]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Matriz de Conformidade
      </h1>

      <ul className="space-y-2">
        {requisitosFiltrados.map((req) => (
          <li key={req.id} className="p-3 border rounded">
            {req.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
