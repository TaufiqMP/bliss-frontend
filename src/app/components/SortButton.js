"use client";

import { useState, useRef, useEffect } from "react";
import { MdSort } from "react-icons/md";

const sortOptions = [
  { label: "Default", value: "" },
  { label: "Alphabet", value: "name" },
  { label: "Status", value: "status" },
  { label: "Status Reverse", value: "status_reverse" },
  { label: "Score High to Low", value: "score_desc" },
  { label: "Score Low to High", value: "score_asc" }
];

export default function SortButton({ onSort, sortState }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option) {
    setSelected(option);
    setOpen(false);
    if (onSort) onSort(option.value);
  }

  return (
    <div className="flex flex-1 justify-end items-center w-full" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-[#31004A] text-white rounded-md hover:bg-[#3C0075] transition-all shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <MdSort className="text-xl" />
        <span className="text-sm font-medium">{selected.label}</span>
        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute text-black right-0 mt-40 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selected.value === option.value ? "bg-gray-100 font-semibold" : ""
                }`}
              onClick={() => handleSelect(option)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}