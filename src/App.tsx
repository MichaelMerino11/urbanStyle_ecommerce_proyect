import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetail } from './components/ProductDetail';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { TrackingPage } from './components/TrackingPage';
import { SupportPage } from './components/SupportPage';
import type { CartItem, Product } from './types';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem =>
          cartItem.product.id === item.product.id &&
          cartItem.size === item.size
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }

      return [...prevCart, item];
    });
  };

  const handleUpdateCartItem = (productId: string, size: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart(prevCart =>
      prevCart.filter(item =>
        !(item.product.id === productId && item.size === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartItemCount={cartItemCount}
      />

      {currentView === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentView === 'catalog' && (
        <CatalogPage
          onViewProduct={handleViewProduct}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'product-detail' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => handleNavigate('catalog')}
        />
      )}

      {currentView === 'cart' && (
        <CartPage
          items={cart}
          onUpdateQuantity={handleUpdateCartItem}
          onRemoveItem={handleRemoveCartItem}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutPage
          items={cart}
          onComplete={handleClearCart}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'tracking' && (
        <TrackingPage onNavigate={handleNavigate} />
      )}

      {currentView === 'support' && (
        <SupportPage onNavigate={handleNavigate} />
      )}

      <Toaster />
    </div>
  );
}
