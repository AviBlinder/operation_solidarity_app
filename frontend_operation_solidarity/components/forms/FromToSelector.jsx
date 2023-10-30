const FromToSelector = ({
  cities_short_list,
  task,
  setTask,
  geoLocations,
  setGeolocations,
}) => {
  const findLatLng = (property) => {
    const result = cities_short_list.filter((city) => city.city === property);
    const lat = result[0].lat;
    const lng = result[0].lng;
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
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label
          className="block text-sm font-medium text-primary-800"
          htmlFor="from"
        >
          From
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
            Choose a city
          </option>
          {cities_short_list.map((city, index) => (
            <option key={index} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-primary-800"
          htmlFor="to"
        >
          To
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

export default FromToSelector;
