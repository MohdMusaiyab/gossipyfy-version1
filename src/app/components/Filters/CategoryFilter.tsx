import React from 'react';

const CategoryFilter = ({
  selectedCategories,
  onChange
}: {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}) => {
  const categories = ['MUSIC', 'PODCAST', 'CONVERSATION', 'NEWS', 'EDUCATION','CONFESSION','OTHER'];

  const handleSelect = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onChange(updatedCategories);
  };

  return (
    <div className="mb-4 p-4 bg-gradient-to-br from-[#090919] to-[#161837] rounded-lg shadow-lg text-white">
      <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Filter by Category
      </h3>
      <div className="mt-3 space-y-2">
        {categories.map(category => (
          <label key={category} className="flex items-center space-x-3 text-sm md:text-base text-purple-200/80 hover:text-purple-400 transition">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleSelect(category)}
              className="accent-purple-500 text-purple-400 focus:ring-2 focus:ring-purple-500"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
