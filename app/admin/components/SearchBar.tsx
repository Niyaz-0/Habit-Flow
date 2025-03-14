// app/admin/components/SearchBar.tsx
"use client";
import { useState } from "react";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterColumn: string;
  setFilterColumn: (value: string) => void;
};

export default function SearchBar({ searchTerm, setSearchTerm, filterColumn, setFilterColumn }: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const columns = ["username", "clerkUserId", "emailAddress", "role", "active"];

  return (
    <div className="flex items-center mb-4">
      <input 
         type="text"
         placeholder="Search..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         className="p-2 border border-gray-300 rounded flex-grow"
      />
      <div className="relative ml-2">
        <button onClick={() => setShowDropdown(!showDropdown)} className="p-2 border border-gray-300 rounded">
          Filter: {filterColumn}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow z-10">
            {columns.map((col) => (
              <div 
                key={col}
                onClick={() => {
                  setFilterColumn(col);
                  setShowDropdown(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {col}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
