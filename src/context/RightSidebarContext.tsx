import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type of context properties
interface RightSidebarContextProps {
  isRightSidebarOpen: boolean;
  toggleRightSidebar: () => void;
}

// Create the context with an initial undefined value
const RightSidebarContext = createContext<RightSidebarContextProps | undefined>(undefined);

// Custom hook to use the Sidebar context
export const useRightSidebar = () => {
  const context = useContext(RightSidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Sidebar provider component
export const RightSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen((prev) => !prev);
  };

  return (
    <RightSidebarContext.Provider value={{ isRightSidebarOpen, toggleRightSidebar }}>
      {children}
    </RightSidebarContext.Provider>
  );
};
