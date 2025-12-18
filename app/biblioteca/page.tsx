"use client";

type Documento = {
  id: string;
  titulo: string;
};

const documentos: Documento[] = [
  { id: "1", titulo: "Plano de Segurança" },
  { id: "2", titulo: "Relatório de Inspeção" },
];

export default function BibliotecaPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Biblioteca SHST</h1>

      <ul className="space-y-2">
        {documentos.map((doc) => (
          <li
            key={doc.id}
            className="p-3 border rounded hover:bg-gray-50"
          >
            {doc.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
}
