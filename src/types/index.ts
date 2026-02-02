export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  stock: { [size: string]: number };
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  trackingNumber?: string;
  status: OrderStatus;
  createdAt: Date;
}

export type OrderStatus = 
  | 'created' 
  | 'payment_approved' 
  | 'preparing' 
  | 'shipped' 
  | 'in_delivery' 
  | 'delivered';

export interface Ticket {
  id: string;
  orderId: string;
  subject: string;
  status: 'open' | 'resolved';
  channel: 'chat' | 'email' | 'complaint';
  createdAt: Date;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  sender: 'customer' | 'support';
  message: string;
  timestamp: Date;
}

export interface Return {
  id: string;
  orderId: string;
  reason: string;
  status: 'pending' | 'validating' | 'approved' | 'refunded';
  createdAt: Date;
  validationSteps: {
    step: number;
    label: string;
    completed: boolean;
  }[];
}