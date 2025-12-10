
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    pet: "Bella (Golden Retriever)",
    rating: 5,
    text: "Excelente atendimento! A equipe é muito carinhosa e profissional. Minha Bella sempre volta feliz e cheirosa!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "João Santos",
    pet: "Mimi (Persa)",
    rating: 5,
    text: "Melhor petshop da região! Produtos de qualidade e serviços impecáveis. Recomendo para todos os tutores!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Ana Costa",
    pet: "Rex (Labrador)",
    rating: 5,
    text: "O veterinário é muito atencioso e o ambiente é super limpo e organizado. Meu cachorro adora ir lá!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    pet: "Luna (SRD)",
    rating: 5,
    text: "Serviço de hotel é perfeito! Deixei minha gata por uma semana e ela foi muito bem cuidada. Voltou super feliz!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-petshop-light/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-petshop-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-petshop-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-10 bg-petshop-primary mr-2"></div>
            <p className="text-petshop-primary font-medium">Depoimentos</p>
            <div className="h-1 w-10 bg-petshop-primary ml-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-petshop-dark mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A satisfação dos nossos clientes e seus pets é nossa maior recompensa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`border border-gray-100 hover:border-petshop-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="w-8 h-8 text-petshop-primary/30 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-petshop-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-petshop-dark">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.pet}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-petshop-primary/10 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-petshop-dark font-semibold">
              <span className="text-2xl font-bold text-petshop-primary">4.9</span> / 5.0
            </span>
            <span className="text-gray-600">baseado em 500+ avaliações</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;




