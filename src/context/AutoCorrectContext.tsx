import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AutoCorrectContextProps {
  isAutoCorrectOn: boolean;
  setIsAutoCorrectOn: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAutoCorrect: () => void;
}

const AutoCorrectContext = createContext<AutoCorrectContextProps | undefined>(undefined);

export const AutoCorrectProvider = ({ children }: { children: ReactNode }) => {
    const [isAutoCorrectOn, setIsAutoCorrectOn] = useState(() => {
        const saved = localStorage.getItem('isAutoCorrectOn');
        return saved === null ? false : JSON.parse(saved);
      });
      const toggleAutoCorrect = () => {
        setIsAutoCorrectOn((prev: any) => {
          const newValue = !prev;
          localStorage.setItem('isAutoCorrectOn', JSON.stringify(newValue));
          return newValue;
        });
      };
  return (
    <AutoCorrectContext.Provider value={{ isAutoCorrectOn, toggleAutoCorrect, setIsAutoCorrectOn }}>
      {children}
    </AutoCorrectContext.Provider>
  );
};

// Example usage of the context
export const useAutoCorrect = () => {
  const context = useContext(AutoCorrectContext);
  if (context === undefined) {
    throw new Error('useAutoCorrect must be used within an AutoCorrectProvider');
  }
  return context;
};
