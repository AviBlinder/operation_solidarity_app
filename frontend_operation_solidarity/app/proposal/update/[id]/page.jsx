'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cities_short_list } from '@/constants/index';
import { useSession } from 'next-auth/react';
const [submitting, setIsSubmitting] = useState(false);

import { weekDays } from '@/constants/index';

const updateProposal = ({ params }) => {
  const searchParams = useSearchParams();
  const entryDate = searchParams.get('entryDate');

  const [task, setTask] = useState({
    description: '',
    status: '',
    email: '',
    entryDate: '',
    userName: '',
    taskType: '',
    city: '',
    from: '',
    to: '',
  });
  const [availability, setAvailability] = useState([]);
  const [geoLocations, setGeolocations] = useState({
    cityLat: '',
    cityLng: '',
    fromLat: '',
    fromLng: '',
    toLat: '',
    toLng: '',
  });

  const { data: session } = useSession();

  const [categories, setCategories] = useState([]);

  const [locationType, setLocationType] = useState('cityAddress');

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `/api/tasks/${params?.id}?entryDate=${entryDate}`
      );
      const data = await response.json();
      console.log('fetched data', data);
      setTask({
        ...task,
        description: data.description,
        status: data.status,
        email: data.email,
        entryDate: entryDate,
        userName: data.userName,
        taskType: data.taskType,
        city: data.city?.city ? data.city?.city : null,
        from: data.from?.cityFrom ? data.from?.cityFrom : null,
        to: data.to?.cityTo ? data.to?.cityTo : to,
      });
      setCategories(data.category || []);
      setAvailability(data.availability || []);
      setGeolocations({
        ...geoLocations,
        cityLat: data.city?.lat,
        cityLng: data.city?.lng,
        fromLat: data.from?.lat,
        fromLng: data.from?.lng,
        toLat: data.to?.lat,
        toLng: data.to?.lng,
      });
    };

    if (params?.id) {
      fetchTask();
    }
  }, [params.id, session]);

  return (
    <div>
      {session?.user.email ? (
        <form className="p-8" onSubmit={handleSubmit}>
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
              Categories
            </label>

            <div>
              {categoriesHebrew.map((categoryHebrew, index) => (
                <label key={index} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={categoryHebrew}
                    onChange={(event) =>
                      handleCategoryChange(
                        categories[index],
                        event.target.checked
                      )
                    }
                  />
                  <span className="ml-2">{categoryHebrew}</span>
                </label>
              ))}
            </div>
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
};

export default updateProposal;
