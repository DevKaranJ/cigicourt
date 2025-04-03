import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFile,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";

import { faCheckDouble,faIndianRupee } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <aside className="w-64 bg-white h-[85%] mt-4 fixed shadow-lg">
      <div className="p-4">
        <div className="space-y-2">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
              selectedTab === "all"
                ? "bg-indigo-100 text-indigo-900"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab("all")}
          >
            <FontAwesomeIcon icon={faFolder} />
            <span>All Filings</span>
            <span className="ml-auto bg-gray-200 px-2 rounded-full text-sm">
              35
            </span>
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
              selectedTab === "pending"
                ? "bg-indigo-100 text-indigo-900"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab("pending")}
          >
            <FontAwesomeIcon icon={faFile} className="text-blue-500" />
            <span>Pending Filing</span>
            <span className="ml-auto bg-blue-100 text-blue-600 px-2 rounded-full text-sm">
              12
            </span>
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
              selectedTab === "verification"
                ? "bg-indigo-100 text-indigo-900"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab("verification")}
          >
            <FontAwesomeIcon icon={faCheckDouble} className="text-orange-500" />
            <span>Need Verification</span>
            <span className="ml-auto bg-orange-100 text-orange-600 px-2 rounded-full text-sm">
              8
            </span>
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
              selectedTab === "scheduled"
                ? "bg-indigo-100 text-indigo-900"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab("scheduled")}
          >
            <FontAwesomeIcon icon={faCalendar} className="text-green-500" />
            <span>Scheduled</span>
            <span className="ml-auto bg-green-100 text-green-600 px-2 rounded-full text-sm">
              15
            </span>
          </button>

          <button
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
              selectedTab === "fees"
                ? "bg-indigo-100 text-indigo-900"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTab("fees")}
          >
            <FontAwesomeIcon icon={faIndianRupee} className="text-indigo-500" />
            <span>Fee Collection</span>
            <span className="ml-auto bg-purple-100 text-purple-600 px-2 rounded-full text-sm">
              5
            </span>
          </button>
          
        </div>
        <div id="caseChart" style={{ width: "100%", height: "200px" }}></div>
      </div>
    </aside>
  );
};

export default Sidebar;
