'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// import { useRouter } from 'next/navigation';

export default function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const { data: session } = useSession();

  const fetchUserTasks = async () => {
    const response = await fetch(`/api/tasks?userEmail=${session?.user.email}`);
    const data = await response.json();

    setUserTasks(data);
  };
  return (
    <main>
      <div>
        <div className="text-4xl">Operation Solidarity</div>
        <div>
          {session?.user.email ? (
            <button className="black_btn" onClick={fetchUserTasks}>
              Get My Tasks
            </button>
          ) : (
            <div> Login to get your tasks</div>
          )}
        </div>
      </div>
    </main>
  );
}
