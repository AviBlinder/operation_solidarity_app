import { RadioGroup } from '@headlessui/react';
import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

function StatusSelector({ task, setTask }) {
  const { language, statuses, labels } = useContext(RefDataContext);

  const languageEnglish = 'en';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="flex flex-col ">
      <div>
        <h2 className="text-sm font-medium text-primary-800">
          {labels[language].statusSelect}
        </h2>
      </div>
      <div className="flex flex-row">
        <RadioGroup
          name="status"
          className={''}
          value={task?.status.toLowerCase()}
          onChange={(value) => setTask({ ...task, status: value })}
        >
          <div className="flex flex-row flex-wrap ">
            {statuses[languageEnglish].map((status, index) => (
              <RadioGroup.Option
                key={index}
                value={status.toLowerCase()}
                className={({ active, checked }) =>
                  classNames(
                    active
                      ? 'ring-2 ring-secondary-600 ring-offset-2 mx-2'
                      : 'mx-2',
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
                    {statuses[language][index].toLowerCase()}
                  </RadioGroup.Description>
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default StatusSelector;
