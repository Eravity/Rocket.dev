'use client'
import { createContext, useContext, useState, useMemo } from 'react';

type SearchContextType = {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContextValue = useMemo(() => ({
    isSearchOpen,
    setIsSearchOpen,
  }), [isSearchOpen]);

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
