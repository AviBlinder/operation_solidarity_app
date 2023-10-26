'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// import { useRouter } from 'next/navigation';

export default function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession();

  const fetchCategories = async () => {
    const response = await fetch(`/api/reference-data/categories`, {
      next: { revalidate: 3600 },
    });
    const categories = await response.json();
    console.log('fetched categories = ', categories);
    setCategories(categories);
  };

  const fetchUserTasks = async () => {
    const response = await fetch(`/api/tasks?userEmail=${session?.user.email}`);
    const tasks = await response.json();

    setUserTasks(tasks);
  };
  return (
    <main>
      <div>
        <div className="text-4xl">Operation Solidarity</div>
        <ul>
          {' '}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index}>{category.itemName}</div>
            ))
          ) : (
            <div>No categories</div>
          )}
        </ul>
        <div>
          <button onClick={fetchCategories} className="black_btn">
            Get Categories
          </button>
          {session?.user.email ? (
            <button className="black_btn" onClick={fetchUserTasks}>
              Get My Tasks
            </button>
          ) : (
            <div> Login to get your tasks</div>
          )}
        </div>
        {session?.user.email && userTasks.length > 0 ? (
          <div>
            {' '}
            {userTasks.map((task) => (
              <div>{task.description}</div>
            ))}
          </div>
        ) : (
          session?.user.email && <div> No tasks</div>
        )}
      </div>
    </main>
  );
}
