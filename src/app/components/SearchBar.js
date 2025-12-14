"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ nasabahData, onResultChange }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = !value
      ? nasabahData
      : nasabahData.filter((nasabah) =>
          nasabah.first_name.toLowerCase().includes(value.toLowerCase()) ||
          nasabah.last_name.toLowerCase().includes(value.toLowerCase()) ||
          nasabah.email.toLowerCase().includes(value.toLowerCase()) ||
          nasabah.phone_number.toLowerCase().includes(value.toLowerCase()) ||
          nasabah.status.toLowerCase().includes(value.toLowerCase())
        );
    onResultChange(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-start items-center w-full flex-1"
    >
      <div className="flex items-center w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#31004A] transition-all">
        <FaSearch className="text-gray-400 mr-2" type="submit" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          className="w-full outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
    </form>
  );
}
