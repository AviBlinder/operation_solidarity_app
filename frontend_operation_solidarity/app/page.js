'use client';
import Select from 'react-select';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import TaskCard from '@/components/TaskCard';
import { weekDays } from '@/constants/index';

export default function Home() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [categoriesHebrew, setCategoriesHebrew] = useState([]);

  const weekDaysHebrew = weekDays.hebrew;
  const weekDaysEnglish = weekDays.english;
  const weekDaysOptions = weekDaysHebrew.map((day) => ({
    value: day,
    label: day,
  }));

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [showAll, setShowAll] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availability, setAvailability] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [locationFromFilter, setLocationFromFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('entryDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleCategoryFilterChange = (event) => {
    if (event.target.value === 'all') {
      setShowAll(true);
    } else {
      setShowAll(false);
      setCategoryFilter(event.target.value);
    }
  };

  const handleAvailabilityFilterChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setAvailabilityFilter(values);

    // const options = event.target.options;
    // const values = selectedOptions.map((option) => option.value);

    // const value = [];
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }

    // setAvailabilityFilter(values);
  };

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleLocationFromFilterChange = (event) => {
    setLocationFromFilter(event.target.value);
  };

  // load Categories
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
      setAvailability(categoriesHebrewNames);
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
  useEffect(() => {
    // Fetch the tasks from your API or server here
    const fetchTasks = async () => {
      const response = await fetch(`/api/tasks/`);
      const data = await response.json();
      setTasks(data);
      console.log('data: ', data);
      setFilteredTasks(data);
    };
    // if (session?.user.email) {
    fetchTasks();
    // }
  }, [session]);

  useEffect(() => {
    let result = [...tasks];

    // Existing filter and sort logic

    if (categoryFilter) {
      result = result.filter((task) => task.category.includes(categoryFilter));
    }

    if (availabilityFilter.length > 0) {
      // result = result.filter((task) =>
      //   task.availability.includes(availabilityFilter)
      // );
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
    sortField,
    sortOrder,
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

  return (
    <main>
      <div>
        <div className="text-4xl">Operation Solidarity</div>
        <div className="flex flex-col">
          <div>
            <div className="mb-4">
              <button
                onClick={handleResetFilters}
                className="m-2 p-1 bg-secondary-500 text-white rounded"
              >
                Reset Filters
              </button>

              <label>
                Category:
                <select
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                  className="ml-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              {/* Availability Filter  */}
              <label className="ml-4">
                Availability:
                <Select
                  id="availabilityFilter"
                  value={availabilityFilter.map((value) => ({
                    value,
                    label: value,
                  }))}
                  onChange={handleAvailabilityFilterChange}
                  options={weekDaysOptions}
                  isMulti
                  className="ml-2 w-64"
                  classNamePrefix="react-select"
                />
              </label>

              <label className="ml-4">
                City:
                <input
                  type="text"
                  value={cityFilter}
                  onChange={handleCityFilterChange}
                  className="ml-2"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <div>{/* Sorting and Filtering UI Elements */}</div>
          </div>

          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTasks.length > 0 &&
              filteredTasks.map((task, index) => (
                <li
                  key={index}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                  <TaskCard task={task}></TaskCard>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
