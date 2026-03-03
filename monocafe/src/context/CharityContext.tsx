import React, { createContext, useContext, useState } from 'react';
import { CHARITY_DATA as INITIAL_DATA } from '@/data/mock';

interface CharityOption {
  id: number;
  name: string;
  votes: number;
}

interface CharityContextType {
  raised: number;
  goal: number;
  cause: string;
  options: CharityOption[];
  addDonation: (amount: number) => void;
  voteForCause: (id: number) => void;
}

const CharityContext = createContext<CharityContextType | undefined>(undefined);

export function CharityProvider({ children }: { children: React.ReactNode }) {
  const [raised, setRaised] = useState(INITIAL_DATA.raised);
  const [options, setOptions] = useState(INITIAL_DATA.options);
  
  const addDonation = (amount: number) => {
    setRaised(prev => prev + amount);
  };

  const voteForCause = (id: number) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    ));
  };

  return (
    <CharityContext.Provider value={{
      raised,
      goal: INITIAL_DATA.goal,
      cause: INITIAL_DATA.cause,
      options,
      addDonation,
      voteForCause
    }}>
      {children}
    </CharityContext.Provider>
  );
}

export function useCharity() {
  const context = useContext(CharityContext);
  if (context === undefined) {
    throw new Error('useCharity must be used within a CharityProvider');
  }
  return context;
}
