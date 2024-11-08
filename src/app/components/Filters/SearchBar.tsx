"use client"
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="mb-8 w-full max-w-lg mx-auto ">
      <div className="flex">
        <motion.input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by title or description"
          className="w-full p-3 rounded-l-lg text-white bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 placeholder-white shadow-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.button
          onClick={handleSearch}
          className="px-6 py-3 rounded-r-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>
    </div>
  );
};

export default SearchBar;
