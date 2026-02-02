import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { products } from '../data/mockData';
import type { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Filter } from 'lucide-react';

interface CatalogPageProps {
  onViewProduct: (product: Product) => void;
  onNavigate: (view: string) => void;
}

export function CatalogPage({ onViewProduct }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre nuestra colección completa de moda urbana
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filtrar por:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card 
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => onViewProduct(product)}
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-white text-gray-900 border-0 shadow-md">
                  {product.category}
                </Badge>
              </div>
              
              <div className="p-5">
                <h3 className="mb-2 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm">
                    Ver detalle
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No se encontraron productos en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
