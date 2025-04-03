import React, { useState } from "react";

const ScheduleHearingModal = ({ caseData, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [courtRoom, setCourtRoom] = useState("Select Room");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    console.log({
      caseId: caseData.id,
      date,
      time,
      courtRoom,
      notes,
    });
    onClose(); // Close modal after submission
  };

  return (
    <div onDoubleClick={onClose} className="fixed inset-0 bg-gray-900/50 flex items-start justify-center overflow-auto p-4">
      <div onDoubleClick={(event)=>{event.stopPropagation(); }} className="bg-white p-6 rounded-lg shadow-lg w-[60%] max-w-[800px] mt-16 max-h-[110vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-semibold">Schedule Court Hearing</h2>

        {/* Date Field */}
        <label className="block mt-4 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        />

        {/* Time Field */}
        <label className="block mt-4 font-medium">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        />

        {/* Court Room Dropdown */}
        <label className="block mt-4 font-medium">Court Room</label>
        <select
          value={courtRoom}
          onChange={(e) => setCourtRoom(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option>Select Room</option>
          <option>Court Room A101</option>
          <option>Court Room A102</option>
          <option>Court Room A103</option>
        </select>

        {/* Additional Notes */}
        <label className="block mt-4 font-medium">Additional Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full h-24"
          placeholder="Enter any additional notes and requirements..."
        ></textarea>

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
            <span className="text-sm">Schedule Timing</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHearingModal;
