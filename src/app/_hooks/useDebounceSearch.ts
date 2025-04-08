'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that provides a debounced search functionality
 * @param initialValue The initial search term
 * @param delay The debounce delay in milliseconds
 * @returns An object containing the search term, debounced search term, and a function to set the search term
 */
export function useDebounceSearch(initialValue: string = '', delay: number = 300) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);

  // Effect for debouncing search term
  useEffect(() => {
    // Set searching state to true when typing starts
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }
    
    // Set a timeout to update the debounced value after delay
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, delay);

    // Clean up timeout if searchTerm changes before delay period
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, delay, debouncedSearchTerm]);

  // Function to reset search
  const resetSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setIsSearching(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching,
    resetSearch
  };
}
