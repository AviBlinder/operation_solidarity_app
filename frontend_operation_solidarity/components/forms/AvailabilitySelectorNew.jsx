import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const AvailabilitySelector = ({ availability, setAvailability }) => {
  const { language, labels, weekDays } = useContext(RefDataContext);

  const weekDaysEnglish = weekDays.en;
  const weekDaysLocal = weekDays[language];

  // Map local language days to English days for internal value handling
  const localToEnglishDayMap = weekDaysLocal.reduce((acc, localDay, index) => {
    acc[localDay] = weekDaysEnglish[index];
    return acc;
  }, {});

  const handleWeekDayChange = (localDay, isChecked) => {
    const englishDay = localToEnglishDayMap[localDay];
    setAvailability((prevAvailability) =>
      isChecked
        ? [...prevAvailability, englishDay]
        : prevAvailability.filter((day) => day !== englishDay)
    );
  };

  const handleSelectAllDays = (isChecked) => {
    setAvailability(isChecked ? weekDaysEnglish : []);
  };

  // Check if all days are selected
  const isAllSelected =
    weekDaysEnglish.length > 0 &&
    weekDaysEnglish.every((day) => availability.includes(day));

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-primary-800">
        {labels[language].availability}
      </label>
      <div className="mt-2 flex flex-col">
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isAllSelected}
              onChange={(e) => handleSelectAllDays(e.target.checked)}
            />
            <span className="ml-2">{labels[language].selectAll}</span>
          </label>
        </div>
        <div className="flex flex-row  flex-wrap">
          {weekDaysLocal.map((localDay) => {
            const englishDay = localToEnglishDayMap[localDay];
            return (
              <label key={localDay} className="items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={availability.includes(englishDay)}
                  onChange={(e) =>
                    handleWeekDayChange(localDay, e.target.checked)
                  }
                />
                <span className="ml-2">{localDay}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySelector;
