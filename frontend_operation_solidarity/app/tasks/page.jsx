'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { categories, statuses, labels } from '@/constants/index';

import { useState, useEffect, Fragment, Suspense } from 'react';
import { useSession } from 'next-auth/react';

import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import FilterBar from '@/components/FilterBar';

import { weekDays } from '@/constants/index';
import { cities_short_list } from '@/constants/index';
import RequestsProposalsTab from '@/components/RequestsProposalsTab';

export default function Tasks() {
  const [currentTab, setCurrentTab] = useState('Requests');
  const [language, setLanguage] = useState('he');

  const { data: session } = useSession();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const weekDaysHebrew = weekDays.hebrew;
  // const weekDaysEnglish = weekDays.english;
  const weekDaysOptions = weekDaysHebrew.map((day) => ({
    value: day,
    label: day,
  }));

  const citiesHebrew = cities_short_list.map((city) => city.cityHebrew);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [showAll, setShowAll] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [availability, setAvailability] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [locationFromFilter, setLocationFromFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [emptyDB, setEmptyDB] = useState(false);
  const handleCategoryFilterChange = (event) => {
    if (event.target.value === 'all') {
      setCategoryFilter('');
      setShowAll(true);
    } else {
      setShowAll(false);
      setCategoryFilter(event.target.value);
    }
  };
  const handleStatusFilterChange = (event) => {
    if (event.target.value === 'all') {
      setStatusFilter('');
      setShowAll(true);
    } else {
      setShowAll(false);
      setStatusFilter(event.target.value);
    }
  };

  const handleAvailabilityFilterChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setAvailabilityFilter(values);
  };

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      let response = [];
      const fetchEmailTypeRequest = session?.user.email + '-request';
      const fetchEmailTypeProposal = session?.user.email + '-proposal';
      if (session?.user.email) {
        if (currentTab === 'Requests') {
          response = await fetch(
            `/api/tasks?emailTypeRequest=${fetchEmailTypeRequest}`
          );
        } else {
          response = await fetch(
            `/api/tasks?emailTypeRequest=${fetchEmailTypeProposal}`
          );
        }

        const data = await response.json();
        data.length === 0 ? setTasks([]) : setTasks(data);
        // setTasks(data);
        setFilteredTasks(data);
      }
    };
    fetchTasks();
  }, [session, currentTab]);

  useEffect(() => {
    let result = [...tasks];
    // Existing filter and sort logic

    if (categoryFilter) {
      result = result.filter((task) =>
        task.category.includes(categoryFilter.toLocaleLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter((task) =>
        task.status.includes(statusFilter.toLocaleLowerCase())
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
    filter,
    tasks,
    categoryFilter,
    statusFilter,
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
                      language={language}
                      callingPage="tasks"
                      onClose={setMobileFiltersOpen}
                      setMobileFiltersOpen={setMobileFiltersOpen}
                      mobileFiltersOpen={mobileFiltersOpen}
                      citiesHebrew={citiesHebrew}
                      weekDaysOptions={weekDaysOptions}
                      handleResetFilters={handleResetFilters}
                      handleStatusFilterChange={handleStatusFilterChange}
                      statuses={statuses}
                      statusFilter={statusFilter}
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
            <Header title="My Requests and Proposals" />
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
                  language={language}
                  callingPage="tasks"
                  mobileFiltersOpen={!mobileFiltersOpen}
                  citiesHebrew={citiesHebrew}
                  weekDaysOptions={weekDaysOptions}
                  handleResetFilters={handleResetFilters}
                  handleStatusFilterChange={handleStatusFilterChange}
                  statuses={statuses}
                  statusFilter={statusFilter}
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
