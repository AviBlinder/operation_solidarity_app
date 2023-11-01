import Select from 'react-select';

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
  categories,
  mobileFiltersOpen,
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
  const languageEnglish = 'english';
  const languageHebrew = 'hebrew';

  return (
    <div
      className={`${
        mobileFiltersOpen ? 'mt-2  flex flex-col' : 'mb-4 flex flex-row'
      }`}
    >
      {' '}
      <button
        onClick={handleResetFilters}
        className="m-2 p-1 bg-secondary-500 text-white rounded w-[90%]"
      >
        Reset Filters
      </button>
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
          {categories[languageEnglish].map((category, index) => (
            <option key={index} value={category}>
              {categories[languageHebrew][index]}
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
          id="availability-choice"
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
    </div>
  );
};

export default FilterBar;
