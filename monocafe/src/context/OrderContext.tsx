import React, { createContext, useContext, useState } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed';
  paymentMethod: 'card' | 'qr' | 'cash' | 'wallet';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, paymentMethod: 'card' | 'qr' | 'cash' | 'wallet') => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  stats: {
    totalRevenue: number;
    totalOrders: number;
  };
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([
    // Initial mock data for "history"
    {
      id: '1024',
      items: [{ id: '1', name: 'Turkey Avocado Wrap', price: 6.50, quantity: 1, image: '' }],
      total: 8.50,
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: 'Ready',
      paymentMethod: 'card'
    }
  ]);

  const addOrder = (items: CartItem[], total: number, paymentMethod: 'card' | 'qr' | 'cash' | 'wallet') => {
    const newOrder: Order = {
      id: Math.floor(Math.random() * 10000).toString(),
      items,
      total,
      date: new Date().toISOString(),
      status: 'Pending',
      paymentMethod
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const stats = {
    totalRevenue: orders.reduce((acc, curr) => acc + curr.total, 0),
    totalOrders: orders.length
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, stats }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrderProvider');
  }
  return context;
}
