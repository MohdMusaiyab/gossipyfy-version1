// src/app/explore/LanguageFilter.tsx

import React from 'react';

const LanguageFilter = ({
  selectedLanguages,
  onChange
}: {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
}) => {
  const languages = ['ENGLISH', 'HINDI', 'BHOJPURI', 'OTHER'];

  const handleSelect = (lang: string) => {
    const updatedLanguages = selectedLanguages.includes(lang)
      ? selectedLanguages.filter(l => l !== lang)
      : [...selectedLanguages, lang];
    onChange(updatedLanguages);
  };

  return (
    <div className="mb-4 p-4 bg-gradient-to-br from-[#090919] to-[#161837] rounded-lg shadow-lg text-white">
      <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Filter by Language
      </h3>
      <div className="mt-3 space-y-2">
        {languages.map(lang => (
          <label key={lang} className="flex items-center space-x-3 text-sm md:text-base text-purple-200/80 hover:text-purple-400 transition">
            <input
              type="checkbox"
              checked={selectedLanguages.includes(lang)}
              onChange={() => handleSelect(lang)}
              className="accent-purple-500 text-purple-400 focus:ring-2 focus:ring-purple-500"
            />
            <span>{lang}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;
