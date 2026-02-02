import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import type { CartItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onNavigate: (view: string) => void;
}

export function CartPage({ items, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) {
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleQuantityChange = (item: CartItem, delta: number) => {
    const newQuantity = item.quantity + delta;
    const maxStock = item.product.stock[item.size] || 0;
    
    if (newQuantity < 1) return;
    if (newQuantity > maxStock) {
      toast.error('Cantidad supera el stock disponible');
      return;
    }
    
    onUpdateQuantity(item.product.id, item.size, newQuantity);
  };

  const handleRemove = (item: CartItem) => {
    onRemoveItem(item.product.id, item.size);
    toast.success('Producto eliminado del carrito');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex p-6 bg-gradient-to-r from-pink-50 to-orange-50 rounded-full">
              <ShoppingBag className="w-16 h-16 text-pink-600" />
            </div>
            <h2 className="text-3xl">Tu carrito está vacío</h2>
            <p className="text-gray-600 text-lg">
              Agrega productos para comenzar tu compra
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
            >
              Ir al catálogo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl mb-8">
          Carrito de Compras
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={`${item.product.id}-${item.size}-${index}`} className="p-6 rounded-2xl border border-gray-100">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Talla: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          disabled={item.quantity >= (item.product.stock[item.size] || 0)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} c/u
                        </p>
                      </div>
                    </div>

                    {/* Stock Warning */}
                    {item.product.stock[item.size] <= 5 && (
                      <p className="text-sm text-orange-600">
                        ¡Solo quedan {item.product.stock[item.size]} en stock!
                      </p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item)}
                    className="p-2 h-fit hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-2xl border border-gray-100 sticky top-24">
              <h3 className="text-xl mb-6">
                Resumen del Pedido
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'artículo' : 'artículos'})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                </div>

                {subtotal > 100 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm text-green-800">
                      ¡Envío gratis aplicado!
                    </p>
                  </div>
                )}

                {subtotal < 100 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800">
                      Añade ${(100 - subtotal).toFixed(2)} más para envío gratis
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Proceder al pago
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="w-full mt-3 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                Continuar comprando
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
