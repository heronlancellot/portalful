"use client";

import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const oooSchema = z.object({
  ativo: z.boolean(),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
  motivo: z.string().min(1, "Motivo é obrigatório"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  contatoEmergencia: z.string().optional(),
});

type OOOForm = z.infer<typeof oooSchema>;

export default function OOOPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({
    ativo: false,
    dataInicio: "",
    dataFim: "",
    motivo: "",
    mensagem: "",
    contatoEmergencia: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OOOForm>({
    resolver: zodResolver(oooSchema),
    defaultValues: {
      ativo: false,
      dataInicio: "",
      dataFim: "",
      motivo: "",
      mensagem: "",
      contatoEmergencia: "",
    },
  });

  const isActive = watch("ativo");

  const onSubmit = async (data: OOOForm) => {
    setIsSubmitting(true);
    try {
      // Simular envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStatus(data);
      alert(
        data.ativo
          ? "Status OOO ativado com sucesso!"
          : "Status OOO desativado com sucesso!"
      );
    } catch (error) {
      alert("Erro ao atualizar status OOO");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = () => {
    setValue("ativo", !isActive);
  };

  const motivos = [
    "Férias",
    "Doença",
    "Viagem a negócios",
    "Treinamento",
    "Pessoal",
    "Outros",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Atual */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Status OOO</h1>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Status Atual:</span>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentStatus.ativo
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {currentStatus.ativo ? "OOO Ativo" : "Disponível"}
                </div>
              </div>
            </div>
          </div>

          {currentStatus.ativo && (
            <div className="p-6 bg-red-50 border-l-4 border-red-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Status OOO Ativo
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      <strong>Período:</strong> {currentStatus.dataInicio} até{" "}
                      {currentStatus.dataFim}
                    </p>
                    <p>
                      <strong>Motivo:</strong> {currentStatus.motivo}
                    </p>
                    <p>
                      <strong>Mensagem:</strong> {currentStatus.mensagem}
                    </p>
                    {currentStatus.contatoEmergencia && (
                      <p>
                        <strong>Contato de Emergência:</strong>{" "}
                        {currentStatus.contatoEmergencia}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Configuração */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Configurar Status OOO
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Toggle Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Ativar Status OOO
                </h3>
                <p className="text-sm text-gray-600">
                  Quando ativado, você aparecerá como indisponível para colegas
                </p>
              </div>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isActive ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {isActive && (
              <>
                {/* Datas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="dataInicio"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Data de Início *
                    </label>
                    <input
                      type="date"
                      id="dataInicio"
                      {...register("dataInicio")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.dataInicio && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.dataInicio.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dataFim"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Data de Fim *
                    </label>
                    <input
                      type="date"
                      id="dataFim"
                      {...register("dataFim")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.dataFim && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.dataFim.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Motivo */}
                <div>
                  <label
                    htmlFor="motivo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Motivo *
                  </label>
                  <select
                    id="motivo"
                    {...register("motivo")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um motivo</option>
                    {motivos.map((motivo) => (
                      <option key={motivo} value={motivo}>
                        {motivo}
                      </option>
                    ))}
                  </select>
                  {errors.motivo && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.motivo.message}
                    </p>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mensagem para Colegas *
                  </label>
                  <textarea
                    id="mensagem"
                    {...register("mensagem")}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Estarei ausente por férias. Para assuntos urgentes, entre em contato com..."
                  />
                  {errors.mensagem && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.mensagem.message}
                    </p>
                  )}
                </div>

                {/* Contato de Emergência */}
                <div>
                  <label
                    htmlFor="contatoEmergencia"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contato de Emergência (Opcional)
                  </label>
                  <input
                    type="text"
                    id="contatoEmergencia"
                    {...register("contatoEmergencia")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome e contato de quem pode ajudar em emergências"
                  />
                </div>
              </>
            )}

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Salvando..."
                  : isActive
                  ? "Ativar OOO"
                  : "Desativar OOO"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
