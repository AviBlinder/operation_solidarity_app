'use client';
import React, { useState } from 'react';

const categories = ['Food', 'Clothing', 'Shelter', 'Medical', 'Transportation'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
const addresses = {
  'New York': ['5th Avenue', 'Madison Avenue', 'Broadway'],
  'Los Angeles': [
    'Sunset Boulevard',
    'Hollywood Boulevard',
    'Mulholland Drive',
  ],
  // Add addresses for other cities
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

function AssistanceRequestForm() {
  const [requestDescription, setRequestDescription] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [availability, setAvailability] = useState([]);
  const [category, setCategory] = useState('');
  const [locationType, setLocationType] = useState('cityAddress');

  const handleWeekDayChange = (day) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter((d) => d !== day));
    } else {
      setAvailability([...availability, day]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      requestDescription,
      location:
        locationType === 'cityAddress' ? { city, address } : { from, to },
      availability,
      category,
    };
    console.log(data);
    // Here you can send the data to your backend
  };

  return (
    <form className="p-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="requestDescription"
        >
          Request Description
        </label>
        <input
          type="text"
          id="requestDescription"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          value={requestDescription}
          onChange={(e) => setRequestDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
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
              className="block text-sm font-medium text-gray-700"
              htmlFor="city"
            >
              City
            </label>
            <select
              id="city"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <select
              id="address"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose an address
              </option>
              {(addresses[city] || []).map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="from"
            >
              From
            </label>
            <select
              id="from"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="to"
            >
              To
            </label>
            <select
              id="to"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Availability
        </label>
        <div className="mt-2">
          {weekDays.map((day) => (
            <label key={day} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox"
                value={day}
                checked={availability.includes(day)}
                onChange={() => handleWeekDayChange(day)}
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="category"
        >
          Category
        </label>
        <select
          id="category"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}

export default AssistanceRequestForm;
