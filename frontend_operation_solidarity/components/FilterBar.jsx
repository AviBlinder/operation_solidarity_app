'use client';
import { Multiselect } from 'multiselect-react-dropdown';

import { useState, useEffect, useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

import Switch from 'react-switch';
const FilterBar = ({
  distanceRange,
  handleDistanceRangeChange,
  callingPage,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleResetFilters,
  handleStatusFilterChange,
  statuses,
  statusFilter,
  handleCategoryFilterChange,
  categoryFilter,
  handleAvailabilityFilterChange,
  availabilityFilter,
  handleCityFilterChange,
  cityFilter,
}) => {
  const { language, labels, categories, cities, weekDays } =
    useContext(RefDataContext);
  const weekDaysOptions = weekDays.en.map((day, index) => ({
    value: day, // always in English
    label: language === 'he' ? weekDays.he[index] : day, // dynamic based on language
  }));

  const [selectedDays, setSelectedDays] = useState([]);

  const onSelect = (selectedList) => {
    setSelectedDays(selectedList.map((item) => item.value));
    handleAvailabilityFilterChange(selectedList);
  };

  // This function will be called when an item is removed
  const onRemove = (selectedList) => {
    setSelectedDays(selectedList.map((item) => item.value));
    handleAvailabilityFilterChange(selectedList);
  };

  //
  const [delayedDistance, setDelayedDistance] = useState(distanceRange);
  const [toggleDistance, setToggleDistance] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const handleDistanceChange = (e) => {
    console.log(e.target.value);
    const newDistance = e.target.value;
    setDelayedDistance(newDistance);
    if (timeoutId) clearTimeout(timeoutId); // Clear the existing timeout

    const newTimeoutId = setTimeout(() => {
      handleDistanceRangeChange(newDistance);
    }, 3000); // Set a new timeout

    setTimeoutId(newTimeoutId); // Save the new timeout ID
  };

  const handleToggleDistance = (checked) => {
    setToggleDistance(checked);
    if (!checked) {
      handleDistanceRangeChange(1); // Reset or handle the distance range change when toggling off
    }
  };

  const languageEnglish = 'en';
  const languageHebrew = 'he';
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`${
        mobileFiltersOpen ? 'mt-2  flex flex-col' : 'mb-4 flex flex-row'
      }`}
    >
      {' '}
      <button
        onClick={handleResetFilters}
        className="mx-2 my-6 px-1 py-2 bg-secondary-500 text-white rounded w-[90%]"
      >
        {labels[language].resetFilters}
      </button>
      {callingPage === 'tasks' && (
        <label>
          <select
            className={`${
              mobileFiltersOpen ? 'mt-2  w-[90%] my-10 mx-2' : 'ml-2 w-52'
            }`}
            id="status-choice"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="all">{labels[language].allStatuses}</option>
            {statuses[languageEnglish].map((status, index) => (
              <option key={index} value={status}>
                {statuses[language][index]}
              </option>
            ))}
          </select>
        </label>
      )}
      {/* <Switch
        onChange={handleToggleDistance}
        checked={toggleDistance}
        className="mr-2"
      />
      <input
        type="number"
        disabled={!toggleDistance}
        value={toggleDistance ? delayedDistance : 0}
        onChange={handleDistanceChange}
        min="1"
        max="500"
        placeholder="Enter distance range in km"
        className={`${
          (mobileFiltersOpen ? 'mt-2  w-[90%] my-2 mx-2' : 'ml-2 w-52',
          !toggleDistance ? 'hidden' : 'block')
        }`}
      /> */}
      <label htmlFor="category-choice" className="mt-2 ">
        {/* Category: */}
        <select
          className={`${
            mobileFiltersOpen ? 'mt-2  w-[90%] my-10 mx-2' : 'ml-2 w-52'
          }`}
          id="category-choice"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
        >
          <option value="all">{labels[language].allCategories}</option>
          {categories['en'].map((category, index) => (
            <option key={index} value={category}>
              {categories[language][index]}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="city-choice" className="mt-2 rounded">
        {/* City: */}
        <select
          className={`${
            mobileFiltersOpen ? 'mt-2  w-[90%] my-10 mx-2' : 'ml-2 w-52'
          }`}
          id="city-choice"
          value={cityFilter}
          onChange={handleCityFilterChange}
        >
          <option value="all">{labels[language].allCities}</option>
          {cities.map((city, index) => (
            <option key={index} value={city.city}>
              {language === 'he' ? city.cityHebrew : city.city}
            </option>
          ))}
        </select>
      </label>
      {/* Availability Filter  */}
      <label
        htmlFor="weekDays-multiple-choice"
        className="block text-sm font-medium text-gray-700"
      ></label>
      <Multiselect
        options={weekDaysOptions} // Options to display in the dropdown
        selectedValues={selectedDays.map((day) => ({
          label: weekDays[language][weekDays.en.indexOf(day)],
          value: day,
        }))} // Preselected values
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="label" // Property name to display in the dropdown
        placeholder={language === 'en' ? 'Select days' : 'בחר ימים'} // Placeholder based on language
        closeIcon="cancel" // Icon to show for closing the dropdown
        style={{
          chips: {
            background: '#dea341',
            color: '#333',
            fontSize: '14px',
            borderRadius: '15px',
            padding: '5px 10px',
          },
          searchBox: {
            border: 'none',
            borderBottom: '1px solid #ccc',
            borderRadius: '0px',
            padding: '10px',
            fontSize: '14px',
          },
          multiselectContainer: {
            color: '#333',
            borderRadius: '4px',
          },
          optionContainer: {
            color: '#dea341',
            // To style the dropdown options
            // Add your styles here
          },
          // Add any additional custom styles if needed
        }}
      />
      <button
        onClick={() => setMobileFiltersOpen(false)}
        className="flex align-middle justify-center  md:hidden mx-2 my-6 px-1 py-2 bg-secondary-500 text-white rounded w-[90%]"
      >
        {labels[language].showResults}
      </button>
    </div>
  );
};

export default FilterBar;
