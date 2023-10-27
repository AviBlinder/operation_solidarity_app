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
      </div>
    </main>
  );
}
