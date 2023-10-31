import React from 'react';
import { weekDays } from '@/constants/index';

const AvailabilitySelector = ({
  task,
  setTask,
  availability,
  setAvailability,
}) => {
  const weekDaysHebrew = weekDays.hebrew;
  const handleWeekDayChange = (day, isChecked) => {
    if (isChecked) {
      setAvailability([...availability, day]);
    } else {
      setAvailability(availability.filter((a) => a != day));
    }
  };

  const handleSelectAllDays = () => {
    if (availability.length < weekDaysHebrew.length) {
      setAvailability(weekDaysHebrew);
      setTask({ ...task, ableDays: [...weekDaysHebrew] });
    } else {
      setAvailability([]);
      setTask({ ...task, ableDays: [] });
    }
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-primary-800">
        Availability
      </label>
      <div className="mt-2 flex flex-col">
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={availability.length === weekDaysHebrew.length}
              onChange={handleSelectAllDays}
            />
            <span className="ml-2">Select All</span>
          </label>
        </div>
        <div>
          {weekDaysHebrew.map((day) => (
            <label key={day} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox"
                value={day}
                checked={availability.includes(day)}
                onChange={(event) =>
                  handleWeekDayChange(day, event.target.checked)
                }
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySelector;
