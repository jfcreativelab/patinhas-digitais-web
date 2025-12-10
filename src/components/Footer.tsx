
import { useState } from "react";
import { PawPrint, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-petshop-dark text-white py-16 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-petshop-primary via-petshop-secondary to-petshop-tertiary"></div>
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <PawPrint className="h-6 w-6 sm:h-8 sm:w-8 text-petshop-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">MELHOR AMIGO</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Cuidando do seu melhor amigo com carinho e dedicação para uma vida mais feliz e saudável.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-petshop-primary transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-petshop-primary transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.543 7.104c.014.211.014.423.014.636 0 6.507-4.954 14.01-14.01 14.01v-.004A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-petshop-primary transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleSmoothScroll(e, 'home')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => handleSmoothScroll(e, 'products')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleSmoothScroll(e, 'gallery')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Galeria
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Banho e Tosa
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Veterinário
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Pet Shop
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Hotel
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-400 hover:text-petshop-primary transition-colors inline-block transform hover:translate-x-1"
                >
                  Adestramento
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">
              Receba ofertas exclusivas e dicas de cuidado com seu pet
            </p>
            {subscribed ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm">Inscrito com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-petshop-primary"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-petshop-primary hover:bg-petshop-primary/90 text-white px-6"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-500 text-xs">
                  Ao se inscrever, você concorda com nossa política de privacidade
                </p>
              </form>
            )}
            
            <div className="mt-6 space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm">Av. dos Pets, 123 - Centro, São Paulo, SP</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400 text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">contato@melhoramigo.com.br</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 MELHOR AMIGO. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                toast.info("Termos de Uso", {
                  description: "Em breve disponibilizaremos nossos termos de uso completos.",
                  duration: 3000,
                });
              }}
              className="text-gray-400 hover:text-petshop-primary text-sm transition-colors"
            >
              Termos de Uso
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                toast.info("Política de Privacidade", {
                  description: "Em breve disponibilizaremos nossa política de privacidade completa.",
                  duration: 3000,
                });
              }}
              className="text-gray-400 hover:text-petshop-primary text-sm transition-colors"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
