import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
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

  //

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  //
  return (
    <div className="flex flex-col mt-4">
      <div>
        <h2 className="text-sm font-medium text-primary-800">
          Select a Category
        </h2>
      </div>
      <div className="">
        <RadioGroup
          value={selectedCategories}
          onChange={setSelectedCategories}
          className="mt-2  "
        >
          <div className="flex flex-row  flex-wrap ">
            {categoriesHebrew.map((option, index) => (
              <div className="mx-2 my-2">
                <RadioGroup.Option
                  key={index}
                  value={option}
                  className={({ active, checked }) =>
                    classNames(
                      active ? 'ring-2 ring-secondary-600 ring-offset-2 ' : '',
                      checked
                        ? 'bg-secondary-500 text-white hover:bg-secondary-500'
                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                      'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase '
                    )
                  }
                >
                  <RadioGroup.Label as="span">{option}</RadioGroup.Label>
                </RadioGroup.Option>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default CategorySelector;
