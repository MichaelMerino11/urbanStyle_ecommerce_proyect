import { useState } from 'react';
import { ArrowLeft, Minus, Plus, Package, Truck, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Product, CartItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onBack: () => void;
}

export function ProductDetail({ product, onAddToCart, onBack }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const availableStock = selectedSize ? product.stock[selectedSize] || 0 : 0;
  const maxQuantity = Math.min(availableStock, 10);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    if (quantity > availableStock) {
      toast.error('Cantidad no disponible en stock');
      return;
    }

    onAddToCart({
      product,
      size: selectedSize,
      quantity
    });

    toast.success('Producto agregado al carrito', {
      description: `${product.name} - Talla ${selectedSize} (${quantity} ${quantity === 1 ? 'unidad' : 'unidades'})`
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden rounded-2xl border border-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-pink-50 to-orange-50 text-pink-700 border border-pink-200">
                {product.category}
              </Badge>
              <h1 className="text-4xl mb-4">
                {product.name}
              </h1>
              <p className="text-3xl bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="block">
                Selecciona tu talla
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full h-14 rounded-xl border-gray-200 bg-white">
                  <SelectValue placeholder="Elige una talla" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>
                      Talla {size} - {product.stock[size] > 0 
                        ? `${product.stock[size]} disponibles` 
                        : 'Agotado'
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stock Display */}
            {selectedSize && (
              <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
                <Package className="w-5 h-5 text-pink-600" />
                <span className="text-pink-900">
                  {availableStock > 0 
                    ? `${availableStock} unidades disponibles en stock`
                    : 'Sin stock disponible'
                  }
                </span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= maxQuantity || !selectedSize}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {selectedSize && maxQuantity > 0 && (
                  <span className="text-gray-600">
                    Máximo: {maxQuantity}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || availableStock === 0}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {availableStock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-6">
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl">
                <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg">
                  <Truck className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4>Envío Express</h4>
                  <p className="text-gray-600 text-sm">Entrega en 24-48 horas</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl">
                <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4>Garantía de 7 días</h4>
                  <p className="text-gray-600 text-sm">Devoluciones sin complicaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
