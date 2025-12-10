
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[\d\s\(\)\-\+]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validação
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Telefone inválido";
    }
    
    if (!message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simular envio (em produção, enviaria para o servidor)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-1 w-10 bg-petshop-primary mr-2"></div>
              <p className="text-petshop-primary font-medium">Entre em Contato</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-petshop-dark mb-6">
              Estamos aqui para ajudar
            </h2>
            <p className="text-gray-600 mb-8">
              Tem alguma dúvida ou gostaria de agendar um serviço? Entre em contato conosco e teremos prazer em atendê-lo.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start group hover:bg-petshop-light/50 p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 rounded-full bg-petshop-primary/10 flex items-center justify-center mr-4 text-xl text-petshop-primary group-hover:bg-petshop-primary group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-petshop-dark mb-1">Localização</h3>
                  <p className="text-gray-600">Av. dos Pets, 123 - Centro<br/>São Paulo, SP</p>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-petshop-light/50 p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 rounded-full bg-petshop-primary/10 flex items-center justify-center mr-4 text-xl text-petshop-primary group-hover:bg-petshop-primary group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-petshop-dark mb-1">Telefone</h3>
                  <p className="text-gray-600">(11) 99999-9999</p>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-petshop-light/50 p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 rounded-full bg-petshop-primary/10 flex items-center justify-center mr-4 text-xl text-petshop-primary group-hover:bg-petshop-primary group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-petshop-dark mb-1">Email</h3>
                  <p className="text-gray-600">contato@melhoramigo.com.br</p>
                </div>
              </div>
              
              <div className="flex items-start group hover:bg-petshop-light/50 p-4 rounded-lg transition-colors">
                <div className="w-12 h-12 rounded-full bg-petshop-primary/10 flex items-center justify-center mr-4 text-xl text-petshop-primary group-hover:bg-petshop-primary group-hover:text-white transition-all">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-petshop-dark mb-1">Horário</h3>
                  <p className="text-gray-600">
                    Segunda - Sexta: 8:00 - 19:00<br/>
                    Sábado: 9:00 - 17:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-bold text-petshop-dark mb-2">Envie uma mensagem</h3>
            <p className="text-gray-600 mb-6">Preencha o formulário e entraremos em contato em breve</p>
            
            {submitted ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-in zoom-in duration-500" />
                <h4 className="text-xl font-bold text-green-800 mb-2">Mensagem enviada com sucesso!</h4>
                <p className="text-green-700">Agradecemos seu contato. Nossa equipe responderá em até 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full transition-all ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full transition-all ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full min-h-[120px] transition-all ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                    placeholder="Como podemos ajudar? Conte-nos mais sobre sua necessidade..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">{message.length} caracteres</p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-petshop-primary hover:bg-petshop-primary/90 text-white py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
