import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { CartItem } from "../types";
import {
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle2,
  Truck,
  Package,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CheckoutPageProps {
  items: CartItem[];
  onComplete: () => void;
  onNavigate: (view: string) => void;
}

export function CheckoutPage({
  items,
  onComplete,
  onNavigate,
}: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    shippingMethod: "",
  });

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shippingCosts = {
    courier: 3.99,
    regular: 5.99,
    express: 9.99,
  };

  const shipping = formData.shippingMethod
    ? shippingCosts[formData.shippingMethod as keyof typeof shippingCosts]
    : 0;

  const total = subtotal + shipping;

  type FormDataKeys = keyof typeof formData;

  const handleInputChange = (field: FormDataKeys, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.city ||
      !formData.address
    ) {
      toast.error("Por favor completa todos los campos");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un correo válido");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.paymentMethod) {
      toast.error("Por favor selecciona un método de pago");
      return false;
    }
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV) {
        toast.error("Por favor completa los datos de la tarjeta");
        return false;
      }
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Número de tarjeta inválido");
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.shippingMethod) {
      toast.error("Por favor selecciona un método de envío");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 3 && validateStep3()) {
      handleCompleteOrder();
    }
  };

  const handleCompleteOrder = () => {
    const trackingNumber = `URB-EC-${Math.floor(Math.random() * 900000 + 100000)}-2026`;
    toast.success("¡Pedido realizado con éxito!", {
      description: `Tu número de rastreo es: ${trackingNumber}`,
    });
    onComplete();
    setTimeout(() => {
      onNavigate("tracking");
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl mb-8">Finalizar Compra</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[
              { num: 1, label: "Datos" },
              { num: 2, label: "Pago" },
              { num: 3, label: "Envío" },
            ].map((item, index) => (
              <div key={item.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step >= item.num
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > item.num ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span>{item.num}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm ${step >= item.num ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded transition-all duration-300 ${
                      step > item.num
                        ? "bg-gradient-to-r from-pink-500 to-orange-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Customer Data */}
            {step === 1 && (
              <Card className="p-8 rounded-2xl border border-gray-100">
                <h2 className="text-2xl mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Juan Pérez"
                      className="mt-2 h-12 rounded-xl"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+593 99 123 4567"
                        className="mt-2 h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="juan@email.com"
                        className="mt-2 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value: string) =>
                        handleInputChange("city", value)
                      }
                    >
                      <SelectTrigger className="mt-2 h-12 rounded-xl">
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quito">Quito</SelectItem>
                        <SelectItem value="guayaquil">Guayaquil</SelectItem>
                        <SelectItem value="cuenca">Cuenca</SelectItem>
                        <SelectItem value="ambato">Ambato</SelectItem>
                        <SelectItem value="manta">Manta</SelectItem>
                        <SelectItem value="loja">Loja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Dirección completa *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Av. Principal N12-34 y Calle Secundaria"
                      className="mt-2 h-12 rounded-xl"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="p-8 rounded-2xl border border-gray-100">
                <h2 className="text-2xl mb-6">Método de Pago</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleInputChange("paymentMethod", "card")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        formData.paymentMethod === "card"
                          ? "border-pink-500 bg-gradient-to-r from-pink-50 to-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CreditCard
                        className={`w-8 h-8 mx-auto mb-3 ${
                          formData.paymentMethod === "card"
                            ? "text-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                      <p className="text-sm">Tarjeta</p>
                    </button>

                    <button
                      onClick={() =>
                        handleInputChange("paymentMethod", "transfer")
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        formData.paymentMethod === "transfer"
                          ? "border-pink-500 bg-gradient-to-r from-pink-50 to-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Building2
                        className={`w-8 h-8 mx-auto mb-3 ${
                          formData.paymentMethod === "transfer"
                            ? "text-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                      <p className="text-sm">Transferencia</p>
                    </button>

                    <button
                      onClick={() =>
                        handleInputChange("paymentMethod", "gateway")
                      }
                      className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        formData.paymentMethod === "gateway"
                          ? "border-pink-500 bg-gradient-to-r from-pink-50 to-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Smartphone
                        className={`w-8 h-8 mx-auto mb-3 ${
                          formData.paymentMethod === "gateway"
                            ? "text-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                      <p className="text-sm">Pasarela</p>
                    </button>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="space-y-6 pt-4">
                      <div>
                        <Label htmlFor="cardNumber">Número de tarjeta *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            handleInputChange(
                              "cardNumber",
                              formatCardNumber(e.target.value),
                            )
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="mt-2 h-12 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="cardExpiry">
                            Fecha de expiración *
                          </Label>
                          <Input
                            id="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={(e) =>
                              handleInputChange("cardExpiry", e.target.value)
                            }
                            placeholder="MM/AA"
                            maxLength={5}
                            className="mt-2 h-12 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCVV">CVV *</Label>
                          <Input
                            id="cardCVV"
                            value={formData.cardCVV}
                            onChange={(e) =>
                              handleInputChange("cardCVV", e.target.value)
                            }
                            placeholder="123"
                            maxLength={4}
                            type="password"
                            className="mt-2 h-12 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "transfer" && (
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                      <p className="text-blue-900 mb-2">
                        Instrucciones de transferencia
                      </p>
                      <p className="text-sm text-blue-800">
                        Realiza la transferencia a la cuenta 1234567890 del
                        Banco Pichincha. Envía el comprobante a
                        pagos@urbanstyle.ec
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === "gateway" && (
                    <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                      <p className="text-purple-900 mb-2">Pago con pasarela</p>
                      <p className="text-sm text-purple-800">
                        Serás redirigido a nuestra pasarela de pago segura para
                        completar la transacción.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Step 3: Shipping */}
            {step === 3 && (
              <Card className="p-8 rounded-2xl border border-gray-100">
                <h2 className="text-2xl mb-6">Método de Envío</h2>
                <div className="space-y-4">
                  <button
                    onClick={() =>
                      handleInputChange("shippingMethod", "courier")
                    }
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                      formData.shippingMethod === "courier"
                        ? "border-pink-500 bg-gradient-to-r from-pink-50 to-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Package
                        className={`w-8 h-8 ${
                          formData.shippingMethod === "courier"
                            ? "text-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                      <div className="text-left">
                        <p className="font-medium">Courier</p>
                        <p className="text-sm text-gray-600">
                          Entrega en 5-7 días hábiles
                        </p>
                      </div>
                    </div>
                    <p className="text-lg">$3.99</p>
                  </button>

                  <button
                    onClick={() =>
                      handleInputChange("shippingMethod", "regular")
                    }
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                      formData.shippingMethod === "regular"
                        ? "border-pink-500 bg-gradient-to-r from-pink-50 to-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Truck
                        className={`w-8 h-8 ${
                          formData.shippingMethod === "regular"
                            ? "text-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                      <div className="text-left">
                        <p className="font-medium">Regular</p>
                        <p className="text-sm text-gray-600">
                          Entrega en 3-5 días hábiles
                        </p>
                      </div>
                    </div>
                    <p className="text-lg">$5.99</p>
                  </button>

                  <button
                    onClick={() =>
                      handleInputChange("shippingMethod", "express")
                    }
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                      formData.shippingMethod === "express"
                        ? "border-pink-500 bg-gradient-to-r from-pink-50 to-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Zap
                        className={`w-8 h-8 ${
                          formData.shippingMethod === "express"
                            ? "text-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                      <div className="text-left">
                        <p className="font-medium">Express</p>
                        <p className="text-sm text-gray-600">
                          Entrega en 24-48 horas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0">
                        Rápido
                      </Badge>
                      <p className="text-lg">$9.99</p>
                    </div>
                  </button>
                </div>

                {formData.shippingMethod && (
                  <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-green-900">
                          Guía de rastreo generada
                        </p>
                        <p className="text-sm text-green-700">
                          Recibirás el número de seguimiento por correo
                          electrónico
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  Atrás
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                {step === 3 ? "Confirmar Pedido" : "Continuar"}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-2xl border border-gray-100 sticky top-24">
              <h3 className="text-xl mb-6">Resumen</h3>

              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}-${index}`}
                    className="flex gap-3"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? "-" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
