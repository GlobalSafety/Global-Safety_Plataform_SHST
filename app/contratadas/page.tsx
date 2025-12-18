"use client";

type Contratada = {
  id: string;
  nome: string;
};

const contratadas: Contratada[] = [
  { id: "1", nome: "Empresa Alfa" },
  { id: "2", nome: "Empresa Beta" },
];

export default function ContratadasPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Empresas Contratadas</h1>

      <ul className="space-y-2">
        {contratadas.map((empresa) => (
          <li
            key={empresa.id}
            className="p-3 border rounded"
          >
            {empresa.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
