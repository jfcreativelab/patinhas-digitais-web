
import { useState, useEffect, useRef } from "react";
import { PawPrint } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Profissionais Qualificados",
    description: "Nossa equipe é composta por especialistas com anos de experiência e formação específica para cuidar do seu pet.",
    icon: "🎓"
  },
  {
    id: 2,
    title: "Ambiente Confortável",
    description: "Nosso espaço é projetado para oferecer o máximo de conforto e segurança para todos os animais.",
    icon: "🏠"
  },
  {
    id: 3,
    title: "Produtos Premium",
    description: "Utilizamos apenas produtos de alta qualidade, hipoalergênicos e específicos para cada tipo de pet.",
    icon: "⭐"
  },
  {
    id: 4,
    title: "Atendimento Personalizado",
    description: "Cada animal recebe um tratamento único de acordo com suas necessidades específicas.",
    icon: "🛎️"
  },
];

const Features = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section ref={sectionRef} className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <div className="h-1 w-10 bg-petshop-primary mr-2"></div>
              <p className="text-petshop-primary font-medium">Por que nos escolher?</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-petshop-dark mb-6">
              Diferencial no cuidado com o seu pet
            </h2>
            <p className="text-gray-600 mb-8">
              Na MELHOR AMIGO, nosso compromisso é proporcionar o melhor atendimento para seu animal de estimação. 
              Combinamos carinho, experiência e instalações modernas para garantir a felicidade do seu pet.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-petshop-tertiary/20 flex items-center justify-center mr-4 text-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg text-petshop-dark">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-16">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`md:w-1/2 transition-all duration-1000 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-petshop-primary/10 z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-petshop-secondary/10 z-0"></div>
              
              <img 
                src="https://img.freepik.com/fotos-premium/grande-grupo-de-caes-olhando-para-a-camera-sobre-fundo-azul_191971-28627.jpg" 
                alt="Pet feliz" 
                loading="lazy"
                className="rounded-3xl relative z-10 shadow-xl transition-transform duration-500 hover:scale-105"
              />
              
              <div className="absolute -bottom-5 left-10 bg-white rounded-xl shadow-lg p-4 z-20 floating">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-petshop-primary/20 flex items-center justify-center">
                    <PawPrint className="h-5 w-5 text-petshop-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-petshop-dark">10+ Anos</p>
                    <p className="text-xs text-gray-500">de experiência</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-5 right-10 bg-white rounded-xl shadow-lg p-4 z-20 bouncing">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-petshop-secondary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-petshop-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-petshop-dark">98%</p>
                    <p className="text-xs text-gray-500">satisfação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
