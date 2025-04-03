// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFolder, faExclamationCircle, faClock, faCheckCircle, faTasks } from "@fortawesome/free-solid-svg-icons";
// import CaseChart from "./CaseChart";

// const Sidebar = ({ caseComplexity, setCaseComplexity }) => {
//   return (
//     <aside className="w-64 bg-white h-[80%] fixed shadow-lg mt-7 p-4 ">
//       <div className="flex flex-col gap-4 mb-6">
//         <button className="flex items-center gap-2 text-indigo-900 font-medium">
//           <FontAwesomeIcon icon={faFolder} className="text-black" /> All Cases
//         </button>
//         <button className="flex items-center gap-2 text-indigo-900 font-medium">
//           <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" /> Urgent Cases
//         </button>
//         <button className="flex items-center gap-2 text-indigo-900 font-medium">
//           <FontAwesomeIcon icon={faClock} className="text-yellow-500" /> Pending Cases
//         </button>
//         <button className="flex items-center gap-2 text-indigo-900 font-medium">
//           <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /> Completed Cases
//         </button>

//         {/* Case Complexity Dropdown */}
//         <div className="relative">
//           <button className="flex items-center gap-2 text-indigo-900 font-medium">
//             <FontAwesomeIcon icon={faTasks} className="text-pink-900" /> Case Complexity
//           </button>
//           <select
//             className="mt-2 bg-white border rounded-lg px-4 py-2 w-full"
//             value={caseComplexity}
//             onChange={(e) => setCaseComplexity(e.target.value)}
//           >
//             <option value="Select">All Cases</option>
//             <option value="high">High Complexity</option>
//             <option value="medium">Medium Complexity</option>
//             <option value="low">Low Complexity</option>
//           </select>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <CaseChart />
//     </aside>
//   );
// };

// export default Sidebar;


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faExclamationCircle, faClock, faCheckCircle, faTasks } from "@fortawesome/free-solid-svg-icons";
import CaseChart from "./CaseChart";
const Sidebar = ({ caseComplexity, setCaseComplexity, caseCounts }) => {
  return (
    <aside className="w-64 bg-white h-[80%] fixed shadow-lg mt-7 p-4">
      <div className="flex flex-col gap-4 mb-6">
        {/* All Cases */}
        <button className="flex justify-between items-center text-indigo-900 font-medium">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFolder} className="text-black" /> All Cases
          </span>
          <span className="text-gray-600">{caseCounts.all}</span>
        </button>

        {/* Urgent Cases */}
        <button className="flex justify-between items-center text-indigo-900 font-medium">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" /> Urgent Cases
          </span>
          <span className="text-red-600">{caseCounts.urgent}</span>
        </button>

        {/* Pending Cases */}
        <button className="flex justify-between items-center text-indigo-900 font-medium">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-yellow-500" /> Pending Cases
          </span>
          <span className="text-yellow-600">{caseCounts.pending}</span>
        </button>

        {/* Completed Cases */}
        <button className="flex justify-between items-center text-indigo-900 font-medium">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /> Completed Cases
          </span>
          <span className="text-green-600">{caseCounts.completed}</span>
        </button>

        {/* Case Complexity Dropdown (No Numbers Here) */}
        <div className="relative">
          <button className="flex items-center gap-2 text-indigo-900 font-medium">
            <FontAwesomeIcon icon={faTasks} className="text-pink-900" /> Case Complexity
          </button>
          <select
            className="mt-2 bg-white border rounded-lg px-4 py-2 w-full"
            value={caseComplexity}
            onChange={(e) => setCaseComplexity(e.target.value)}
          >
            <option value="Select">All Cases</option>
            <option value="high">High Complexity</option>
            <option value="medium">Medium Complexity</option>
            <option value="low">Low Complexity</option>
          </select>
        </div>
      </div>

      {/* Pie Chart */}
      <CaseChart />
    </aside>
  );
};

export default Sidebar;
