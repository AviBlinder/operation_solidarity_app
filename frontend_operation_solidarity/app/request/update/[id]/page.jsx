'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cities_short_list } from '@/constants/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { weekDays } from '@/constants/index';

const updateRequest = ({ params }) => {
  const type = 'request';
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryDate = searchParams.get('entryDate');
  const [submitting, setIsSubmitting] = useState(false);

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
  const [categoriesHebrew, setCategoriesHebrew] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [locationType, setLocationType] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/reference-data/categories`, {
        next: { revalidate: 3600 },
      });
      const allCategories = await response.json();
      const categoriesNames = allCategories.map((cat) => cat.itemName.S);
      const categoriesHebrewNames = allCategories.map(
        (cat) => cat.itemNameHebrew.S
      );

      setCategories(categoriesNames);
      setCategoriesHebrew(categoriesHebrewNames);
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `/api/tasks/${params?.id}/?entryDate=${entryDate}`
      );
      const data = await response.json();
      setTask({
        ...task,
        description: data.description,
        status: data.status,
        email: data.email,
        entryDate: entryDate,
        userName: data.userName,
        taskType: data.taskType,
        city: data.city?.city ? data.city.city : '',
        from: data.from?.cityFrom ? data.from.cityFrom : '',
        to: data.to?.cityTo ? data.to.cityTo : '',
      });
      setSelectedCategories([...selectedCategories, ...data.category]);
      setAvailability([...availability, ...data.availability]);
      setGeolocations({
        ...geoLocations,
        cityLat: data.city?.lat,
        cityLng: data.city?.lng,
        fromLat: data.from?.lat,
        fromLng: data.from?.lng,
        toLat: data.to?.lat,
        toLng: data.to?.lng,
      });
      data.city?.city
        ? setLocationType('cityAddress')
        : setLocationType('fromTo');
    };

    if (params?.id) {
      fetchTask();
    }
  }, [params.id, session?.user.email]);

  const handleWeekDayChange = (day, isChecked) => {
    if (isChecked) {
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
  const handleCity = (value) => {
    const [cityLat, cityLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      cityLat: cityLat,
      cityLng: cityLng,
    });
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

  const handleCategoryChange = (category, isChecked) => {
    console.log('handleCategoryChange :', category);
    console.log('selectedCategories.length =', selectedCategories.length);
    if (isChecked) {
      setSelectedCategories([category]);
    }
    // if (isChecked) {
    //   setSelectedCategories([...selectedCategories, category]);
    // } else {
    //   if (selectedCategories.length === 1) {
    //     setSelectedCategories([]);
    //   } else {
    //     setSelectedCategories(selectedCategories.filter((a) => a != category));
    //   }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (locationType === 'cityAddress') {
      setTask({ ...task, from: '', to: '' });
      setGeolocations({
        ...geoLocations,
        fromLat: '',
        fromLng: '',
        toLat: '',
        toLng: '',
      });
    } else {
      setTask({ ...task, city: '' });
      setGeolocations({ ...geoLocations, cityLat: '', cityLng: '' });
    }

    // update start
    try {
      const response = await fetch(
        `/api/tasks/${params?.id}?entryDate=${entryDate}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            //
            description: task.description,
            category: selectedCategories,
            city: task.city
              ? {
                  city: task.city,
                  lat: geoLocations.cityLat ? geoLocations.cityLat : null,
                  lng: geoLocations.cityLng ? geoLocations.cityLng : null,
                }
              : null,
            // address: task.address,
            from: task.from
              ? {
                  cityFrom: task.from,
                  lat: geoLocations.fromLat ? geoLocations.fromLat : null,
                  lng: geoLocations.fromLng ? geoLocations.fromLng : null,
                }
              : null,
            to: task.to
              ? {
                  cityTo: task.to,
                  lat: geoLocations.toLat ? geoLocations.toLat : null,
                  lng: geoLocations.toLng ? geoLocations.toLng : null,
                }
              : null,
            // status: 'new',
            availability: availability,
            updateDate: new Date(),
          }),
        }
      );
      if (response.ok) {
        setAvailability([]);
        setGeolocations({
          cityLat: '',
          cityLng: '',
          fromLat: '',
          fromLng: '',
          toLat: '',
          toLng: '',
        });
        setTask({
          description: '',
          category: '',
          city: '',
          address: '',
          from: '',
          to: '',
          status: '',
          entryDate: '',
        });

        router.push('/tasks');
      }
    } catch (error) {
      console.log('error updatin request ', error);
      router.push('/tasks');
    } finally {
      setIsSubmitting(false);
    }

    // update end
    setIsSubmitting(false);
  };

  return (
    <div>
      {session?.user.email ? (
        <form className="p-8" onSubmit={handleSubmit}>
          <p> Categories: {categories}</p>
          <p> selectedCategories : {selectedCategories}</p>
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
          <p> locationType: {locationType}</p>
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
                    // type="checkbox"
                    type="radio"
                    className="form-checkbox"
                    value={categoryHebrew}
                    checked={selectedCategories.includes(categories[index])}
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
              {submitting ? `updating request` : 'update'}
            </button>
          </div>
        </form>
      ) : (
        <div> You need to login first</div>
      )}
    </div>
  );
};

export default updateRequest;
