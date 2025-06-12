"use client";

import { useState, KeyboardEvent } from 'react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // TODO: Implement search logic
      console.log('Searching for:', searchQuery);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex rounded-lg mx-4 sm:mx-6 md:mx-0 focus-within:ring-2 focus-within:ring-blueLotus">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search articles"
          className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
          aria-label="Search articles"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blueLotus text-white rounded-r-lg hover:bg-opacity-90 flex items-center border-y border-r"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

const SearchIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    cursor="pointer"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
