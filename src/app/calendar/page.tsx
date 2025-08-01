"use client";

import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
  attendees?: string[];
  isAllDay: boolean;
  color: string;
}

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<"month" | "week" | "day">("month");

  // Dados mockados de eventos
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Reunião de Equipe",
      description: "Reunião semanal para alinhamento de projetos",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      location: "Sala de Reuniões A",
      attendees: ["João Silva", "Maria Santos", "Pedro Costa"],
      isAllDay: false,
      color: "blue",
    },
    {
      id: "2",
      title: "Apresentação de Projeto",
      description: "Apresentação do novo projeto para o cliente",
      start: new Date(2024, 0, 16, 14, 0),
      end: new Date(2024, 0, 16, 15, 30),
      location: "Auditório Principal",
      attendees: ["Ana Oliveira", "Carlos Lima"],
      isAllDay: false,
      color: "green",
    },
    {
      id: "3",
      title: "Treinamento de Segurança",
      description: "Treinamento obrigatório sobre segurança no trabalho",
      start: new Date(2024, 0, 17, 9, 0),
      end: new Date(2024, 0, 17, 12, 0),
      location: "Sala de Treinamento",
      attendees: ["Todos os funcionários"],
      isAllDay: false,
      color: "red",
    },
    {
      id: "4",
      title: "Férias Coletivas",
      description: "Período de férias coletivas da empresa",
      start: new Date(2024, 0, 20),
      end: new Date(2024, 0, 20),
      isAllDay: true,
      color: "purple",
    },
  ];

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Adicionar dias do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Adicionar dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    // Adicionar dias do próximo mês para completar a grade
    const remainingDays = 42 - days.length; // 6 semanas * 7 dias
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Calendário</h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Navegação */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentDate.toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Botão Hoje */}
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  Hoje
                </button>

                {/* Botão Novo Evento */}
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Novo Evento</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visualizações */}
          <div className="px-6 py-3 border-b border-gray-200">
            <div className="flex space-x-1">
              {[
                { key: "month", label: "Mês" },
                { key: "week", label: "Semana" },
                { key: "day", label: "Dia" },
              ].map((v) => (
                <button
                  key={v.key}
                  onClick={() => setView(v.key as any)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    view === v.key
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendário */}
        <div className="bg-white rounded-lg shadow">
          {/* Cabeçalho dos dias da semana */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div
                key={day}
                className="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 text-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grade do calendário */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isToday =
                day.date.toDateString() === new Date().toDateString();
              const isSelected =
                selectedDate?.toDateString() === day.date.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`min-h-[120px] bg-white p-2 cursor-pointer hover:bg-gray-50 ${
                    isToday ? "bg-blue-50" : ""
                  } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        day.isCurrentMonth
                          ? isToday
                            ? "text-blue-600"
                            : "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {dayEvents.length} evento
                        {dayEvents.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Eventos do dia */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${
                          event.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : event.color === "green"
                            ? "bg-green-100 text-green-800"
                            : event.color === "red"
                            ? "bg-red-100 text-red-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                        title={event.title}
                      >
                        {event.isAllDay
                          ? event.title
                          : `${formatTime(event.start)} ${event.title}`}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Painel lateral com eventos do dia selecionado */}
        {selectedDate && (
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Eventos de {formatDate(selectedDate)}
              </h3>
            </div>
            <div className="p-6">
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {event.description}
                          </p>

                          <div className="space-y-1">
                            {!event.isAllDay && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-2" />
                                {formatTime(event.start)} -{" "}
                                {formatTime(event.end)}
                              </div>
                            )}

                            {event.location && (
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-2" />
                                {event.location}
                              </div>
                            )}

                            {event.attendees && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Users className="h-4 w-4 mr-2" />
                                {event.attendees.join(", ")}
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={`w-3 h-3 rounded-full ml-4 ${
                            event.color === "blue"
                              ? "bg-blue-500"
                              : event.color === "green"
                              ? "bg-green-500"
                              : event.color === "red"
                              ? "bg-red-500"
                              : "bg-purple-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Nenhum evento
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Não há eventos agendados para este dia
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
