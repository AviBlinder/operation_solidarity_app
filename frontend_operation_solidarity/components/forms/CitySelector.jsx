import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const CitySelector = ({ task, setTask, geoLocations, setGeolocations }) => {
  const { language, labels, cities } = useContext(RefDataContext);
  const findLatLng = (property) => {
    const result = cities.find((city) => {
      return city.city === property;
    });
    const lat = result.lat;
    const lng = result.lng;
    return [lat, lng];
  };
  const handleCity = (value) => {
    const [cityLat, cityLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      cityLat: cityLat,
      cityLng: cityLng,
    });
  };

  return (
    <div className="flex flex-col">
      <div>
        <label
          className="block text-sm font-medium text-primary-800"
          htmlFor="city"
        >
          {labels[language].city}
        </label>
        <select
          id="city"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          value={task.city}
          onChange={(e) => {
            setTask({ ...task, city: e.target.value });
            handleCity(e.target.value);
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
  );
};

export default CitySelector;
