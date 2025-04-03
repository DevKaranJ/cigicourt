import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-white shadow-md h-16 fixed w-full z-50 flex items-center justify-between px-6">
      {/* Title */}
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faGavel} className="h-7" />
        <h1 className="text-xl font-semibold text-indigo-900">
          Digital Court System
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-xs mx-auto">
        <input
          type="text"
          placeholder="Search cases..."
          className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
      <div className="relative flex items-center gap-4">
        <button
          className="flex items-center gap-2 focus:outline-none"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img
            src="https://public.readdy.ai/ai/img_res/31a02a04f4e52dbb7835f107fd58a46a.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-800">
            Hon. William Mitchell
          </span>
          <i className="fas fa-chevron-down text-sm"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
