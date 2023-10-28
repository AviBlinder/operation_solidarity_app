'use client';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// import Profile from '../components/Profile';

const UserTasks = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        `/api/tasks?userEmail=${session?.user.email}`
      );
      const data = await response.json();
      setMyTasks(data);
    };

    // if (session?.user.id) fetchTasks();
    fetchTasks();

    return () => {
      setMyTasks([]);
    };
    //
  }, [session?.user.id]);

  return (
    <section className="bg-primary-400/90">
      Tasks Page !
      <Suspense fallback={<div>Loading Your tasks...</div>}>
        <ul>
          {myTasks.map((post, index) => (
            <div key={index}>
              <li>
                <p>{post.description} </p>
                {/* <p> Requester: {post.email}</p> */}
              </li>
            </div>
          ))}
        </ul>
        <div className="bg-supporting2-300/95 h-28 w-28"> Secondary</div>
      </Suspense>
    </section>
  );
};

export default UserTasks;
