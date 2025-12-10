
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  category: string;
  description: string;
}

const productList: Product[] = [
  {
    id: 1,
    name: "Ração Premium Cães",
    price: "R$ 89,90",
    priceNumber: 89.90,
    image: "https://petbox.vteximg.com.br/arquivos/ids/157398-1000-1000/5a656385743730a031ea754de3d1b2cedc1ad3e4.jpg?v=637335212210700000",
    category: "dogs",
    description: "Ração de alta qualidade para cachorros adultos de todas as raças."
  },
  {
    id: 2,
    name: "Ração Premium Gatos",
    price: "R$ 79,90",
    priceNumber: 79.90,
    image: "https://www.manpet.com.br/media/catalog/product/cache/a373030edf9fbba54651cb5aafeb15af/n/e/new_project_72__1_2_.jpg",
    category: "cats",
    description: "Ração de alta qualidade para gatos adultos de todas as raças."
  },
  {
    id: 3,
    name: "Cama para Cães",
    price: "R$ 129,90",
    priceNumber: 129.90,
    image: "https://m.magazineluiza.com.br/a-static/420x420/cama-cachorro-gato-caminha-pets-medios-ate-10-kg-cama-60x60cm-lavavel-com-ziper-azul-coroa-gv-enxovais/gvenxovais/15858085249/5564058c35610f1582854c9781b069ce.jpeg",
    category: "dogs",
    description: "Cama confortável para seu cão descansar com máximo conforto."
  },
  {
    id: 4,
    name: "Arranhador para Gatos",
    price: "R$ 99,90",
    priceNumber: 99.90,
    image: "https://cdn.leroymerlin.com.br/products/casa_para_gato_arranhador_com_rede_azul_lilies_moveis_1570552747_3d68_600x600.jpg",
    category: "cats",
    description: "Arranhador de sisal com base estável para seu gato exercitar as garras."
  },
  {
    id: 5,
    name: "Coleira Personalizada",
    price: "R$ 39,90",
    priceNumber: 39.90,
    image: "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/amorosso/catalog/kit/2.jpg",
    category: "accessories",
    description: "Coleira resistente e personalizada com o nome do seu pet."
  },
  {
    id: 6,
    name: "Kit de Higiene Pet",
    price: "R$ 59,90",
    priceNumber: 59.90,
    image: "https://m.media-amazon.com/images/I/61gC6rME9BL._AC_UF1000,1000_QL80_.jpg",
    category: "accessories",
    description: "Kit completo para higiene do seu animal de estimação."
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  const filteredProducts = selectedCategory === "all" 
    ? productList 
    : productList.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleVerCatalogo = () => {
    // Scroll para o topo da seção de produtos
    const element = document.getElementById('products');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    // Mostrar todos os produtos
    setSelectedCategory("all");
  };

  return (
    <section id="products" className="py-20 bg-petshop-light relative" ref={sectionRef}>
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
            <p className="text-petshop-primary font-medium">Nossos Produtos</p>
            <div className="h-1 w-10 bg-petshop-primary ml-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-petshop-dark">
            Produtos de Qualidade para seu Pet
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Encontre os melhores produtos para seu animal de estimação, selecionados com carinho pela equipe MELHOR AMIGO.
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
                value="accessories" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-petshop-primary data-[state=active]:text-white"
              >
                Acessórios
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id}
                  className={`overflow-hidden group hover:shadow-lg transition-all duration-300 border border-gray-100
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms`, transitionDuration: '500ms' }}
                >
                  <div className="h-56 overflow-hidden relative group/image rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Produto';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-petshop-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl transform group-hover:scale-110 transition-all duration-300 z-10">
                      {product.price}
                    </div>
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold text-petshop-dark shadow-lg">
                        Ver detalhes
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-petshop-dark mb-2 group-hover:text-petshop-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-petshop-secondary hover:bg-petshop-secondary/90 text-white rounded-full py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] font-semibold"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Adicionar ao Carrinho
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button 
            onClick={handleVerCatalogo}
            className="bg-petshop-primary hover:bg-petshop-primary/80 text-white rounded-full px-8 py-6 text-lg"
          >
            Ver Catálogo Completo
            <PawPrint className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
