import React, { useState } from "react";

const ScheduleHearing = ({ onClose, onSchedule }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }
    onSchedule(date, time); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Schedule Hearing</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleHearing;