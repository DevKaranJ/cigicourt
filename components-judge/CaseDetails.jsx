import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JudgmentModal from "./JudgmentModal";
import ScheduleHearingModal from "./ScheduleHearingModal";

import {
  faGavel,
  faCalendar,
  faCheck,
  faTimes,
  faRobot,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

const CaseDetails = ({ selectedCase }) => {
  const [isJudgmentModalOpen, setIsJudgmentModalOpen] = useState(false);
  const [isHearingModalOpen, setIsHearingModalOpen] = useState(false);
  const [buttonStates, setButtonStates] = useState({});
  const [acceptedRecommendations, setAcceptedRecommendations] = useState([]);

  // Reset buttonStates and accepted recommendations when selectedCase changes

  useEffect(() => {
    setButtonStates({});
    setAcceptedRecommendations([]);
  }, [selectedCase]);

  const handleButtonClick = (index, type, recommendation) => {
    setButtonStates((prev) => ({
      ...prev,
      [index]: type,
    }));

    if (type === "accept") {
      setAcceptedRecommendations((prev) => [...prev, recommendation]);
    } else if (type === "reject") {
      setAcceptedRecommendations((prev) =>
        prev.filter((rec) => rec !== recommendation)
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-1/2 h-full overflow-hidden">
      {selectedCase ? (
        <>
          <h2 className="text-xl font-semibold">{selectedCase.title}</h2>
          <p className="text-gray-600">{selectedCase.details}</p>

          {/* Judgment & Hearing Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsJudgmentModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <FontAwesomeIcon icon={faGavel} className="text-white mr-1" />
              Make Judgment
            </button>
            <button
              onClick={() => setIsHearingModalOpen(true)} // Open the hearing modal
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              <FontAwesomeIcon icon={faCalendar} className="text-white mr-1" />
              Schedule Hearing
            </button>
          </div>

          <div className="mt-4 max-h-full overflow-y-auto p-2">
            {/* AI Case Analysis */}
            <h3 className="font-semibold mt-6">AI Case Analysis</h3>
            <p className="text-gray-600 mt-2 bg-gray-100 rounded-md p-3">
              The AI has analyzed case records, legal precedents, and relevant
              laws to assist in decision-making.
            </p>

            {/* AI Recommendations */}
            <div className="flex items-center justify-between mt-6">
              <h3 className="font-semibold">AI Recommendations</h3>
            </div>

            <ul className="mt-2 space-y-4">
              {selectedCase.recommendations?.map((rec, index) => (
                <li
                  key={index}
                  className="p-3 border rounded-lg shadow-sm bg-white"
                >
                  {/* Robot Icon and Recommendation Text */}
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faRobot}
                      className="text-gray-500 text-lg"
                    />
                    <span>{rec}</span>
                  </div>

                  {/* Accept & Reject Buttons Below Recommendation */}
                  <div className="flex m-auto gap-2 mt-1">
                    <button
                      className={`${
                        buttonStates[index] === "accept"
                          ? "bg-gray-400 hover:bg-gray-400"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white px-3 py-1 rounded-lg text-sm transition`}
                      onClick={() => handleButtonClick(index, "accept", rec)}
                      disabled={buttonStates[index] !== undefined} // Disable if either button is clicked
                    >
                      <FontAwesomeIcon icon={faCheck} className="mr-1" />
                      {buttonStates[index] === "accept" ? "Accepted" : "Accept"}
                    </button>
                    <button
                      className={`${
                        buttonStates[index] === "reject"
                          ? "bg-gray-400 hover:bg-gray-400"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white px-3 py-1 rounded-lg text-sm transition`}
                      onClick={() => handleButtonClick(index, "reject", rec)}
                      disabled={buttonStates[index] !== undefined}
                    >
                      <FontAwesomeIcon icon={faTimes} className="mr-1" />
                      {buttonStates[index] === "reject" ? "Rejected" : "Reject"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Render Judgment Modal Conditionally */}

          {isJudgmentModalOpen && (
            <JudgmentModal
              caseData={selectedCase}
              acceptedRecommendations={acceptedRecommendations} // Pass only accepted recommendations
              onClose={() => setIsJudgmentModalOpen(false)}
            />
          )}

          {/* Render Schedule Hearing Modal Conditionally */}

          {isHearingModalOpen && (
            <ScheduleHearingModal
              caseData={selectedCase}
              onClose={() => setIsHearingModalOpen(false)}
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
