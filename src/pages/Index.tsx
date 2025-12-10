
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Gallery from "@/components/Gallery";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  // Update title
  useEffect(() => {
    document.title = "MELHOR AMIGO - Cuidado e Carinho para seu Melhor Amigo";
  }, []);

  // Paw print animation
  const [pawPrints, setPawPrints] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const createRandomPawPrint = () => {
      const id = Date.now();
      const size = Math.floor(Math.random() * 30) + 20; // 20-50px
      const left = Math.floor(Math.random() * 90) + 5; // 5-95%
      const duration = Math.floor(Math.random() * 5) + 10; // 10-15s
      const rotation = Math.floor(Math.random() * 40) - 20; // -20 to 20 degrees
      const delay = Math.floor(Math.random() * 2); // 0-2s
      const pawType = Math.random() > 0.5 ? 'dog' : 'cat';
      
      return (
        <div 
          key={id}
          className="paw-print"
          style={{
            position: 'fixed',
            left: `${left}%`,
            bottom: '-50px',
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${rotation}deg)`,
            animation: `paw-walk ${duration}s linear ${delay}s forwards`,
            zIndex: -1
          }}
        >
          {pawType === 'dog' ? (
            <svg viewBox="0 0 100 100" fill={`rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`}>
              <path d="M50,20 C55.523,20 60,15.523 60,10 C60,4.477 55.523,0 50,0 C44.477,0 40,4.477 40,10 C40,15.523 44.477,20 50,20 Z M20,50 C25.523,50 30,45.523 30,40 C30,34.477 25.523,30 20,30 C14.477,30 10,34.477 10,40 C10,45.523 14.477,50 20,50 Z M80,50 C85.523,50 90,45.523 90,40 C90,34.477 85.523,30 80,30 C74.477,30 70,34.477 70,40 C70,45.523 74.477,50 80,50 Z M35,80 C40.523,80 45,75.523 45,70 C45,64.477 40.523,60 35,60 C29.477,60 25,64.477 25,70 C25,75.523 29.477,80 35,80 Z M65,80 C70.523,80 75,75.523 75,70 C75,64.477 70.523,60 65,60 C59.477,60 55,64.477 55,70 C55,75.523 59.477,80 65,80 Z M50,100 C63,100 73,90 73,80 C73,70 60,66 50,66 C40,66 27,70 27,80 C27,90 37,100 50,100 Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" fill={`rgba(96, 165, 250, ${Math.random() * 0.3 + 0.1})`}>
              <path d="M25,25 C30,10 20,5 10,15 C0,25 5,35 20,30 C15,45 25,50 35,40 C45,30 40,20 25,25 M75,25 C70,10 80,5 90,15 C100,25 95,35 80,30 C85,45 75,50 65,40 C55,30 60,20 75,25 M25,75 C30,60 20,55 10,65 C0,75 5,85 20,80 C15,95 25,100 35,90 C45,80 40,70 25,75 M75,75 C70,60 80,55 90,65 C100,75 95,85 80,80 C85,95 75,100 65,90 C55,80 60,70 75,75" />
            </svg>
          )}
        </div>
      );
    };
    
    // Initial paws
    const initialPaws = Array(4).fill(0).map(() => createRandomPawPrint());
    setPawPrints(initialPaws);
    
    // Add new paw print periodically
    const interval = setInterval(() => {
      setPawPrints(prev => {
        // Remove old paws if too many
        if (prev.length > 15) {
          const newPaws = [...prev];
          newPaws.shift();
          return [...newPaws, createRandomPawPrint()];
        }
        return [...prev, createRandomPawPrint()];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-petshop-light overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <Features />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
      <ScrollToTop />
      
      {/* Floating paw prints */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {pawPrints}
      </div>
    </div>
  );
};

export default Index;
