'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import TaskCard from '@/components/TaskCard';

export default function Home() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('entryDate');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Fetch the tasks from your API or server here
    const fetchTasks = async () => {
      const response = await fetch(`/api/tasks/`);
      const data = await response.json();
      setTasks(data);
      console.log('data: ', data);
      setFilteredTasks(data);
    };
    if (session?.user.email) {
      fetchTasks();
    }
  }, [session]);

  useEffect(() => {
    let result = [...tasks];

    if (filter) {
      result = result.filter((task) =>
        Object.values(task).some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setFilteredTasks(result);
  }, [filter, sortField, sortOrder, tasks]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <main>
      <div>
        <div className="text-4xl">Operation Solidarity</div>
        <div>
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
