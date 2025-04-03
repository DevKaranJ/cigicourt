import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faClock,
  faCheck,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"; 

const CaseList = ({ cases, selectedCase, setSelectedCase,setShowNewFilingModal }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filing Queue</h2>
        <button
          className="rounded-md whitespace-nowrap px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => setShowNewFilingModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          New Filing
        </button>
      </div>

      <div className="space-y-4">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedCase?.id === caseItem.id
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-300"
            }`}
            onClick={() => setSelectedCase(caseItem)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{caseItem.id}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  caseItem.status === "Pending Filing"
                    ? "bg-blue-100 text-blue-600"
                    : caseItem.status === "Filed"
                    ? "bg-green-100 text-green-600"
                    : caseItem.status === "Scheduled"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {caseItem.status}
              </span>
            </div>
            <h3 className="font-semibold mb-1 text-lg">{caseItem.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>{caseItem.caseType}</span>
              <span>Filing Fee: ₹{caseItem.filingFee}</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Parties: </span>
              <span
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPartyModal({
                    type: "A",
                    data: caseItem.partyAContact,
                  });
                }}
              >
                {caseItem.partyA}
              </span>
              {" vs. "}
              <span
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPartyModal({
                    type: "B",
                    data: caseItem.partyBContact,
                  });
                }}
              >
                {caseItem.partyB}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseList;
