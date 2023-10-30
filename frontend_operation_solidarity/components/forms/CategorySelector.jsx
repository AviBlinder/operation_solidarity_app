const CategorySelector = ({
  categories,
  categoriesHebrew,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([category]);
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-primary-800"
        htmlFor="category"
      >
        Categories
      </label>

      <div>
        {categoriesHebrew.map((categoryHebrew, index) => (
          <label key={index} className="inline-flex items-center mr-4">
            <input
              // type="checkbox"
              type="radio"
              className="form-checkbox"
              value={categoryHebrew}
              checked={selectedCategories.includes(categories[index])}
              onChange={(event) =>
                handleCategoryChange(categories[index], event.target.checked)
              }
            />
            <span className="ml-2">{categoryHebrew}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
