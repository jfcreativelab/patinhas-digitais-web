import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Função para navegar (será injetada)
let navigateFunction: ((path: string) => void) | null = null;

export const setNavigateFunction = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Carregar carrinho do localStorage
  const loadCartFromStorage = (): CartItem[] => {
    try {
      const savedCart = localStorage.getItem('melhor-amigo-cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
    }
    return [];
  };

  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem('melhor-amigo-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage:', error);
    }
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        const updated = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success(`${product.name}`, {
          description: "Quantidade atualizada no carrinho!",
          duration: 2000,
        });
        return updated;
      } else {
        toast.success(`${product.name} adicionado ao carrinho!`, {
          description: "Continue comprando ou finalize seu pedido.",
          duration: 4000,
          action: {
            label: "Ver Carrinho",
            onClick: () => {
              if (navigateFunction) {
                navigateFunction('/cart');
              }
            },
          },
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item) {
        toast.info(`${item.name} removido do carrinho`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Carrinho limpo!");
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.priceNumber * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

