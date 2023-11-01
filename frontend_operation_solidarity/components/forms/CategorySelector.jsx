import { RadioGroup } from '@headlessui/react';
import { categories } from '@/constants/index';

const CategorySelector = ({ task, setTask }) => {
  const languageEnglish = 'english';
  const languageHebrew = 'hebrew';
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="flex flex-col mt-4">
      <div>
        <h2 className="text-sm font-medium text-primary-800">
          Select a Category
        </h2>
      </div>
      <div className="">
        <RadioGroup
          name="category"
          className={'mt-2'}
          value={task?.category.toLowerCase()}
          onChange={(value) => setTask({ ...task, category: value })}
        >
          <div className="flex flex-col flex-1 md:flex-row flex-wrap">
            {categories[languageEnglish].map((option, index) => (
              <div key={index} className="my-2">
                <RadioGroup.Option
                  key={index}
                  value={option.toLowerCase()}
                  className={({ active, checked }) =>
                    classNames(
                      active
                        ? 'ring-2 ring-secondary-600 ring-offset-2 mx-0 md:mx-0'
                        : 'mx-0 md:mx-2',
                      checked
                        ? 'bg-secondary-500 text-white hover:bg-secondary-500'
                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                      'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase '
                    )
                  }
                >
                  <RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={`capitalize block text-sm`}
                    >
                      {categories[languageHebrew][index].toLowerCase()}
                    </RadioGroup.Description>
                  </RadioGroup.Label>
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
