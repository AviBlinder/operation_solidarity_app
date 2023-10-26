'use client';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

import CreateRequestForm from '@/components/CreateRequestForm';
import Loading from './loading';

const CreateRequest = () => {
  const [post, setPost] = useState({
    description: '',
    category: '',
    city: '',
    street: '',
    from: '',
    to: '',
    status: '',
    availability: [''],
    entryDate: '',
  });
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createRequest = async (e) => {
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
          street: post.street,
          from: post.from,
          to: post.to,
          status: 'new',
          availability: post.availability,
          entryDate: new Date(),
        }),
      });
      if (response.ok) {
        setPost({
          description: '',
          category: '',
          city: '',
          street: '',
          from: '',
          to: '',
          status: '',
          availability: [''],
          entryDate: '',
        });

        router.push('/');
      }
    } catch (error) {
      console.log(error);
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
          type="Create Request"
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
