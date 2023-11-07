'use client';
import Select from 'react-select';
import { useState, useEffect, useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

import Switch from 'react-switch';
const customStyles = {
  control: (provided) => ({
    ...provided,
    height: '45px',
    minHeight: '45px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '40px',
    padding: '0 6px',
    fontWeight: 'bold',
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '40px',
  }),
};
const FilterBar = ({
  distanceRange,
  handleDistanceRangeChange,
  callingPage,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  citiesHebrew,
  weekDaysOptions,
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
  const {
    language,
    labels,
    categories,
    cities: cities_short_list,
  } = useContext(RefDataContext);

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

  const languageEnglish = 'english';
  const languageHebrew = 'hebrew';
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
            <option value="all">כל הסטטוסים</option>
            {statuses[languageEnglish].map((status, index) => (
              <option key={index} value={status}>
                {statuses[languageHebrew][index]}
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
          <option value="all">כל הקטגוריות</option>
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
          <option value="all">כל הערים</option>
          {citiesHebrew.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      {/* Availability Filter  */}
      <label
        className={`${mobileFiltersOpen ? 'mt-2 py-1' : '"ml-4 mt-2 py-1'}`}
        htmlFor="availability-choice"
      >
        {/* Availability: */}
        <Select
          styles={customStyles}
          placeholder="בחירת יום"
          name="availability-choice"
          aria-label="availability-choice"
          aria-placeholder="בחירת יום"
          inputId="availability-choice"
          value={availabilityFilter.map((value) => ({
            value,
            label: value,
          }))}
          onChange={handleAvailabilityFilterChange}
          options={weekDaysOptions}
          isMulti
          className={`${
            mobileFiltersOpen ? 'mt-2  w-[90%] my-10 mx-2' : 'ml-2 w-64 -mt-1'
          }`}
          classNamePrefix="react-select"
        />
      </label>
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
