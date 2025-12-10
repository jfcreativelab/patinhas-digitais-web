
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { toast } from "sonner";

const galleryImages = [
  {
    id: 1,
    url: "https://adimax.com.br/wp-content/uploads/2022/05/cuidados-filhote-de-cachorro.jpg",
    alt: "Cachorro fofo",
    category: "dogs"
  },
  {
    id: 2,
    url: "https://png.pngtree.com/thumb_back/fw800/background/20210831/pngtree-cat-lying-on-the-ground-cat-blue-background-image_769640.jpg",
    alt: "Gatinho",
    category: "cats"
  },
  {
    id: 3,
    url: "https://static.vecteezy.com/ti/fotos-gratis/p1/8622755-husky-siberiano-segurando-brinquedo-na-boca-e-nadando-na-piscina-cachorro-cachorro-nadador-brincando-com-brinquedo-gratis-foto.jpg",
    alt: "Cachorro brincando",
    category: "dogs"
  },
  {
    id: 4,
    url: "https://static.vecteezy.com/ti/fotos-gratis/t2/22596365-triplo-fofa-branco-gatinho-isolado-em-azul-fundo-foto.jpg",
    alt: "Filhote de gato",
    category: "cats"
  },
  {
    id: 5,
    url: "https://img.freepik.com/fotos-premium/close-up-de-um-bolonka-bolonhesa-molhado-envolvido-em-uma-toalha-azul-em-uma-tabela-em-uma-clinica-veterinaria-cao-pequeno-foi-lavado-antes-de-cortar_199620-847.jpg?semt=ais_se_enriched&w=740&q=80",
    alt: "Banho e tosa",
    category: "services"
  },
  {
    id: 6,
    url: "https://s2-vidadebicho.glbimg.com/bEQ2051UTGHCbpM7SbMJATLg9t4=/0x0:1500x1200/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_fb623579cd474803aedbbbbae014af68/internal_photos/bs/2022/C/h/02JYmtSvGBwZumC2Hw1g/2022-03-11-quantas-vezes-ao-ano-devo-levar-pet-ao-veterinario-vida-de-bicho.jpeg",
    alt: "Consulta veterinária",
    category: "services"
  },
  {
    id: 7,
    url: "https://cdn.awsli.com.br/1832/1832576/produto/86966668/e72c31b08a.jpg",
    alt: "Cachorro no parque",
    category: "dogs"
  },
  {
    id: 8,
    url: "https://img.freepik.com/fotos-premium/gato-preto-e-branco-com-as-patas-levantadas-o-gato-esta-brincando-foco-seletivo_564806-3281.jpg?semt=ais_incoming&w=740&q=80",
    alt: "Gato brincando",
    category: "cats"
  },
  {
    id: 9,
    url: "https://socialbauru.com.br/wp-content/uploads/2024/05/tio-petisco-adestramento-pet-bauru-7.jpg",
    alt: "Adestramento",
    category: "services"
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isInView, setIsInView] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
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

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const handleVerMaisFotos = () => {
    // Scroll para o topo da galeria
    const element = document.getElementById('gallery');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    // Mostrar todas as categorias
    setSelectedCategory("all");
    toast.info("Mostrando todas as fotos!", {
      description: "Explore nossa galeria completa.",
      duration: 2000,
    });
  };
  
  return (
    <section id="gallery" className="py-20 bg-petshop-light/50 relative" ref={sectionRef}>
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full h-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-white"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-10 bg-petshop-primary mr-2"></div>
            <p className="text-petshop-primary font-medium">Nossa Galeria</p>
            <div className="h-1 w-10 bg-petshop-primary ml-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-petshop-dark">
            Momentos Especiais com Pets
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Confira fotos adoráveis dos nossos clientes peludos e dos cuidados que oferecemos a eles.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <div className="flex justify-center mb-10">
            <TabsList className="bg-petshop-light/70 border border-gray-200 p-1 rounded-full">
              <TabsTrigger 
                value="all" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-petshop-primary data-[state=active]:text-white"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger 
                value="dogs" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-petshop-primary data-[state=active]:text-white"
              >
                Cachorros
              </TabsTrigger>
              <TabsTrigger 
                value="cats" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-petshop-primary data-[state=active]:text-white"
              >
                Gatos
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-petshop-primary data-[state=active]:text-white"
              >
                Serviços
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-2xl shadow-md cursor-pointer group transition-all duration-500 hover:shadow-2xl
                    ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                      <p className="text-white/80 text-sm">MELHOR AMIGO</p>
                      <p className="text-white/60 text-xs mt-1">Clique para ampliar</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Lightbox Modal */}
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none [&>button]:hidden">
              {selectedImage && (
                <div className="relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-petshop-primary transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 backdrop-blur-sm"
                    aria-label="Fechar"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="relative rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm">
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.alt}
                      className="w-full h-auto max-h-[85vh] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                      <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.alt}</h3>
                      <p className="text-white/80">MELHOR AMIGO - {selectedImage.category === 'dogs' ? 'Cachorros' : selectedImage.category === 'cats' ? 'Gatos' : 'Serviços'}</p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </Tabs>
        
        <div className="text-center mt-12">
          <Button 
            onClick={handleVerMaisFotos}
            className="bg-petshop-secondary hover:bg-petshop-secondary/80 text-white rounded-full px-8 py-6 text-lg"
          >
            Ver Mais Fotos
          </Button>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="wavy-border w-full h-20 mt-20"></div>
    </section>
  );
};

export default Gallery;
