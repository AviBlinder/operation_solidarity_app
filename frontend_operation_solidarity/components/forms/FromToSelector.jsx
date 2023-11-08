import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const FromToSelector = ({ task, setTask, geoLocations, setGeolocations }) => {
  const { language, labels, cities } = useContext(RefDataContext);

  const findLatLng = (property) => {
    const result = cities.find((city) => {
      return city.city === property;
    });
    const lat = result.lat;
    const lng = result.lng;
    return [lat, lng];
  };

  const handleFrom = (value) => {
    const [fromLat, fromLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      fromLat: fromLat,
      fromLng: fromLng,
    });
  };
  const handleTo = (value) => {
    const [toLat, toLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      toLat: toLat,
      toLng: toLng,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div>
          <label
            className="block text-sm font-medium text-primary-800"
            htmlFor="from"
          >
            {labels[language].from}
          </label>
          <select
            id="from"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={task.from}
            onChange={(e) => {
              setTask({ ...task, from: e.target.value });
              handleFrom(e.target.value);
            }}
            required
          >
            <option value="" disabled>
              {labels[language].chooseCity}
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.city}>
                {language === 'he' ? city.cityHebrew : city.city}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <label
            className="block text-sm font-medium text-primary-800"
            htmlFor="to"
          >
            {labels[language].to}
          </label>
          <select
            id="to"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={task.to}
            onChange={(e) => {
              setTask({ ...task, to: e.target.value });
              handleTo(e.target.value);
            }}
            required
          >
            <option value="" disabled>
              {labels[language].chooseCity}
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.city}>
                {language === 'he' ? city.cityHebrew : city.city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FromToSelector;
