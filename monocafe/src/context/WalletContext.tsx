import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  balance: number;
  addFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(25.50); // Initial balance for demo
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'credit', amount: 20, date: 'Oct 12', description: 'Cash Top-up' },
    { id: '2', type: 'debit', amount: 8.50, date: 'Oct 12', description: 'Order #1024' },
  ]);

  const addFunds = (amount: number) => {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'credit',
        amount,
        date: 'Today',
        description: 'Cash Top-up',
      },
      ...prev,
    ]);
  };

  const deductFunds = (amount: number) => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      setTransactions((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          type: 'debit',
          amount,
          date: 'Today',
          description: 'Order Payment',
        },
        ...prev,
      ]);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{ balance, addFunds, deductFunds, transactions }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
