import { useState, useEffect, type MouseEvent } from 'react';
import { Button } from "@/components/ui/button";
import { PawPrint, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Atualizar seção ativa baseado no scroll
      const sections = ['home', 'services', 'products', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Se não estiver na página inicial, navegar para lá primeiro
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    
    setMobileMenuOpen(false);
  };
  
  const handleAgendarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSmoothScroll(e as unknown as MouseEvent<HTMLAnchorElement>, 'contact');
  };
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, 'home')}
          className="flex items-center cursor-pointer group"
        >
          <PawPrint className="h-8 w-8 text-petshop-primary mr-2 transition-transform group-hover:rotate-12" />
          <span className="text-2xl font-bold text-petshop-dark group-hover:text-petshop-primary transition-colors">MELHOR AMIGO</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeSection === 'home' 
                ? 'text-petshop-primary' 
                : 'text-petshop-dark hover:text-petshop-primary'
            }`}
          >
            Home
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-petshop-primary rounded-full"></span>
            )}
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleSmoothScroll(e, 'services')}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeSection === 'services' 
                ? 'text-petshop-primary' 
                : 'text-petshop-dark hover:text-petshop-primary'
            }`}
          >
            Serviços
            {activeSection === 'services' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-petshop-primary rounded-full"></span>
            )}
          </a>
          <a 
            href="#products" 
            onClick={(e) => handleSmoothScroll(e, 'products')}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeSection === 'products' 
                ? 'text-petshop-primary' 
                : 'text-petshop-dark hover:text-petshop-primary'
            }`}
          >
            Produtos
            {activeSection === 'products' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-petshop-primary rounded-full"></span>
            )}
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => handleSmoothScroll(e, 'gallery')}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeSection === 'gallery' 
                ? 'text-petshop-primary' 
                : 'text-petshop-dark hover:text-petshop-primary'
            }`}
          >
            Galeria
            {activeSection === 'gallery' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-petshop-primary rounded-full"></span>
            )}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeSection === 'contact' 
                ? 'text-petshop-primary' 
                : 'text-petshop-dark hover:text-petshop-primary'
            }`}
          >
            Contato
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-petshop-primary rounded-full"></span>
            )}
          </a>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
            <Button
              onClick={() => navigate('/cart')}
              variant="ghost"
              className="relative rounded-full p-2 hover:bg-petshop-primary/10"
              aria-label="Carrinho"
            >
              <ShoppingCart className="w-5 h-5 text-petshop-dark" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-petshop-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems() > 9 ? '9+' : getTotalItems()}
                </span>
              )}
            </Button>
          )}
          <Button 
            onClick={handleAgendarClick}
            className="bg-petshop-primary hover:bg-petshop-primary/90 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Agendar
          </Button>
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-petshop-dark p-2 rounded-lg hover:bg-petshop-light transition-colors"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu com animação */}
      <div 
        className={`md:hidden bg-white shadow-xl absolute w-full transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-4 pt-4 pb-6 space-y-2">
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, 'home')}
            className="text-petshop-dark hover:text-petshop-primary hover:bg-petshop-light transition-all font-medium py-3 px-4 rounded-lg"
          >
            Home
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleSmoothScroll(e, 'services')}
            className="text-petshop-dark hover:text-petshop-primary hover:bg-petshop-light transition-all font-medium py-3 px-4 rounded-lg"
          >
            Serviços
          </a>
          <a 
            href="#products" 
            onClick={(e) => handleSmoothScroll(e, 'products')}
            className="text-petshop-dark hover:text-petshop-primary hover:bg-petshop-light transition-all font-medium py-3 px-4 rounded-lg"
          >
            Produtos
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => handleSmoothScroll(e, 'gallery')}
            className="text-petshop-dark hover:text-petshop-primary hover:bg-petshop-light transition-all font-medium py-3 px-4 rounded-lg"
          >
            Galeria
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="text-petshop-dark hover:text-petshop-primary hover:bg-petshop-light transition-all font-medium py-3 px-4 rounded-lg"
          >
            Contato
          </a>
          <Button 
            onClick={handleAgendarClick}
            className="bg-petshop-primary hover:bg-petshop-primary/90 text-white rounded-full w-full mt-2"
          >
            Agendar
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
