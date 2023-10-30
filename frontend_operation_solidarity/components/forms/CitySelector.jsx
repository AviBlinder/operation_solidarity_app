import React from 'react';

const CitySelector = ({
  task,
  setTask,
  cities_short_list,
  geoLocations,
  setGeolocations,
}) => {
  const findLatLng = (property) => {
    const result = cities_short_list.filter((city) => city.city === property);
    const lat = result[0].lat;
    const lng = result[0].lng;
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
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label
          className="block text-sm font-medium text-primary-800"
          htmlFor="city"
        >
          City
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
            Choose a city
          </option>
          {cities_short_list.map((city, index) => (
            <option key={index} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CitySelector;
