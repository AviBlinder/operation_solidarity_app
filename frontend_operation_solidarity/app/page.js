'use client';
import ngeohash from 'ngeohash';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { categories, statuses, labels } from '@/constants/index';

import { useContext, useState, useEffect, Fragment, Suspense } from 'react';
import { useSession } from 'next-auth/react';

import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import FilterBar from '@/components/FilterBar';

import { weekDays } from '@/constants/index';
import { RefDataContext } from '@/components/RefDataContext';

import RequestsProposalsTab from '@/components/RequestsProposalsTab';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('Requests');

  const [distanceRange, setDistanceRange] = useState(0);
  const [maxDistanceRange, setMaxDistanceRange] = useState(500);
  const handleDistanceRangeChange = (event) => {
    console.log('handleDistanceRangeChange', event);
    if (event === '') {
      setDistanceRange(0);
    } else {
      const value = Math.min(
        Math.max(1, parseInt(event * 100, 10)),
        maxDistanceRange
      );
      console.log('value =', value);
      setDistanceRange(value);
    }
  };

  const { data: session } = useSession();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const weekDaysHebrew = weekDays.hebrew;
  // const weekDaysEnglish = weekDays.english;
  const weekDaysOptions = weekDaysHebrew.map((day) => ({
    value: day,
    label: day,
  }));

  const refData = useContext(RefDataContext);
  const { language, setLanguage, labels, cities, statuses } =
    useContext(RefDataContext);

  const citiesHebrew = cities.map((city) => city.cityHebrew);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [showAll, setShowAll] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availability, setAvailability] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [locationFromFilter, setLocationFromFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState({});

  const handleCategoryFilterChange = (event) => {
    if (event.target.value === 'all') {
      setCategoryFilter('');
      setShowAll(true);
    } else {
      setShowAll(false);
      setCategoryFilter(event.target.value);
    }
  };

  const handleAvailabilityFilterChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setAvailabilityFilter(values);
  };

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  //
  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ ...location, latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      let response = [];
      const fetchStatusTypeRequest = 'new-request';
      const fetchStatusTypeProposal = 'new-proposal';
      if (currentTab === 'Requests') {
        response = await fetch(
          `/api/tasks?statusTaskType=${fetchStatusTypeRequest}`
        );
      } else {
        response = await fetch(
          `/api/tasks?statusTaskType=${fetchStatusTypeProposal}`
        );
      }

      const data = await response.json();
      data.length === 0 ? setTasks([]) : setTasks(data);
      // setTasks(data);
      setFilteredTasks(data);
    };
    fetchTasks();
  }, [session, currentTab]);

  useEffect(() => {
    let result = [...tasks];
    // Existing filter and sort logic

    // if (location.latitude && location.longitude && distanceRange > 0) {
    //   // Calculate the geohashes for the given distance range around the user's location
    //   const userGeohash = ngeohash.encode(
    //     location.latitude,
    //     location.longitude
    //   );
    //   console.log('userGeohash :', userGeohash);
    //   const precision = calculateGeohashPrecisionForDistance(distanceRange);
    //   const bounds = ngeohash.neighbors(userGeohash.substring(0, precision));

    //   // Include the user's current geohash as well
    //   bounds.push(userGeohash.substring(0, precision));

    //   // Filter tasks by geohash
    //   result = result.filter((task) => {
    //     // task?.geohash &&
    //     const taskGeohash = ngeohash.encode(
    //       task.city?.lat ? task.city.lat : task.from.lat,
    //       task.city?.lng ? task.city.lng : task.from.lng
    //     );
    //     console.log('taskGeohash :', taskGeohash);
    //     // bounds.includes(task?.geohash.substring(0, precision));
    //     bounds.includes(taskGeohash.substring(0, precision));
    //   });
    // }

    if (categoryFilter) {
      result = result.filter((task) =>
        task.category.includes(categoryFilter.toLocaleLowerCase())
      );
    }

    if (availabilityFilter.length > 0) {
      result = result.filter((task) =>
        task.availability.some((availability) =>
          availabilityFilter.includes(availability)
        )
      );
    }

    if (cityFilter) {
      result = result.filter(
        (task) =>
          task.city && task.city.city.toLowerCase() === cityFilter.toLowerCase()
      );
    }

    if (locationFromFilter) {
      result = result.filter(
        (task) =>
          task.from &&
          task.from.cityFrom.toLowerCase() === locationFromFilter.toLowerCase()
      );
    }

    setFilteredTasks(result);
  }, [
    location,
    filter,
    tasks,
    categoryFilter,
    availabilityFilter,
    cityFilter,
    locationFromFilter,
    showAll,
  ]);

  const handleResetFilters = () => {
    setCategoryFilter('');
    setAvailabilityFilter([]);
    setCityFilter('');
    setLocationFromFilter('');
    setFilter('');
  };

  // Function to calculate the appropriate geohash precision based on the distance
  function calculateGeohashPrecisionForDistance(distance) {
    // This function should be adjusted based on empirical testing and may vary
    // according to the specific geohash implementation details.
    if (distance < 5) return 7; // around 2.4 km x 4.9 km
    if (distance < 20) return 6; // around 4.9 km x 9.7 km
    if (distance < 80) return 5; // around 20 km x 20 km
    if (distance < 600) return 4; // around 78 km x 78 km
    return 3; // up to 500+ km
  }
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-white">
      <div>
        {location?.latitude} / {location?.longitude}
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <FilterBar
                      distanceRange={distanceRange}
                      handleDistanceRangeChange={handleDistanceRangeChange}
                      language={language}
                      callingPage="home"
                      onClose={setMobileFiltersOpen}
                      setMobileFiltersOpen={setMobileFiltersOpen}
                      mobileFiltersOpen={mobileFiltersOpen}
                      citiesHebrew={citiesHebrew}
                      weekDaysOptions={weekDaysOptions}
                      handleResetFilters={handleResetFilters}
                      categories={categories}
                      handleCategoryFilterChange={handleCategoryFilterChange}
                      categoryFilter={categoryFilter}
                      handleAvailabilityFilterChange={
                        handleAvailabilityFilterChange
                      }
                      availabilityFilter={availabilityFilter}
                      handleCityFilterChange={handleCityFilterChange}
                      cityFilter={cityFilter}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <Header title="Requests and Proposals" />
            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Tasks
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="hidden md:block bg-gray-100">
                <FilterBar
                  distanceRange={distanceRange}
                  handleDistanceRangeChange={handleDistanceRangeChange}
                  language={language}
                  callingPage="home"
                  mobileFiltersOpen={!mobileFiltersOpen}
                  citiesHebrew={citiesHebrew}
                  weekDaysOptions={weekDaysOptions}
                  handleResetFilters={handleResetFilters}
                  statuses={statuses}
                  categories={categories}
                  handleCategoryFilterChange={handleCategoryFilterChange}
                  categoryFilter={categoryFilter}
                  handleAvailabilityFilterChange={
                    handleAvailabilityFilterChange
                  }
                  availabilityFilter={availabilityFilter}
                  handleCityFilterChange={handleCityFilterChange}
                  cityFilter={cityFilter}
                />
              </div>
              <div className="lg:col-span-3">
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="mb-4 ml-4">
                    <RequestsProposalsTab
                      language={language}
                      currentTab={currentTab}
                      setCurrentTab={setCurrentTab}
                    />
                  </div>
                  <div className="flex flex-row">
                    <TaskList tasks={filteredTasks} />{' '}
                  </div>
                </Suspense>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
