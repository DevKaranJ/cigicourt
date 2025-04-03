import React from "react";

const ActiveCases = ({ cases, caseComplexity, setSelectedCase, selectedCase }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full w-[550px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Active Cases</h2>

      {/* Filter and Display Cases */}
      <div className="space-y-4">
        {cases
          .filter((caseItem) => caseComplexity === "Select" || caseItem.priority === caseComplexity)

          .map((caseItem) => (
            <div
              key={caseItem.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedCase?.id === caseItem.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"
              }`}
              onClick={() => setSelectedCase(caseItem)}
            >
              {/* newly added code */}
              <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{caseItem.id}</span>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          caseItem.priority === 'high' ? 'bg-purple-100 text-purple-600' :
                          caseItem.priority === 'medium' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {caseItem.priority} Complexity
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          caseItem.status === 'Urgent' ? 'bg-red-100 text-red-600' :
                          caseItem.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
              <h3 className="font-semibold">{caseItem.title}</h3>
              <p className="text-sm text-gray-600">{caseItem.summary}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActiveCases;
