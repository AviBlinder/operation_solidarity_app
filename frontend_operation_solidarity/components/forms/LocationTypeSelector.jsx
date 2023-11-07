import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const LocationTypeSelector = ({ locationType, setLocationType }) => {
  const { language, labels } = useContext(RefDataContext);
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-primary-800">
        {labels[language].locationType}
      </label>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="locationType"
            value="cityAddress"
            checked={locationType === 'cityAddress'}
            onChange={() => setLocationType('cityAddress')}
          />
          <span className="ml-2">{labels[language].cityAndAddress}</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio"
            name="locationType"
            value="fromTo"
            checked={locationType === 'fromTo'}
            onChange={() => setLocationType('fromTo')}
          />
          <span className="ml-2">{labels[language].fromTo}</span>
        </label>
      </div>
    </div>
  );
};

export default LocationTypeSelector;
