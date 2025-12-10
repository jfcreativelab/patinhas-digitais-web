
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create animated paw prints
    const createPawPrint = () => {
      const paw = document.createElement('div');
      paw.className = 'paw-print animate-paw-walk';
      
      // Randomize position and size
      const size = Math.random() * (50 - 30) + 30;
      const yPos = Math.random() * (window.innerHeight - 200);
      
      paw.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="${Math.random() > 0.5 ? '#3B82F6' : '#60A5FA'}">
          <path d="M50,27.5C56.9,27.5,62.5,21.9,62.5,15S56.9,2.5,50,2.5S37.5,8.1,37.5,15S43.1,27.5,50,27.5z M25,40
            c6.9,0,12.5-5.6,12.5-12.5S31.9,15,25,15S12.5,20.6,12.5,27.5S18.1,40,25,40z M75,40c6.9,0,12.5-5.6,12.5-12.5S81.9,15,75,15
            S62.5,20.6,62.5,27.5S68.1,40,75,40z M87.5,52.5c0-6.9-5.6-12.5-12.5-12.5S62.5,45.6,62.5,52.5S68.1,65,75,65
            S87.5,59.4,87.5,52.5z M25,65c6.9,0,12.5-5.6,12.5-12.5S31.9,40,25,40S12.5,45.6,12.5,52.5S18.1,65,25,65z M50,65
            c-11.8,0-22.8,6.3-28.7,16.5c-1.1,1.9-1.1,4.3,0,6.2C22.2,89.6,23.9,91,26,91.7c4.9,1.6,10.2,2.5,15.9,2.5
            c10.9,0,20.9-3.9,27.2-10.4c1.3-1.3,2-3.2,2-5c0-1.8-0.8-3.6-2-5C64.9,69.2,57.7,65,50,65L50,65z"/>
        </svg>
      `;
      
      paw.style.bottom = `${yPos}px`;
      paw.style.left = '-50px';
      
      document.body.appendChild(paw);
      
      // Remove the paw print after animation completes
      setTimeout(() => {
        paw.remove();
      }, 15000);
    };
    
    // Create paw prints at intervals
    const pawInterval = setInterval(createPawPrint, 8000);
    
    // Create initial paw prints
    for (let i = 0; i < 3; i++) {
      setTimeout(createPawPrint, i * 2000);
    }
    
    return () => clearInterval(pawInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-16 sm:pt-20 flex items-center relative overflow-hidden bg-gradient-to-b from-petshop-light to-white">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 flex flex-col md:flex-row items-center">
        <div className={`w-full md:w-1/2 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-petshop-dark mb-3 sm:mb-4 leading-tight">
            Cuidado e carinho para seu <span className="text-petshop-primary">melhor amigo</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
            Oferecemos os melhores serviços e produtos para garantir a saúde e felicidade do seu pet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('services');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="bg-petshop-primary hover:bg-petshop-primary/90 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 font-semibold w-full sm:w-auto"
            >
              Nossos Serviços
            </Button>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              variant="outline" 
              className="border-2 border-petshop-primary text-petshop-primary hover:bg-petshop-primary hover:text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all transform hover:scale-105 font-semibold w-full sm:w-auto"
            >
              Agendar Visita
            </Button>
          </div>
          
          <div className="flex items-center mt-8 sm:mt-12 animate-fade-in-up">
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-md hover:scale-110 transition-transform cursor-pointer"
                  style={{ zIndex: 5 - i }}
                >
                  <img 
                    src={`https://randomuser.me/api/portraits/women/${i + 20}.jpg`} 
                    alt="Cliente satisfeito" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="ml-2 sm:ml-4">
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Mais de 500 avaliações positivas</p>
            </div>
          </div>
        </div>
        
        <div className={`w-full md:w-1/2 mt-8 sm:mt-12 md:mt-0 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'}`}>
          <div className="relative">
            <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 bg-petshop-secondary rounded-full opacity-30 floating"></div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-16 h-16 sm:w-24 sm:h-24 bg-petshop-primary rounded-full opacity-30 bouncing"></div>
            
            <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Cachorro feliz" 
                loading="eager"
                className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                <div className="flex items-center">
                  <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 text-white mr-2" />
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Tosa e banho com carinho</h3>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-12 right-2 sm:right-4 md:right-12 p-2 sm:p-3 md:p-4 bg-white rounded-xl sm:rounded-2xl shadow-lg w-40 sm:w-48 md:w-52 bouncing z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-petshop-primary flex items-center justify-center flex-shrink-0">
                    <PawPrint className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-3 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-tight truncate">Pet feliz</p>
                    <p className="text-xs sm:text-sm font-bold text-petshop-dark leading-tight">+2.500</p>
                  </div>
                </div>
                <div className="bg-petshop-primary/10 rounded-full p-1.5 sm:p-2 ml-1 sm:ml-2 flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-petshop-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
