'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// import Profile from '../components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log('inside useEffect');
      // const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const response = await fetch(`/api/users`);
      const data = await response.json();
      console.log('data =', data);
      setMyTasks(data);
    };

    // if (session?.user.id) fetchTasks();
    fetchTasks();

    return () => {
      setMyTasks([]);
    };
    //
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredTasks = myTasks.filter((item) => item._id !== post._id);

        setMyTasks(filteredTasks);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      Profile Page !
      <div>
        {myTasks.map((post, index) => (
          <div key={index}>
            {' '}
            {post.taskId} - {post.name}{' '}
          </div>
        ))}
      </div>
    </div>
    // <Profile
    //   name={session?.user.name}
    //   desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
    //   data={myTasks}
    //   handleEdit={handleEdit}
    //   handleDelete={handleDelete}
    // />
  );
};

export default MyProfile;
