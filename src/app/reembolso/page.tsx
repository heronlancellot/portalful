"use client";

import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Receipt, Upload, Plus, Trash2 } from "lucide-react";

const reembolsoSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  valor: z.string().min(1, "Valor é obrigatório"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  data: z.string().min(1, "Data é obrigatória"),
  anexos: z.array(z.any()).optional(),
});

type ReembolsoForm = z.infer<typeof reembolsoSchema>;

export default function ReembolsoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anexos, setAnexos] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReembolsoForm>({
    resolver: zodResolver(reembolsoSchema),
  });

  const onSubmit = async (data: ReembolsoForm) => {
    setIsSubmitting(true);
    try {
      // Simular envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Reembolso enviado com sucesso!");
      reset();
      setAnexos([]);
    } catch (error) {
      alert("Erro ao enviar reembolso");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAnexos([...anexos, ...files]);
  };

  const removeFile = (index: number) => {
    setAnexos(anexos.filter((_, i) => i !== index));
  };

  const categorias = [
    "Alimentação",
    "Transporte",
    "Hospedagem",
    "Material de Escritório",
    "Treinamento",
    "Outros",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Receipt className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Solicitar Reembolso
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              Preencha o formulário abaixo para solicitar seu reembolso
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Título */}
            <div>
              <label
                htmlFor="titulo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Título da Solicitação *
              </label>
              <input
                type="text"
                id="titulo"
                {...register("titulo")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Reembolso de almoço com cliente"
              />
              {errors.titulo && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.titulo.message}
                </p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descrição *
              </label>
              <textarea
                id="descricao"
                {...register("descricao")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva detalhadamente o motivo do reembolso..."
              />
              {errors.descricao && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.descricao.message}
                </p>
              )}
            </div>

            {/* Valor e Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="valor"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  id="valor"
                  step="0.01"
                  {...register("valor")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0,00"
                />
                {errors.valor && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.valor.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="categoria"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Categoria *
                </label>
                <select
                  id="categoria"
                  {...register("categoria")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                {errors.categoria && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.categoria.message}
                  </p>
                )}
              </div>
            </div>

            {/* Data */}
            <div>
              <label
                htmlFor="data"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Data da Despesa *
              </label>
              <input
                type="date"
                id="data"
                {...register("data")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.data && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.data.message}
                </p>
              )}
            </div>

            {/* Anexos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anexos (Comprovantes)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Clique para fazer upload
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, PDF até 10MB
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              {/* Lista de arquivos */}
              {anexos.length > 0 && (
                <div className="mt-4 space-y-2">
                  {anexos.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                    >
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => reset()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Limpar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
