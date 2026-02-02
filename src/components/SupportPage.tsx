import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { mockTickets, mockOrder } from "../data/mockData";
import {
  MessageSquare,
  Mail,
  AlertCircle,
  Send,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface SupportPageProps {
  onNavigate: (view: string) => void;
}

export function SupportPage({ onNavigate }: SupportPageProps) {
  const [activeTab, setActiveTab] = useState("tickets");
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
  const [returnReason, setReturnReason] = useState("");
  const [returnStatus, setReturnStatus] = useState<
    "idle" | "validating" | "approved"
  >("idle");

  const validationSteps = [
    {
      step: 1,
      label: "Solicitud recibida",
      completed: returnStatus !== "idle",
    },
    {
      step: 2,
      label: "Revisión de productos",
      completed: returnStatus === "approved" || returnStatus === "validating",
    },
    {
      step: 3,
      label: "Verificación de condiciones",
      completed: returnStatus === "approved",
    },
    {
      step: 4,
      label: "Aprobación final",
      completed: returnStatus === "approved",
    },
  ];

  const handleCreateTicket = () => {
    if (!selectedChannel) {
      toast.error("Por favor selecciona un canal de contacto");
      return;
    }
    if (!newTicket.subject || !newTicket.message) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    toast.success("Ticket creado exitosamente", {
      description: "Nos pondremos en contacto contigo pronto",
    });
    setNewTicket({ subject: "", message: "" });
    setSelectedChannel("");
  };

  const handleRequestReturn = () => {
    if (!returnReason) {
      toast.error("Por favor indica el motivo de la devolución");
      return;
    }

    setReturnStatus("validating");
    toast.success("Solicitud de devolución recibida", {
      description: "Estamos validando tu solicitud",
    });

    setTimeout(() => {
      setReturnStatus("approved");
      toast.success("Solicitud aprobada", {
        description: "Tu devolución ha sido aprobada",
      });
    }, 3000);
  };

  const handleProcessRefund = () => {
    toast.success("Reembolso procesado", {
      description: "El dinero será devuelto en 3-5 días hábiles",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          {/* Botón para volver (usa onNavigate) */}
          <button
            onClick={() => onNavigate("tracking")}
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>

          <h1 className="text-4xl mb-4">Centro de Soporte</h1>
          <p className="text-gray-600 text-lg">
            Estamos aquí para ayudarte con tu pedido #{mockOrder.id}
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid h-auto p-1 bg-gray-100 rounded-xl">
            <TabsTrigger
              value="tickets"
              className="px-8 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Tickets de Soporte
            </TabsTrigger>
            <TabsTrigger
              value="returns"
              className="px-8 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Devoluciones
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-8">
            {/* Create New Ticket */}
            <Card className="p-8 rounded-2xl border border-gray-100">
              <h2 className="text-2xl mb-6">Crear Nuevo Ticket</h2>

              <div className="space-y-6">
                {/* Channel Selection */}
                <div>
                  <Label className="mb-3 block">
                    Selecciona el canal de contacto
                  </Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setSelectedChannel("chat")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        selectedChannel === "chat"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <MessageSquare
                        className={`w-8 h-8 mx-auto mb-3 ${
                          selectedChannel === "chat"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                      <p>Chat en Vivo</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Respuesta inmediata
                      </p>
                    </button>

                    <button
                      onClick={() => setSelectedChannel("email")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        selectedChannel === "email"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Mail
                        className={`w-8 h-8 mx-auto mb-3 ${
                          selectedChannel === "email"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                      <p>Correo</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Respuesta en 24h
                      </p>
                    </button>

                    <button
                      onClick={() => setSelectedChannel("complaint")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        selectedChannel === "complaint"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <AlertCircle
                        className={`w-8 h-8 mx-auto mb-3 ${
                          selectedChannel === "complaint"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      />
                      <p>Reclamo</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Prioridad alta
                      </p>
                    </button>
                  </div>
                </div>

                {/* Ticket Form */}
                <div>
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    value={newTicket.subject}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, subject: e.target.value })
                    }
                    placeholder="Describe brevemente tu consulta"
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    value={newTicket.message}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, message: e.target.value })
                    }
                    placeholder="Describe tu consulta en detalle..."
                    className="mt-2 min-h-32 rounded-xl"
                  />
                </div>

                <button
                  onClick={handleCreateTicket}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar Ticket
                </button>
              </div>
            </Card>

            {/* Previous Tickets */}
            <div>
              <h3 className="text-2xl mb-6">Tickets Anteriores</h3>

              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4>{ticket.subject}</h4>
                          <Badge
                            className={`${
                              ticket.status === "resolved"
                                ? "bg-green-100 text-green-800 border-green-300"
                                : "bg-orange-100 text-orange-800 border-orange-300"
                            }`}
                          >
                            {ticket.status === "resolved"
                              ? "Resuelto"
                              : "Abierto"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Ticket #{ticket.id} • Canal:{" "}
                          {ticket.channel === "chat"
                            ? "Chat"
                            : ticket.channel === "email"
                              ? "Correo"
                              : "Reclamo"}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {ticket.createdAt.toLocaleDateString("es-EC", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                      {ticket.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-xl ${
                            msg.sender === "customer"
                              ? "bg-blue-50 ml-8"
                              : "bg-gray-50 mr-8"
                          }`}
                        >
                          <p className="text-sm text-gray-800">{msg.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {msg.sender === "customer" ? "Tú" : "Soporte"} •{" "}
                            {msg.timestamp.toLocaleTimeString("es-EC", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Returns Tab */}
          <TabsContent value="returns" className="space-y-8">
            {/* Return Policy */}
            <Card className="p-8 rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-blue-900 mb-2">
                    Política de Devolución de 7 Días
                  </h3>
                  <p className="text-blue-800 mb-4">
                    Puedes devolver cualquier producto dentro de los 7 días
                    posteriores a la entrega, siempre que esté en perfectas
                    condiciones y con las etiquetas originales.
                  </p>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Producto sin usar y en su empaque original
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Etiquetas y accesorios incluidos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Reembolso completo o cambio por otro producto
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Return Request Form */}
            <Card className="p-8 rounded-2xl border border-gray-100">
              <h2 className="text-2xl mb-6">Solicitar Devolución</h2>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h4 className="mb-4">Pedido #{mockOrder.id}</h4>
                  <div className="space-y-3">
                    {mockOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p>{item.product.name}</p>
                          <p className="text-sm text-gray-600">
                            Talla: {item.size}
                          </p>
                        </div>
                        <p className="text-pink-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Return Reason */}
                <div>
                  <Label htmlFor="returnReason">
                    Motivo de la devolución *
                  </Label>
                  <Textarea
                    id="returnReason"
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    placeholder="Por favor explica el motivo de tu devolución..."
                    className="mt-2 min-h-32 rounded-xl"
                    disabled={returnStatus !== "idle"}
                  />
                </div>

                {/* Validation Steps */}
                {returnStatus !== "idle" && (
                  <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                    <h4 className="text-purple-900 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Proceso de Validación
                    </h4>
                    <div className="space-y-3">
                      {validationSteps.map((step) => (
                        <div
                          key={step.step}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            step.completed ? "bg-green-100" : "bg-white"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm ${step.completed ? "text-green-900" : "text-gray-700"}`}
                            >
                              Paso {step.step}: {step.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {returnStatus === "idle" && (
                  <button
                    onClick={handleRequestReturn}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Solicitar Devolución
                  </button>
                )}

                {returnStatus === "validating" && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100 text-purple-800 rounded-xl">
                      <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      Validando solicitud...
                    </div>
                  </div>
                )}

                {returnStatus === "approved" && (
                  <div className="space-y-4">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <h4 className="text-green-900">Solicitud Aprobada</h4>
                      </div>
                      <p className="text-green-800 text-sm">
                        Tu solicitud de devolución ha sido aprobada. Procede con
                        el reembolso para completar el proceso.
                      </p>
                    </div>

                    <button
                      onClick={handleProcessRefund}
                      className="w-full py-4 bg-black text-white rounded-xl hover:bg-gray-900 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Procesar Reembolso
                    </button>

                    <button
                      onClick={() => {
                        setReturnStatus("idle");
                        setReturnReason("");
                      }}
                      className="w-full py-4 bg-white border border-gray-200 text-gray-900 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Nueva Solicitud
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
