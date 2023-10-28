'use client';
import React, { useState, useEffect } from 'react';

import { cities_short_list } from '@/constants/index';
import { useSession } from 'next-auth/react';

const addresses = {
  'New York': ['5th Avenue', 'Madison Avenue', 'Broadway'],
  'Los Angeles': [
    'Sunset Boulevard',
    'Hollywood Boulevard',
    'Mulholland Drive',
  ],
};
const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function CreateRequestForm({
  type,
  task,
  setTask,
  availability,
  setAvailability,
  geoLocations,
  setGeolocations,
  submitting,
  handleSubmit,
}) {
  const { data: session } = useSession();

  const [categories, setCategories] = useState([]);

  const [locationType, setLocationType] = useState('cityAddress');

  // load Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/reference-data/categories`, {
        next: { revalidate: 3600 },
      });
      const allCategories = await response.json();
      return allCategories;
    };

    if (categories.length === 0) {
      fetchCategories().then((categories) => setCategories(categories));
    }
  }, []);
  //

  const handleWeekDayChange = (day, checked) => {
    let temp = [];
    if (checked) {
      setAvailability([...availability, day]);
    } else {
      setAvailability(availability.filter((a) => a != day));
    }
  };

  const handleSelectAllDays = () => {
    if (availability.length < weekDays.length) {
      setAvailability(weekDays);
      setTask({ ...task, ableDays: [...weekDays] });
    } else {
      setAvailability([]);
      setTask({ ...task, ableDays: [] });
    }
  };

  const findLatLng = (property) => {
    const result = cities_short_list.filter((city) => city.city === property);
    const lat = result[0].lat;
    const lng = result[0].lng;
    return [lat, lng];
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (task.from) {
      const [fromLat, fromLng] = findLatLng(task.from);
      setGeolocations({ ...geoLocations, fromLat: fromLat, fromLng: fromLng });
    }

    if (task.to) {
      const [toLat, toLng] = findLatLng(task.to);
      setGeolocations({ ...geoLocations, toLat: toLat, toLng: toLng });
    }

    if (task.city) {
      const [cityLat, cityLng] = findLatLng(task.city);
      setGeolocations({ ...geoLocations, cityLat: cityLat, cityLng: cityLng });
    }

    handleSubmit();
  };
  return (
    <div>
      {session?.user.email ? (
        <form className="p-8" onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-primary-800"
              htmlFor="description"
            >
              Request Description
            </label>
            <input
              type="textarea"
              id="description"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-xs placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              value={task.description}
              // onChange={(e) => setDescription(e.target.value)}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              required
              placeholder="Write your request here"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-800">
              Location Type
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
                <span className="ml-2">City and Address</span>
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
                <span className="ml-2">From / To</span>
              </label>
            </div>
          </div>

          {locationType === 'cityAddress' ? (
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
                  onChange={(e) => setTask({ ...task, city: e.target.value })}
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
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  id="address"
                  className="mt-1 block w-full py-1 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  value={task.address}
                  onChange={(e) =>
                    setTask({ ...task, address: e.target.value })
                  }
                  // required
                >
                  {/* <option value="" disabled>
                    Choose an address
                  </option>
                  {(addresses[city] || []).map((address) => (
                    <option key={address} value={address}>
                      {address}
                    </option>
                  ))} */}
                </input>
              </div>
            </div>
          ) : (
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
                  onChange={(e) => setTask({ ...task, from: e.target.value })}
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
                  onChange={(e) => setTask({ ...task, to: e.target.value })}
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
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-800">
              Availability
            </label>
            <div className="mt-2 flex flex-col">
              <div>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={availability.length === weekDays.length}
                    onChange={handleSelectAllDays}
                  />
                  <span className="ml-2">Select All</span>
                </label>
              </div>
              <div>
                Availability: {availability.length}: {availability}
              </div>
              <div>
                {weekDays.map((day) => (
                  <label key={day} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={day}
                      checked={availability.includes(day)}
                      onChange={(event) =>
                        handleWeekDayChange(day, event.target.checked)
                      }
                    />
                    <span className="ml-2">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-primary-800"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              required
            >
              <option value="" disabled>
                Choose a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.itemName.S}>
                  {category.itemNameHebrew.S}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
            >
              {submitting ? `submitting request` : 'submit'}
            </button>
          </div>
        </form>
      ) : (
        <div> You need to login first</div>
      )}
    </div>
  );
}

export default CreateRequestForm;
