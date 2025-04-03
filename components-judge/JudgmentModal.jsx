import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const JudgmentModal = ({ caseData, acceptedRecommendations, onClose }) => {
  const [decision, setDecision] = useState("Select decision...");
  const [sentencePeriod, setSentencePeriod] = useState("");
  const [penalty, setPenalty] = useState("");
  const [reason, setReason] = useState("");
  const [airesponse,setResponse] = useState(""); 
  const generateAIReasoning = () => {
    // return `Based on the AI analysis and legal precedents:
    
    // 1. ${caseData.title} involves critical legal considerations.
    // 2. The AI has identified key factors: 
    //    - ${caseData.recommendations.join("\n       - ")}
    // 3. Further review is advised before making a final decision.`;
    return "my ai will come here "
  };

  const handleGenerateReasoning = () => {
    setReason(generateAIReasoning());
  };

  const handleSubmit = () => {
    console.log({
      caseId: caseData.id,
      decision,
      sentencePeriod,
      penalty,
      reason,
    });
    onClose(); // Close modal after submission
  };

  return (
    <div onDoubleClick={onClose} className="fixed inset-0 bg-gray-900/50 flex items-start justify-center overflow-auto p-4 ">
      <div  onDoubleClick={(event)=>{event.stopPropagation(); }} className="bg-white p-6 rounded-lg shadow-lg w-[60%] max-w-[800px] mt-16 max-h-[110vh] overflow-y-auto ">
        {/* Case Title */}
        <h2 className="text-2xl font-semibold">
          Final Judgment - {caseData.title}
        </h2>

        {/* Accepted AI Recommendations */}
        <div className="mt-4">
          <h3 className="font-medium">Accepted AI Recommendations</h3>
          {acceptedRecommendations.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {acceptedRecommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Please select AI recommendations.</p>
          )}
        </div>

        {/* Decision Dropdown */}
        <label className="block mt-4 font-medium">Decision</label>
        <select
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option>Select decision...</option>
          <option>Guilty</option>
          <option>Not Guilty</option>
          <option>Case Dismissed</option>
        </select>

        {/* Sentence Period */}
        <label className="block mt-4 font-medium">Sentence Period</label>
        <input
          type="text"
          value={sentencePeriod}
          onChange={(e) => setSentencePeriod(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
          placeholder="e.g. 5 years, 6 months"
        />

        {/* Penalties/Fine */}
        <label className="block mt-4 font-medium">Penalties/Fine</label>
        <input
          type="text"
          value={penalty}
          onChange={(e) => setPenalty(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
          placeholder="e.g. ₹ 50000 fine"
        />

        <label className="block mt-4 font-medium">Reason</label>
        <div className="relative">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full h-24 pr-12"
            placeholder="Provide reasoning for the judgment"
          ></textarea>

          {/* AI Generate Button */}

          {/* <button
            onClick={() => setReason(generateAIReasoning())} // calling function
            className="absolute top-2 right-2 bg-indigo-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-indigo-600"
          >
            <FontAwesomeIcon icon={faRobot} className="mr-1" />
            <span className="text-sm"> Generate AI Reasoning</span>
          </button>
          </div> */}



          <button
            onClick={handleGenerateReasoning}
            className="absolute top-2 right-2 bg-indigo-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-indigo-600"
          >
            <FontAwesomeIcon icon={faRobot} className="mr-1" />
            <span className="text-sm"> Generate AI Reasoning</span>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded-lg"
            onClick={onClose}
          >
            <span className="text-sm">Cancle</span>
          </button>
          <button
            className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            <span className="text-sm">Submit Judgment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JudgmentModal;
