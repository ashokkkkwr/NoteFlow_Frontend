import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type of context properties
interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Create the context with an initial undefined value
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Custom hook to use the Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Sidebar provider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
