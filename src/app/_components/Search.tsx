'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div className="relative flex items-center">
      <input 
        type="text" 
        placeholder="Search articles"
        className="border-2 rounded-xl w-[300px] p-1" 
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
