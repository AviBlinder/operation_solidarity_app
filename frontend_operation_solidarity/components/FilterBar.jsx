import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: '45px', // Set your desired height
    minHeight: '45px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '40px',
    padding: '0 6px',
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
  categories,
  citiesHebrew,
  weekDaysOptions,
  handleResetFilters,
  handleCategoryFilterChange,
  categoryFilter,
  handleAvailabilityFilterChange,
  availabilityFilter,
  handleCityFilterChange,
  cityFilter,
}) => {
  return (
    <div className="mb-4 flex flex-row">
      <button
        onClick={handleResetFilters}
        className="m-2 p-1 bg-secondary-500 text-white rounded"
      >
        Reset Filters
      </button>
      <label htmlFor="category-choice" className="mt-2 ">
        {/* Category: */}
        <select
          // placeholder={searchCityPlaceholder}
          defaultValue={{ label: 'Select Dept', value: 0 }}
          className="ml-2 w-52"
          classNamePrefix="react-select"
          id="category-choice"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="city-choice" className="mt-2 rounded">
        {/* City: */}
        <select
          id="city-choice"
          value={cityFilter}
          onChange={handleCityFilterChange}
          className="ml-2"
        >
          <option value="">All Cities</option>
          {citiesHebrew.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      {/* Availability Filter  */}
      <label className="ml-4 mt-2 py-1" htmlFor="availability-choice">
        {/* Availability: */}
        <Select
          styles={customStyles}
          placeholder="select days "
          name="availability-choice"
          aria-label="availability-choice"
          aria-placeholder="select days"
          id="availability-choice"
          value={availabilityFilter.map((value) => ({
            value,
            label: value,
          }))}
          onChange={handleAvailabilityFilterChange}
          options={weekDaysOptions}
          isMulti
          className="ml-2 w-64 -mt-1"
          classNamePrefix="react-select"
        />
      </label>
    </div>
  );
};

export default FilterBar;
