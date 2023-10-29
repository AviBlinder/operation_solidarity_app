'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function TaskList() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('entryDate');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Fetch the tasks from your API or server here
    const fetchTasks = async () => {
      const response = await fetch(
        `/api/tasks?userEmail=${session?.user.email}`
      );
      const data = await response.json();
      setTasks(data);
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
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <label>
            Sort by:
            <select
              value={sortField}
              onChange={handleSortFieldChange}
              className="ml-2 px-2 py-1 border rounded"
            >
              {/* Add sort fields based on your task structure */}
              <option value="entryDate">Entry Date</option>
              <option value="description">Description</option>
              <option value="category">Category</option>
            </select>
          </label>
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="ml-2 px-2 py-1 border rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <ul className="flex flex-row gap-6 ">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            // className="mb-4 p-4 border rounded bg-white shadow-md"
            className={`mb-4 p-4 border rounded-xl shadow-md ${
              task.taskType === 'request'
                ? 'bg-red-200'
                : task.taskType === 'proposal'
                ? 'bg-yellow-200'
                : 'bg-white'
            }`}
          >
            <h3 className="text-lg font-semibold text-primary-800">
              {task.description || 'No Description'}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Task Type:</strong> {task.taskType || 'N/A'}
            </p>

            <p className="text-sm text-gray-600">
              <strong>Category:</strong> {task.category || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>City:</strong> {task?.city?.city || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong>{' '}
              {task.status
                ? task.status.charAt(0).toUpperCase() + task.status.slice(1)
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Entry Date:</strong>{' '}
              {task.entryDate
                ? new Date(task.entryDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
