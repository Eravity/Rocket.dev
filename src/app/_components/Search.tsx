'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search..."
        className="border-2 rounded-xl w-[200px] p-1" 
      />
      <button 
        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-blueLotus rounded-lg"
        onClick={() => console.log('Search clicked')}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
