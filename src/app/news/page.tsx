"use client";

import { Header } from "@/components/Header";
import { useState } from "react";
import {
  Bell,
  Calendar,
  Tag,
  Search,
  Filter,
  Bookmark,
  Share2,
} from "lucide-react";

interface News {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  isImportant: boolean;
  isRead: boolean;
  tags: string[];
}

export default function NoticiasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [showOnlyImportant, setShowOnlyImportant] = useState(false);

  const news: News[] = [
    {
      id: "1",
      title: "Nova Política de Trabalho Remoto",
      content:
        "A partir do próximo mês, implementaremos uma nova política de trabalho remoto que permitirá aos funcionários trabalhar de casa até 3 dias por semana. Esta mudança visa melhorar o equilíbrio entre vida pessoal e profissional.",
      category: "Políticas",
      author: "Recursos Humanos",
      date: "2024-01-15",
      isImportant: true,
      isRead: false,
      tags: ["trabalho remoto", "política", "benefícios"],
    },
    {
      id: "2",
      title: "Resultados do Trimestre - Crescimento de 25%",
      content:
        "Temos o prazer de anunciar que nossa empresa alcançou um crescimento de 25% no último trimestre. Este resultado é fruto do trabalho dedicado de toda a equipe e da confiança de nossos clientes.",
      category: "Resultados",
      author: "Diretoria",
      date: "2024-01-10",
      isImportant: true,
      isRead: true,
      tags: ["resultados", "crescimento", "sucesso"],
    },
    {
      id: "3",
      title: "Novo Sistema de Gestão de Projetos",
      content:
        "Estamos implementando um novo sistema de gestão de projetos que irá melhorar significativamente nossa produtividade e comunicação entre equipes. Treinamentos serão oferecidos na próxima semana.",
      category: "Tecnologia",
      author: "TI",
      date: "2024-01-08",
      isImportant: false,
      isRead: false,
      tags: ["sistema", "produtividade", "treinamento"],
    },
    {
      id: "4",
      title: "Evento de Confraternização - Janeiro 2024",
      content:
        "No próximo sábado, dia 20 de janeiro, realizaremos nosso evento anual de confraternização. O evento será realizado no Espaço Eventos Central, a partir das 19h. Todos os funcionários estão convidados!",
      category: "Eventos",
      author: "Comunicação",
      date: "2024-01-05",
      isImportant: false,
      isRead: true,
      tags: ["evento", "confraternização", "social"],
    },
    {
      id: "5",
      title: "Atualização do Plano de Saúde",
      content:
        "Informamos que nosso plano de saúde foi atualizado com novas coberturas e benefícios. A partir de fevereiro, todos os funcionários terão acesso a consultas online e cobertura odontológica ampliada.",
      category: "Benefícios",
      author: "Recursos Humanos",
      date: "2024-01-03",
      isImportant: false,
      isRead: false,
      tags: ["saúde", "benefícios", "plano"],
    },
  ];

  const categories = [
    "Todas",
    "Políticas",
    "Resultados",
    "Tecnologia",
    "Eventos",
    "Benefícios",
  ];

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || item.category === selectedCategory;
    const matchesImportant = !showOnlyImportant || item.isImportant;

    return matchesSearch && matchesCategory && matchesImportant;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Notícias da Empresa
            </h1>
          </div>
          <p className="text-gray-600">
            Fique por dentro das últimas novidades, políticas e eventos da
            empresa
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categoria */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Filtro Importante */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={showOnlyImportant}
                  onChange={(e) => setShowOnlyImportant(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="important"
                  className="ml-2 text-sm text-gray-700"
                >
                  Apenas importantes
                </label>
              </div>

              {/* Contador */}
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-600">
                  {filteredNews.length} notícia
                  {filteredNews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Notícias */}
        <div className="space-y-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow p-6 ${
                !item.isRead ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h2>
                    {item.isImportant && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Importante
                      </span>
                    )}
                    {!item.isRead && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Nova
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span>{item.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <span>Por: {item.author}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    {item.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma notícia encontrada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
