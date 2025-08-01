"use client";

import { Header } from "@/components/Header";
import { useState } from "react";
import {
  MessageSquare,
  Send,
  Search,
  MoreVertical,
  User,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastMessage: string;
  unreadCount: number;
}

export default function MensagensPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const contacts: Contact[] = [
    {
      id: "1",
      name: "João Silva",
      avatar: "JS",
      status: "online",
      lastMessage: "Preciso falar sobre o projeto",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Maria Santos",
      avatar: "MS",
      status: "away",
      lastMessage: "Reunião confirmada para amanhã",
      unreadCount: 0,
    },
    {
      id: "3",
      name: "Pedro Costa",
      avatar: "PC",
      status: "offline",
      lastMessage: "Documento enviado",
      unreadCount: 1,
    },
    {
      id: "4",
      name: "Ana Oliveira",
      avatar: "AO",
      status: "online",
      lastMessage: "Obrigada pela ajuda!",
      unreadCount: 0,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "João Silva",
      content: "Olá! Preciso falar sobre o projeto que estamos desenvolvendo",
      timestamp: "10:30",
      isRead: true,
    },
    {
      id: "2",
      sender: "Você",
      content: "Claro! Qual é o assunto?",
      timestamp: "10:32",
      isRead: true,
    },
    {
      id: "3",
      sender: "João Silva",
      content: "Preciso de ajuda com a implementação da API",
      timestamp: "10:35",
      isRead: false,
    },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      // Aqui você implementaria a lógica para enviar a mensagem
      console.log("Enviando mensagem:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
            </div>
          </div>

          <div className="flex h-[600px]">
            {/* Lista de Contatos */}
            <div className="w-1/3 border-r border-gray-200">
              {/* Busca */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar contatos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Lista de Contatos */}
              <div className="overflow-y-auto h-full">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedContact?.id === contact.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                          {contact.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            contact.status === "online"
                              ? "bg-green-400"
                              : contact.status === "away"
                              ? "bg-yellow-400"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {contact.name}
                          </p>
                          {contact.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Área de Chat */}
            <div className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Header do Chat */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                            {selectedContact.avatar}
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${
                              selectedContact.status === "online"
                                ? "bg-green-400"
                                : selectedContact.status === "away"
                                ? "bg-yellow-400"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedContact.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedContact.status === "online"
                              ? "Online"
                              : selectedContact.status === "away"
                              ? "Ausente"
                              : "Offline"}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "Você"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === "Você"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "Você"
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input de Mensagem */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Selecione um contato
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Escolha um contato para iniciar uma conversa
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
