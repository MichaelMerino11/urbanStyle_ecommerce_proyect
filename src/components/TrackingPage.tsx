import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { mockOrder } from '../data/mockData';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Home,
  Search
} from 'lucide-react';

interface TrackingPageProps {
  onNavigate: (view: string) => void;
}

export function TrackingPage({ onNavigate }: TrackingPageProps) {
  const [trackingNumber, setTrackingNumber] = useState('URB-EC-873921-2026');
  const [showTracking, setShowTracking] = useState(true);

  const orderStatuses = [
    {
      status: 'created',
      label: 'Orden creada',
      icon: Package,
      completed: true,
      date: '28 Ene 2026, 10:30 AM',
      description: 'Tu pedido ha sido registrado exitosamente'
    },
    {
      status: 'payment_approved',
      label: 'Pago aprobado',
      icon: CheckCircle2,
      completed: true,
      date: '28 Ene 2026, 10:35 AM',
      description: 'El pago ha sido verificado y aprobado'
    },
    {
      status: 'preparing',
      label: 'En preparación',
      icon: Package,
      completed: true,
      date: '28 Ene 2026, 02:15 PM',
      description: 'Estamos preparando tu pedido para el envío'
    },
    {
      status: 'shipped',
      label: 'Enviado',
      icon: Truck,
      completed: true,
      date: '29 Ene 2026, 08:00 AM',
      description: 'Tu pedido está en camino'
    },
    {
      status: 'in_delivery',
      label: 'En reparto',
      icon: Truck,
      completed: true,
      date: '30 Ene 2026, 09:45 AM',
      description: 'El paquete está siendo entregado en tu zona',
      current: true
    },
    {
      status: 'delivered',
      label: 'Entregado',
      icon: Home,
      completed: false,
      date: 'Estimado: 31 Ene 2026',
      description: 'Recibirás tu pedido pronto'
    }
  ];

  const handleSearch = () => {
    if (trackingNumber.trim()) {
      setShowTracking(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl mb-4">
          Rastreo de Pedido
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Consulta el estado de tu envío en tiempo real
        </p>

        {/* Search Bar */}
        <Card className="p-6 rounded-2xl border border-gray-100 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Ingresa tu número de rastreo"
                className="h-14 rounded-xl text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Rastrear
            </button>
          </div>
        </Card>

        {showTracking && (
          <>
            {/* Order Info Card */}
            <Card className="p-8 rounded-2xl border border-gray-100 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-2">
                    Pedido #{mockOrder.id}
                  </h2>
                  <p className="text-gray-600">
                    {mockOrder.items.length} {mockOrder.items.length === 1 ? 'artículo' : 'artículos'} • 
                    Total: ${mockOrder.total.toFixed(2)}
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 px-4 py-2">
                  En Reparto
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Número de rastreo</p>
                  <p className="font-mono bg-gray-100 px-4 py-2 rounded-lg inline-block">
                    {mockOrder.trackingNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Método de envío</p>
                  <p>{mockOrder.shippingMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Destinatario</p>
                  <p>{mockOrder.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Dirección</p>
                  <p className="text-sm">{mockOrder.customer.address}, {mockOrder.customer.city}</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl mb-8">
                Estado del Envío
              </h3>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                <div className="space-y-8">
                  {orderStatuses.map((status, index) => {
                    const Icon = status.icon;
                    const isLast = index === orderStatuses.length - 1;
                    
                    return (
                      <div key={status.status} className="relative flex gap-6">
                        {/* Icon Circle */}
                        <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          status.completed
                            ? status.current
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white ring-4 ring-purple-100 scale-110'
                              : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {status.completed ? (
                            status.current ? (
                              <Icon className="w-6 h-6 animate-pulse" />
                            ) : (
                              <CheckCircle2 className="w-6 h-6" />
                            )
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
                          <div className={`p-6 rounded-xl transition-all duration-300 ${
                            status.current
                              ? 'bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300'
                              : status.completed
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-gray-50 border border-gray-200'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <h4 className={`text-lg ${
                                status.current ? 'text-purple-900' : status.completed ? 'text-green-900' : 'text-gray-700'
                              }`}>
                                {status.label}
                              </h4>
                              {status.current && (
                                <Badge className="bg-purple-600 text-white border-0">
                                  Actual
                                </Badge>
                              )}
                            </div>
                            <p className={`text-sm mb-2 ${
                              status.current ? 'text-purple-800' : status.completed ? 'text-green-800' : 'text-gray-600'
                            }`}>
                              {status.description}
                            </p>
                            <p className={`text-xs ${
                              status.current ? 'text-purple-700' : status.completed ? 'text-green-700' : 'text-gray-500'
                            }`}>
                              {status.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-8 rounded-2xl border border-gray-100 mt-8">
              <h3 className="text-2xl mb-6">
                Artículos del Pedido
              </h3>

              <div className="space-y-4">
                {mockOrder.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4>{item.product.name}</h4>
                      <p className="text-gray-600 text-sm">
                        Talla: {item.size} • Cantidad: {item.quantity}
                      </p>
                      <p className="text-pink-600 mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Support Link */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-blue-900 mb-1">
                    ¿Tienes alguna pregunta sobre tu pedido?
                  </h4>
                  <p className="text-blue-800 text-sm">
                    Nuestro equipo de soporte está aquí para ayudarte
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('support')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Contactar Soporte
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
