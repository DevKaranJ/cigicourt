import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({
  searchTerm,
  setSearchTerm,
  showNotifications,
  setShowNotifications,
  showProfileMenu,
  setShowProfileMenu,
}) => {
  return (
    <nav className="bg-white shadow-md h-16 fixed w-full z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faBalanceScale}
          className="text-2xl text-indigo-900"
        />
        <h1 className="text-xl font-semibold text-indigo-900">
          Court Clerk Portal
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search cases..."
            className="w-64 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-3 text-gray-400"
          />
        </div>
        <div className="relative">
          <button
            className="rounded-lg whitespace-nowrap relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FontAwesomeIcon icon={faBell} className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        <div className="relative">
          <button
            className="rounded-lg whitespace-nowrap flex items-center gap-2"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src="https://public.readdy.ai/ai/img_res/ca532c3181ac604f2c6056b96be02902.jpg"
              alt="Clerk Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>Sarah Anderson</span>
            <i className="fas fa-chevron-down text-sm"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;