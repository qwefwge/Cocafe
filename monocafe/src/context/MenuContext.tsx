import React, { createContext, useContext, useState } from 'react';
import { MENU_ITEMS as INITIAL_ITEMS, MENU_CATEGORIES } from '@/data/mock';

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  calories: number;
  image: string;
  tags: string[];
  allergens: string[];
  description: string;
}

interface MenuContextType {
  items: MenuItem[];
  categories: typeof MENU_CATEGORIES;
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);

  const addItem = (newItem: Omit<MenuItem, 'id'>) => {
    const item = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems((prev) => [...prev, item]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ items, categories: MENU_CATEGORIES, addItem, deleteItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
