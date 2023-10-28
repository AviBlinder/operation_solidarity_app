'use client';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CreateRequestForm from '@/components/CreateRequestForm';
import Loading from './loading';

//

const CreateRequest = () => {
  const { data: session } = useSession();

  const [post, setPost] = useState({
    description: '',
    category: '',
    city: '',
    address: '',
    from: '',
    to: '',
    status: '',
    ableDays: [''],
    entryDate: '',
  });
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initPost = () => {};

  const createRequest = async (e) => {
    console.log('inside createRequest', e);
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tasks/new', {
        method: 'POST',
        body: JSON.stringify({
          //
          email: session?.user.email,
          userId: session?.user.userId,
          userName: session?.user.name,
          description: post.description,
          category: post.category,
          city: post.city,
          address: post.address,
          from: post.from,
          to: post.to,
          status: 'new',
          availability: post.ableDays,
          entryDate: new Date(),
        }),
      });
      if (response.ok) {
        setPost({
          description: '',
          category: '',
          city: '',
          address: '',
          from: '',
          to: '',
          status: '',
          ableDays: [''],
          entryDate: '',
        });

        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
      router.push('/profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <p className=" desc text-left max-w-md">
        <span className="blue_gradient text-2xl ml-8 text-center font-bold ">
          Create Request Form Page
        </span>
      </p>
      <Suspense fallback={<Loading />}>
        <CreateRequestForm
          type="request"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createRequest}
        />
      </Suspense>
    </div>
  );
};

export default CreateRequest;
