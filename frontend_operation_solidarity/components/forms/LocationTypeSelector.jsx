import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const LocationTypeSelector = ({
  locationType,
  setLocationType,
  task,
  setTask,
  setGeolocations,
}) => {
  const { language, labels } = useContext(RefDataContext);
  const setCityFromTo = async (event) => {
    if (event.target.value === 'cityAddress') {
      setTask({ ...task, from: '', to: '' });
      setGeolocations((prevGeoLocations) => ({
        ...prevGeoLocations,
        fromLat: '',
        fromLng: '',
        toLat: '',
        toLng: '',
      }));
    } else {
      setTask({ ...task, city: '' });
      setGeolocations((prevGeoLocations) => ({
        ...prevGeoLocations,
        cityLat: '',
        cityLng: '',
      }));
    }
  };

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
            onChange={(event) => {
              setLocationType('cityAddress');
              setCityFromTo(event);
            }}
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
            onChange={(event) => {
              setLocationType('fromTo');
              setCityFromTo(event);
            }}
          />
          <span className="ml-2">{labels[language].fromTo}</span>
        </label>
      </div>
    </div>
  );
};

export default LocationTypeSelector;
