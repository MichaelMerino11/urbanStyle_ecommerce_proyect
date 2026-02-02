import type { Product, Ticket, Order } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Chaqueta Urban Denim',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Chaquetas',
    description: 'Chaqueta de mezclilla con diseño urbano moderno, perfecta para cualquier ocasión casual.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 5, M: 12, L: 8, XL: 3 }
  },
  {
    id: '2',
    name: 'Sudadera Oversized Negra',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Sudaderas',
    description: 'Sudadera oversized de algodón premium, máxima comodidad y estilo urbano.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 8, M: 15, L: 10, XL: 6, XXL: 4 }
  },
  {
    id: '3',
    name: 'Pantalón Cargo Beige',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    category: 'Pantalones',
    description: 'Pantalón cargo con múltiples bolsillos, ideal para un look urbano funcional.',
    sizes: ['28', '30', '32', '34', '36'],
    stock: { '28': 4, '30': 9, '32': 14, '34': 7, '36': 5 }
  },
  {
    id: '4',
    name: 'Camiseta Básica Blanca',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Camisetas',
    description: 'Camiseta básica de algodón 100%, imprescindible en cualquier guardarropa.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 20, M: 25, L: 18, XL: 12 }
  },
  {
    id: '5',
    name: 'Bomber Jacket Verde',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    category: 'Chaquetas',
    description: 'Bomber jacket con forro acolchado, perfecto para la temporada de otoño.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 3, M: 7, L: 9, XL: 5 }
  },
  {
    id: '6',
    name: 'Jeans Slim Fit Azul',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Pantalones',
    description: 'Jeans slim fit de mezclilla elástica, comodidad y estilo en un solo producto.',
    sizes: ['28', '30', '32', '34', '36'],
    stock: { '28': 6, '30': 11, '32': 15, '34': 8, '36': 4 }
  },
  {
    id: '7',
    name: 'Hoodie Gris Minimalista',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    category: 'Sudaderas',
    description: 'Hoodie con capucha y bolsillo canguro, diseño minimalista y versátil.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 10, M: 14, L: 12, XL: 7 }
  },
  {
    id: '8',
    name: 'Camisa Oversized Beige',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    category: 'Camisas',
    description: 'Camisa oversized de lino, perfecta para un look relajado y sofisticado.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: { S: 5, M: 8, L: 11, XL: 6 }
  }
];

export const mockOrder: Order = {
  id: '873921',
  customer: {
    name: 'María González',
    phone: '+593 98 765 4321',
    email: 'maria.gonzalez@email.com',
    city: 'Quito',
    address: 'Av. Amazonas N24-03 y Colón'
  },
  items: [
    {
      product: products[0],
      size: 'M',
      quantity: 1
    },
    {
      product: products[3],
      size: 'L',
      quantity: 2
    }
  ],
  total: 149.97,
  paymentMethod: 'Tarjeta de Crédito',
  shippingMethod: 'Express',
  trackingNumber: 'URB-EC-873921-2026',
  status: 'in_delivery',
  createdAt: new Date('2026-01-28')
};

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    orderId: '873921',
    subject: 'Consulta sobre tiempo de entrega',
    status: 'resolved',
    channel: 'chat',
    createdAt: new Date('2026-01-29'),
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        message: '¿Cuándo llegará mi pedido?',
        timestamp: new Date('2026-01-29T10:30:00')
      },
      {
        id: 'msg-2',
        sender: 'support',
        message: 'Hola María, tu pedido está en camino y llegará mañana antes de las 18:00.',
        timestamp: new Date('2026-01-29T10:35:00')
      }
    ]
  },
  {
    id: 'TKT-002',
    orderId: '873921',
    subject: 'Problema con el color del producto',
    status: 'open',
    channel: 'email',
    createdAt: new Date('2026-01-30'),
    messages: [
      {
        id: 'msg-3',
        sender: 'customer',
        message: 'El color de la chaqueta no coincide con la foto del sitio web.',
        timestamp: new Date('2026-01-30T14:20:00')
      }
    ]
  }
];
