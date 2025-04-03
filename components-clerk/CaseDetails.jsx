import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCalendar,
  faTrashAlt,
  faTimes,
  faDownload,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import ScheduleHearing from "./ScheduleHearing";
import  SuccessModal1 from "./Success/SuccessFiling";

const CaseDetails = ({ selectedCase, handleDeleteCase, setShowPartyModal }) => {
  const [showScheduleHearing, setShowScheduleHearing] = useState(false);
  const [showSuccessModal1, setShowSuccessPage] = useState(false);

  const handleScheduleHearing = (date, time) => {
    console.log("Scheduled Hearing:", { date, time });
    alert(`Hearing scheduled for ${date} at ${time}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {selectedCase ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{selectedCase.title}</h2>
            <div className="flex gap-2">
              <button className="rounded-lg whitespace-nowrap px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 text-sm"
              onClick={() => setShowSuccessPage(true)}>
                <FontAwesomeIcon icon={faCheck} className="mr-1" />
                Approve Filing
              </button>

              {/* Schedule Hearing Button */}
              <button
                className="rounded-lg whitespace-nowrap px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-sm"
                onClick={() => setShowScheduleHearing(true)} // Open the modal
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                Schedule Hearing
              </button>
            </div>
          </div>

          {/* Case Information and Parties */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Case Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-md">Case Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Case Type:</span>
                    <span className="font-medium">{selectedCase.caseType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Filing Date:</span>
                    <span className="font-medium">{selectedCase.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Filing Fee:</span>
                    <span className="font-medium">
                      ₹{selectedCase.filingFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned Judge:</span>
                    <span className="font-medium">
                      {selectedCase.assignedJudge}
                    </span>
                  </div>
                  {selectedCase.nextHearing && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Hearing:</span>
                      <span className="font-medium">
                        {selectedCase.nextHearing}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Parties Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-md">Parties</h3>
                  {/* Smaller Delete Filing Button */}
                  <button
                    className="rounded-lg whitespace-nowrap px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 text-sm"
                    onClick={() => handleDeleteCase(selectedCase.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
                    Delete Filing
                  </button>
                </div>
                <div className="space-y-3">
                  {/* Party A */}
                  <div
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      setShowPartyModal({
                        type: "A",
                        data: selectedCase.partyAContact,
                      })
                    }
                  >
                    <div className="font-medium text-sm">Party A</div>
                    <div className="text-gray-600 text-sm">
                      {selectedCase.partyA}
                    </div>
                  </div>

                  {/* Party B */}
                  <div
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      setShowPartyModal({
                        type: "B",
                        data: selectedCase.partyBContact,
                      })
                    }
                  >
                    <div className="font-medium text-sm">Party B</div>
                    <div className="text-gray-600 text-sm">
                      {selectedCase.partyB}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Document Verification */}
            <div>
              <h3 className="font-semibold mb-3 text-md">
                Document Verification
              </h3>
              <div className="space-y-3">
                {selectedCase.documents.map((doc, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{doc.name}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          doc.status === "Verified"
                            ? "bg-green-100 text-green-600"
                            : doc.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      Uploaded: {doc.uploadDate}
                    </div>
                    {/* Stacked Buttons */}
                    <div className="flex flex-col gap-2">
                      <button className="rounded-lg whitespace-nowrap text-md px-3 py-1.5 bg-green-500 text-white hover:bg-green-600 flex items-center justify-center ">
                        <FontAwesomeIcon icon={faCheck} className="mr-1" />
                        Verify
                      </button>
                      <button className="rounded-lg whitespace-nowrap text-md px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faTimes} className="mr-1" />
                        Reject
                      </button>
                      <button className="rounded-lg whitespace-nowrap text-md px-3 py-1.5 bg-gray-500 text-white hover:bg-gray-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faDownload} className="mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showSuccessModal1 && (
            <SuccessModal1
             onClose={() => setShowSuccessPage(false)}
             onSchedule={handleScheduleHearing}
            />
          )}

          {showScheduleHearing && (
            <ScheduleHearing
              onClose={() => setShowScheduleHearing(false)} // Close the modal
              onSchedule={handleScheduleHearing} // Handle scheduling
            />
          )}
        </>
      ) : (
        <div className=" flex flex-col items-center justify-center h-full text-center text-gray-500 py-12">
          <FontAwesomeIcon icon={faFolderOpen} className="text-3xl" />
          <p className="text-center text-gray-500  text-lg">
            Select a case to view details
          </p>
        </div>
      )}
    </div>
  );
};

export default CaseDetails;
