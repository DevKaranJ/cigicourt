import React from "react";

const PartyModal = ({ showPartyModal, setShowPartyModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">
          Party {showPartyModal.type} Details
        </h2>
        <p>{showPartyModal.data}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          onClick={() => setShowPartyModal(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PartyModal;