import { CreditCard, Truck, Headphones, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import logo from "../assets/logo.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: CreditCard,
      title: "Pagos Seguros",
      description: "Múltiples métodos de pago con protección garantizada",
    },
    {
      icon: Truck,
      title: "Envío Express",
      description: "Entrega rápida a todo Ecuador en 24-48 horas",
    },
    {
      icon: Headphones,
      title: "Atención 24/7",
      description: "Soporte personalizado en todo momento",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-pink-50 to-orange-50 rounded-full border border-pink-200">
                <span className="text-sm bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Nueva Colección 2026
                </span>
              </div>

              {/* Logo + Headline */}
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="Urban Style EC"
                  className="h-20 md:h-28 lg:h-32 w-auto"
                />

                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                  Estilo Urbano,
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    Actitud Única
                  </span>
                </h1>
              </div>

              <p className="text-lg text-gray-600 max-w-lg">
                Descubre las últimas tendencias en moda urbana. Calidad premium,
                diseños exclusivos y la mejor experiencia de compra en Ecuador.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigate("catalog")}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate("catalog")}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  Ver Ofertas
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-orange-200 rounded-3xl blur-3xl opacity-30"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1765009433753-c7462637d21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3Njk3ODExMzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Urban Style Fashion"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl">
                    <Icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Categorías Destacadas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas en nuestra selección curada de
            las mejores prendas urbanas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="group relative overflow-hidden rounded-2xl border-0 cursor-pointer h-80"
            onClick={() => onNavigate("catalog")}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1604882767135-b41fac508fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY2xvdGhpbmclMjByYWNrfGVufDF8fHx8MTc2OTg0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Chaquetas y Abrigos"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl mb-2">Chaquetas & Abrigos</h3>
              <p className="text-white/90 mb-4">Desde $64.99</p>
              <div className="inline-flex items-center gap-2 text-sm">
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Card>

          <Card
            className="group relative overflow-hidden rounded-2xl border-0 cursor-pointer h-80"
            onClick={() => onNavigate("catalog")}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1533849808790-5eeda0c42660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzY5ODQ4NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Esenciales Urbanos"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl mb-2">Esenciales Urbanos</h3>
              <p className="text-white/90 mb-4">Desde $29.99</p>
              <div className="inline-flex items-center gap-2 text-sm">
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-pink-500 to-orange-500 p-12 md:p-16">
          <div className="relative z-10 text-center text-white">
            <h2 className="text-3xl md:text-4xl mb-4">
              ¿Listo para renovar tu estilo?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Únete a miles de clientes satisfechos y descubre por qué somos la
              tienda de moda urbana #1 en Ecuador
            </p>
            <button
              onClick={() => onNavigate("catalog")}
              className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Comenzar a Comprar
            </button>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </Card>
      </section>
    </div>
  );
}
