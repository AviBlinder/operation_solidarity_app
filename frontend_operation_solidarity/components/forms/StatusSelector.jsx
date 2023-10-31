import React from 'react';
import { statuses } from '@/constants/index';

function StatusSelector({ task, setTask }) {
  const handleStatusChange = (e) => {
    setTask({ ...task, status: e.target.value });
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="status"
        className="block mt-2 text-sm font-medium text-primary-800"
      >
        Status
      </label>

      <div className="mt-1">
        <select
          id="status"
          name="status"
          className="mt-1 block w-full py-1 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          value={task?.status}
          onChange={handleStatusChange}
        >
          <option value="" disabled>
            Select a status
          </option>
          {statuses.hebrew.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default StatusSelector;
