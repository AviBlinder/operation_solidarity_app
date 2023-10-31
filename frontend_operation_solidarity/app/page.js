'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import FilterBar from '@/components/FilterBar';

import { weekDays } from '@/constants/index';
import { cities_short_list } from '@/constants/index';

export default function Home() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [categoriesHebrew, setCategoriesHebrew] = useState([]);

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
        <Header />
        <div className="flex">
          <FilterBar
            categories={categories}
            citiesHebrew={citiesHebrew}
            weekDaysOptions={weekDaysOptions}
            handleResetFilters={handleResetFilters}
            handleCategoryFilterChange={handleCategoryFilterChange}
            categoryFilter={categoryFilter}
            handleAvailabilityFilterChange={handleAvailabilityFilterChange}
            availabilityFilter={availabilityFilter}
            handleCityFilterChange={handleCityFilterChange}
            cityFilter={cityFilter}
          />

          <div className="flex justify-between mb-4">
            <div>{/* Sorting and Filtering UI Elements */}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <TaskList tasks={filteredTasks} />
        </div>
      </div>
    </main>
  );
}
