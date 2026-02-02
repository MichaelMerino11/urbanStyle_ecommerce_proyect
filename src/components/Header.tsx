import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Badge } from "./ui/badge";
import logo from "../assets/logo.png";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartItemCount: number;
}

export function Header({
  currentView,
  onNavigate,
  cartItemCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => onNavigate("home")}
          >
            <img src={logo} alt="Urban Style EC" className="h-8 w-auto" />
            <span className="font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                Urban Style
              </span>{" "}
              EC
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("home")}
              className={`transition-colors ${
                currentView === "home"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate("catalog")}
              className={`transition-colors ${
                currentView === "catalog"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onNavigate("tracking")}
              className={`transition-colors ${
                currentView === "tracking"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Rastreo
            </button>
            <button
              onClick={() => onNavigate("support")}
              className={`transition-colors ${
                currentView === "support"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Soporte
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0">
                  {cartItemCount}
                </Badge>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
