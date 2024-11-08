import React, { useState } from 'react';
import Link from "next/link";
import { Menu, X } from 'lucide-react';
import LanguageFilter from "./Filters/LanguageFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import UploadModal from "./UploadModal";

const Sidebar = ({
  selectedLanguages,
  onLanguageChange,
  selectedCategories,
  onCategoryChange,
}: {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsMobileOpen(!isMobileOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between md:hidden p-4">
        <h2 className="text-[#E9D5FF] font-semibold text-lg">Filters</h2>
        <button
          onClick={toggleSidebar}
          className="text-[#E9D5FF] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 p-4">
        <LanguageFilter
          selectedLanguages={selectedLanguages}
          onChange={onLanguageChange}
        />
        <CategoryFilter
          selectedCategories={selectedCategories}
          onChange={onCategoryChange}
        />
        <div className="space-y-4">
          <UploadModal />
          <Link 
            href="/explore/my-followings"
            className="block w-full text-center py-2 px-4 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-medium hover:opacity-90 transition-opacity"
          >
            My Followings
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 md:hidden z-30 p-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-lg hover:opacity-90 transition-opacity"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-[#090919] to-[#161837] border-r border-[rgba(139,92,246,0.3)] shadow-lg">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleSidebar}
        />
        
        {/* Mobile Sidebar Content */}
        <aside className="absolute right-0 h-full w-80 bg-gradient-to-br from-[#090919] to-[#161837] shadow-lg">
          <SidebarContent />
        </aside>
      </div>
    </>
  );
};

export default Sidebar;