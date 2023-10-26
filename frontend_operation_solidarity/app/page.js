'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// import { useRouter } from 'next/navigation';

export default function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const { data: session } = useSession();

  const fetchUserTasks = async () => {
    const response = await fetch(`/api/tasks?userEmail=${session?.user.email}`);
    const tasks = await response.json();

    setUserTasks(tasks);
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
