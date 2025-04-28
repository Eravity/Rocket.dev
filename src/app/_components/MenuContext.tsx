'use client';
import React, { createContext, useState, useMemo, useContext } from 'react';

// Create the context with a default value
const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
  openMenu: () => {},
  closeMenu: () => {},
});

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Create a memoized value to prevent unnecessary re-renders
  const menuContextValue = useMemo(() => ({
    isMenuOpen,
    toggleMenu: () => setIsMenuOpen(prev => !prev),
    openMenu: () => setIsMenuOpen(true),
    closeMenu: () => setIsMenuOpen(false),
  }), [isMenuOpen]);

  return (
    <MenuContext.Provider value={menuContextValue}>
      {children}
    </MenuContext.Provider>
  );
}

// Create a custom hook for consuming the context
export function useMenu() {
  return useContext(MenuContext);
}
