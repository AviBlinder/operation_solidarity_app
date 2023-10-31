import Select from 'react-select';

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
    <div className="mb-4">
      <button
        onClick={handleResetFilters}
        className="m-2 p-1 bg-secondary-500 text-white rounded"
      >
        Reset Filters
      </button>
      <label htmlFor="category-choice">
        Category:
        <select
          id="category-choice"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
          className="ml-2"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      {/* Availability Filter  */}
      <label className="ml-4" htmlFor="availability-choice">
        Availability:
        <Select
          id="availability-choice"
          value={availabilityFilter.map((value) => ({
            value,
            label: value,
          }))}
          onChange={handleAvailabilityFilterChange}
          options={weekDaysOptions}
          isMulti
          className="ml-2 w-64"
          classNamePrefix="react-select"
        />
      </label>
      <label htmlFor="city-choice">
        City:
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
    </div>
  );
};

export default FilterBar;
