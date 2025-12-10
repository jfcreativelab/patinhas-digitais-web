
import { Card, CardContent } from "@/components/ui/card";
import { PawPrint } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const services = [
  {
    title: "Banho e Tosa",
    description: "Cuidados completos com a higiene do seu pet, incluindo banho, secagem, escovação e corte de pelos.",
    icon: "💧",
  },
  {
    title: "Veterinário",
    description: "Atendimento veterinário para manter a saúde do seu pet em dia com profissionais experientes.",
    icon: "🩺",
  },
  {
    title: "Pet Shop",
    description: "Produtos de alta qualidade para seu animal, desde alimentação até acessórios e brinquedos.",
    icon: "🛒",
  },
  {
    title: "Hotel",
    description: "Hospedagem com monitoramento 24 horas para cuidar do seu pet quando você precisar viajar.",
    icon: "🏠",
  },
  {
    title: "Adestramento",
    description: "Treinamento personalizado para melhorar o comportamento e bem-estar do seu animal.",
    icon: "🦮",
  },
  {
    title: "Transporte",
    description: "Serviço de busca e entrega do seu pet para maior comodidade e praticidade.",
    icon: "🚗",
  },
];

const Services = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSaibaMais = (serviceTitle: string) => {
    // Scroll suave para a seção de contato
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      
      // Mostrar toast informativo
      setTimeout(() => {
        toast.success(`Interessado em ${serviceTitle}?`, {
          description: "Entre em contato conosco para mais informações!",
          duration: 3000,
        });
      }, 500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-white relative" ref={sectionRef}>
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 h-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                className="fill-petshop-light"></path>
        </svg>
      </div>

      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-6 sm:w-10 bg-petshop-primary mr-2"></div>
            <p className="text-sm sm:text-base text-petshop-primary font-medium">Nossos Serviços</p>
            <div className="h-1 w-6 sm:w-10 bg-petshop-primary ml-2"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-petshop-dark px-4">
            Cuidados Completos para seu Pet
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Oferecemos uma variedade de serviços para garantir a saúde, beleza e bem-estar do seu melhor amigo, sempre com muito carinho e atenção.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              onClick={() => handleSaibaMais(service.title)}
              className={`border border-gray-100 hover:border-petshop-primary/50 hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'all',
                transitionDuration: '500ms'
              }}
            >
              <CardContent className="p-4 sm:p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-petshop-primary/5 to-petshop-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-petshop-light to-petshop-primary/10 flex items-center justify-center group-hover:from-petshop-primary/20 group-hover:to-petshop-secondary/20 transition-all duration-500 text-2xl sm:text-3xl transform group-hover:scale-110 group-hover:rotate-3">
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-petshop-dark mb-2 group-hover:text-petshop-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{service.description}</p>
                  <div 
                    className="flex justify-between items-center pt-4 border-t border-gray-100 group-hover:border-petshop-primary/30 transition-colors"
                  >
                    <span className="text-sm text-petshop-primary font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      Saiba mais
                    </span>
                    <div className="w-10 h-10 rounded-full border-2 border-petshop-primary/30 flex items-center justify-center text-petshop-primary group-hover:bg-petshop-primary group-hover:text-white group-hover:border-petshop-primary transition-all transform group-hover:scale-110 group-hover:rotate-12">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Wavy bottom border */}
      <div className="wavy-border w-full h-20 mt-20"></div>
    </section>
  );
};

export default Services;
