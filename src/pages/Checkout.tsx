import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, CreditCard, Truck, Lock, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  useEffect(() => {
    document.title = "Checkout - MELHOR AMIGO";
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      navigate('/cart');
    }
  }, [items, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepChange = async (cep: string) => {
    handleInputChange('cep', cep);
    if (cep.replace(/\D/g, '').length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
        const data = await response.json();
        if (!data.erro) {
          handleInputChange('address', data.logradouro || '');
          handleInputChange('neighborhood', data.bairro || '');
          handleInputChange('city', data.localidade || '');
          handleInputChange('state', data.uf || '');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!(formData.fullName && formData.email && formData.phone);
    }
    if (step === 2) {
      return !!(formData.cep && formData.address && formData.number && formData.city && formData.state);
    }
    if (step === 3) {
      if (paymentMethod === 'credit') {
        return !!(formData.cardNumber && formData.cardName && formData.cardExpiry && formData.cardCvv);
      }
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleFinalizeOrder();
      }
    } else {
      toast.error("Por favor, preencha todos os campos obrigatórios");
    }
  };

  const handleFinalizeOrder = async () => {
    setIsProcessing(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Pedido realizado com sucesso! 🎉", {
      description: "Você receberá um email de confirmação em breve.",
      duration: 5000,
    });
    
    clearCart();
    
    setTimeout(() => {
      navigate('/');
      toast.info("Obrigado pela sua compra!", {
        description: "Seu pedido está sendo processado.",
      });
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 200 ? 0 : 15.90;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - pixDiscount;

  const steps = [
    { number: 1, title: "Dados Pessoais", icon: CheckCircle2 },
    { number: 2, title: "Endereço", icon: Truck },
    { number: 3, title: "Pagamento", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-petshop-light">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <Button
          onClick={() => navigate('/cart')}
          variant="ghost"
          className="text-petshop-primary hover:text-petshop-primary/80 mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar ao Carrinho
        </Button>

        <h1 className="text-4xl font-bold text-petshop-dark mb-8">Finalizar Pedido</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        isCompleted
                          ? 'bg-petshop-primary text-white'
                          : isActive
                          ? 'bg-petshop-primary text-white scale-110'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <p className={`mt-2 text-sm font-medium ${isActive ? 'text-petshop-primary' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-all ${
                        isCompleted ? 'bg-petshop-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {currentStep === 1 && "Dados Pessoais"}
                  {currentStep === 2 && "Endereço de Entrega"}
                  {currentStep === 3 && "Método de Pagamento"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Dados Pessoais */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Seu nome completo"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="seu@email.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Endereço */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        placeholder="00000-000"
                        maxLength={9}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Rua, Avenida, etc."
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={formData.complement}
                          onChange={(e) => handleInputChange('complement', e.target.value)}
                          placeholder="Apto, Bloco, etc."
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Nome da cidade"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                          placeholder="SP"
                          maxLength={2}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pagamento */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Cartão de Crédito</span>
                            <CreditCard className="w-5 h-5 text-petshop-primary" />
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="debit" id="debit" />
                        <Label htmlFor="debit" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Cartão de Débito</span>
                            <CreditCard className="w-5 h-5 text-petshop-primary" />
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">PIX</span>
                            <span className="text-xs bg-petshop-primary text-white px-2 py-1 rounded">5% OFF</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                            placeholder="NOME COMO ESTÁ NO CARTÃO"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Validade *</Label>
                            <Input
                              id="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={(e) => handleInputChange('cardExpiry', e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2'))}
                              placeholder="MM/AA"
                              maxLength={5}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV *</Label>
                            <Input
                              id="cardCvv"
                              type="password"
                              value={formData.cardCvv}
                              onChange={(e) => handleInputChange('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                              placeholder="123"
                              maxLength={3}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-petshop-primary/10 rounded-lg text-center">
                        <p className="text-petshop-dark font-semibold mb-2">Pagamento via PIX</p>
                        <p className="text-sm text-gray-600 mb-4">
                          Você receberá o QR Code após confirmar o pedido. Aproveite 5% de desconto!
                        </p>
                        <div className="flex items-center justify-center gap-2 text-petshop-primary">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Pagamento 100% seguro</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Botões de Navegação */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Voltar
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={isProcessing}
                    className="bg-petshop-primary hover:bg-petshop-primary/90 text-white rounded-full px-8"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processando...
                      </>
                    ) : currentStep === 3 ? (
                      <>
                        Finalizar Pedido
                        <Lock className="ml-2 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Continuar
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-petshop-dark">{item.name}</p>
                        <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                        <p className="text-sm font-bold text-petshop-primary">
                          {formatPrice(item.priceNumber * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Grátis</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {paymentMethod === 'pix' && (
                    <div className="flex justify-between text-sm bg-green-50 p-2 rounded-lg">
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Desconto PIX (5%)
                      </span>
                      <span className="font-semibold text-green-600">
                        -{formatPrice(pixDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-petshop-dark pt-2 border-t">
                    <span>Total</span>
                    <span className="text-petshop-primary">
                      {formatPrice(paymentMethod === 'pix' ? total * 0.95 : total)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-petshop-primary/10 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-petshop-dark mb-2">
                    <Lock className="w-4 h-4 text-petshop-primary" />
                    <span className="font-semibold">Compra 100% Segura</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Seus dados estão protegidos e criptografados.
                  </p>
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

export default Checkout;

