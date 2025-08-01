import { Header } from "@/components/Header";
import { Receipt, MessageSquare, Bell, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const quickActions = [
    {
      title: "Solicitar Reembolso",
      description: "Submeter nova solicitação de reembolso",
      icon: Receipt,
      href: "/reembolso",
      color: "bg-blue-500",
    },
    {
      title: "Configurar OOO",
      description: "Definir período de ausência",
      icon: MessageSquare,
      href: "/ooo",
      color: "bg-green-500",
    },
    {
      title: "Ver Notícias",
      description: "Últimas notícias da empresa",
      icon: Bell,
      href: "/noticias",
      color: "bg-purple-500",
    },
    {
      title: "Calendário",
      description: "Visualizar reuniões e eventos",
      icon: Calendar,
      href: "/calendario",
      color: "bg-orange-500",
    },
  ];

  const stats = [
    { label: "Reembolsos Pendentes", value: "3", icon: Clock },
    { label: "Mensagens Não Lidas", value: "7", icon: MessageSquare },
    { label: "Reuniões Hoje", value: "2", icon: Calendar },
    { label: "Notícias Recentes", value: "5", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo ao Portal
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie suas solicitações e acompanhe as novidades da empresa
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center mb-4">
                      <div className={`${action.color} p-2 rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Atividade Recente
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Receipt className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Reembolso aprovado
                  </p>
                  <p className="text-sm text-gray-500">
                    Sua solicitação de reembolso foi aprovada
                  </p>
                </div>
                <span className="text-sm text-gray-400">2h atrás</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nova notícia publicada
                  </p>
                  <p className="text-sm text-gray-500">
                    Confira as últimas atualizações da empresa
                  </p>
                </div>
                <span className="text-sm text-gray-400">4h atrás</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Reunião agendada
                  </p>
                  <p className="text-sm text-gray-500">
                    Reunião de equipe amanhã às 10h
                  </p>
                </div>
                <span className="text-sm text-gray-400">1 dia atrás</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
