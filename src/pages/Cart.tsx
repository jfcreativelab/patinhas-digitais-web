import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, Tag, Sparkles, Heart, Shield, Truck, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    document.title = "Carrinho - MELHOR AMIGO";
  }, []);

  const validCoupons: Record<string, number> = {
    "PET10": 10,
    "MELHORAMIGO": 15,
    "BEMVINDO": 5,
  };

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (validCoupons[code]) {
      setAppliedCoupon(code);
      setCouponDiscount(validCoupons[code]);
      toast.success(`Cupom "${code}" aplicado!`, {
        description: `${validCoupons[code]}% de desconto aplicado.`,
      });
      setCouponCode("");
    } else {
      toast.error("Cupom inválido", {
        description: "Verifique o código e tente novamente.",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    toast.info("Cupom removido");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-petshop-light">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <div className="relative inline-block mb-6">
                <ShoppingBag className="w-32 h-32 text-gray-300 mx-auto animate-bounce-slow" />
                <div className="absolute inset-0 bg-petshop-primary/10 rounded-full blur-2xl"></div>
              </div>
              <h1 className="text-4xl font-bold text-petshop-dark mb-4">Seu carrinho está vazio</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Que tal adicionar alguns produtos para o seu melhor amigo?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleContinueShopping}
                  className="bg-petshop-primary hover:bg-petshop-primary/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Continuar Comprando
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-2 border-petshop-primary text-petshop-primary hover:bg-petshop-primary hover:text-white"
                >
                  Ver Produtos
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 200 ? 0 : 15.90;
  const discount = appliedCoupon ? (subtotal * couponDiscount) / 100 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-petshop-light">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button
            onClick={handleContinueShopping}
            variant="ghost"
            className="text-petshop-primary hover:text-petshop-primary/80 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Continuar Comprando
          </Button>
          <h1 className="text-4xl font-bold text-petshop-dark mb-2">Carrinho de Compras</h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Imagem com hover effect */}
                    <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-petshop-dark group-hover:text-petshop-primary transition-colors">
                            {item.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0 ml-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 mb-3">
                          <p className="text-lg font-bold text-petshop-primary">
                            {formatPrice(item.priceNumber)}
                          </p>
                          {item.quantity > 1 && (
                            <span className="text-xs text-gray-500">
                              {item.quantity} × {formatPrice(item.priceNumber)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controles melhorados */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-petshop-light rounded-full p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full hover:bg-petshop-primary hover:text-white transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-lg font-bold text-petshop-dark w-10 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full hover:bg-petshop-primary hover:text-white transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                          <p className="text-xl font-bold text-petshop-dark">
                            {formatPrice(item.priceNumber * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Cupom de Desconto */}
            <Card className="bg-gradient-to-br from-petshop-primary/10 to-petshop-secondary/10 border-petshop-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-petshop-primary" />
                  <h3 className="font-semibold text-petshop-dark">Cupom de Desconto</h3>
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-petshop-primary" />
                      <span className="font-semibold text-petshop-primary">{appliedCoupon}</span>
                      <span className="text-sm text-gray-600">-{couponDiscount}%</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Digite o cupom"
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      className="bg-petshop-primary hover:bg-petshop-primary/90 text-white"
                    >
                      Aplicar
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  💡 Cupons disponíveis: PET10, MELHORAMIGO, BEMVINDO
                </p>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Limpar Carrinho
            </Button>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-2 border-petshop-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="w-6 h-6 text-petshop-primary" />
                  <h2 className="text-2xl font-bold text-petshop-dark">Resumo do Pedido</h2>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Desconto ({appliedCoupon})
                      </span>
                      <span className="font-semibold">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Frete
                    </span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <Gift className="w-4 h-4" />
                          Grátis
                        </span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 200 && (
                    <div className="p-3 bg-petshop-primary/10 rounded-lg border border-petshop-primary/20">
                      <p className="text-sm text-petshop-primary font-semibold flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Faltam {formatPrice(200 - subtotal)} para frete grátis!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t-2 border-petshop-primary/20 pt-4 flex justify-between text-2xl font-bold text-petshop-dark">
                    <span>Total</span>
                    <span className="text-petshop-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-petshop-primary hover:bg-petshop-primary/90 text-white rounded-full py-6 text-lg font-semibold mb-4"
                >
                  Finalizar Compra
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="w-full rounded-full py-6 text-lg"
                >
                  Continuar Comprando
                </Button>

                <div className="space-y-3 mt-6">
                  <div className="p-4 bg-gradient-to-br from-petshop-primary/10 to-petshop-secondary/10 rounded-lg border border-petshop-primary/20">
                    <p className="text-sm text-petshop-dark font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-petshop-primary" />
                      Benefícios Exclusivos
                    </p>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-petshop-primary" />
                        Frete grátis acima de R$ 200
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-petshop-primary" />
                        Garantia de qualidade
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-petshop-primary" />
                        Atendimento especializado
                      </li>
                      <li className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-petshop-primary" />
                        Entrega rápida e segura
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 text-center">
                      🔒 Compra 100% segura e protegida
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

