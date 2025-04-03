import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SuccessModal1 = ({ onClose  }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[400px] p-6">
        <div className="text-center">
          <div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FontAwesomeIcon
              icon={faCheck}
              className="text-2xl text-green-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Success</h3>
          <p className="text-gray-600">Case has been approved successfully.</p>
          <button
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={onClose} 
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal1;
