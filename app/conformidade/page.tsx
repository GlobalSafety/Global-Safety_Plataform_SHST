 "use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";

interface ComplianceItem {
  id: string;
  requirement: string;
  description: string;
  status: "Conforme" | "Não Conforme" | "Em Progresso";
  evidence?: string;
  evidenceFile?: File;
  dueDate: string;
  responsible?: string;
  lastUpdated?: string;
}

interface FormData {
  requirement: string;
  description: string;
  status: "Conforme" | "Não Conforme" | "Em Progresso";
  evidence: string;
  dueDate: string;
  responsible: string;
}

export default function ConformidadePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [items, setItems] = useState<ComplianceItem[]>([
    {
      id: "1",
      requirement: "ASO - Avaliação de Saúde Ocupacional",
      description: "Todos os trabalhadores devem ter ASO atualizado",
      status: "Conforme",
      evidence: "ASO_2025.pdf",
      dueDate: "2025-12-31",
      responsible: "Técnico SHST",
      lastUpdated: "2025-10-26",
    },
    {
      id: "2",
      requirement: "Formação em Segurança",
      description: "Formação inicial e contínua em segurança",
      status: "Em Progresso",
      dueDate: "2025-11-30",
      responsible: "Gestor de Projeto",
      lastUpdated: "2025-10-20",
    },
    {
      id: "3",
      requirement: "EPIs - Equipamentos de Proteção Individual",
      description: "Fornecimento e manutenção de EPIs",
      status: "Não Conforme",
      dueDate: "2025-10-31",
      responsible: "Contratada",
      lastUpdated: "2025-10-15",
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('conformidade-items');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('conformidade-items', JSON.stringify(items));
  }, [items]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({  
    requirement: "",
    description: "",
    status: "Em Progresso",
    evidence: "",
    dueDate: "",
    responsible: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center py-10">A carregar...</div>;
  }

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      requirement: "",
      description: "",
      status: "Em Progresso",
      evidence: "",
      dueDate: "",
      responsible: "",
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleEdit = (item: ComplianceItem) => {
    setEditingId(item.id);
    setFormData({
      requirement: item.requirement,
      description: item.description,
      status: item.status,
      evidence: item.evidence || "",
      dueDate: item.dueDate,
      responsible: item.responsible || "",
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFormData({ ...formData, evidence: file.name });
  };

  const handleSave = () => {
    if (!formData.requirement || !formData.dueDate) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (editingId) {
      setItems(
        items.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
                evidenceFile: selectedFile || undefined,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          ...formData,
          evidenceFile: selectedFile || undefined,
          lastUpdated: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Conforme":
        return "bg-green-100 text-green-800";
      case "Não Conforme":
        return "bg-red-100 text-red-800";
      case "Em Progresso":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Matriz de Conformidade</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestão de requisitos de conformidade e segurança
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Adicionar Requisito
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.requirement}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Prazo:</span>
                      <span className="ml-2 text-gray-900">{item.dueDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Responsável:</span>
                      <span className="ml-2 text-gray-900">{item.responsible}</span>
                    </div>
                    {item.evidence && (
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">Evidência:</span>
                        <span className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                          {item.evidence}
                        </span>
                      </div>
                    )}
                    {item.lastUpdated && (
                      <div>
                        <span className="font-medium text-gray-700">Atualizado:</span>
                        <span className="ml-2 text-gray-900">{item.lastUpdated}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {editingId ? "Editar Requisito" : "Adicionar Requisito"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requisito *
                    </label>
                    <input
                      type="text"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="Ex: ASO - Avaliação de Saúde Ocupacional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="Descrição detalhada do requisito"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    >
                      <option>Conforme</option>
                      <option>Em Progresso</option>
                      <option>Não Conforme</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsável
                      </label>
                      <input
                        type="text"
                        value={formData.responsible}
                        onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Ex: Técnico SHST"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prazo *
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Evidência/Documento
                    </label>
                    <FileUpload onFileSelect={handleFileSelect} />
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        Arquivo selecionado: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}