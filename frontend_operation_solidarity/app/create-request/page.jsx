'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import Form from '@/components/Form';
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} </span>
      </h1>
      <p className="desc text-left max-w-md">Create Request Form Page</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your request
          </span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Write your request here"
            required
            className="form_textarea "
          />
        </label>

        <label id="from">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            <span className="font-normal">From Location</span>
          </span>
          <input
            name="from"
            value={post.from}
            onChange={(e) => setPost({ ...post, from: e.target.value })}
            type="text"
            placeholder="from where?"
            required
            className="form_input"
          />
        </label>
        <label id="location">Pick a Location:</label>
        <select
          name="location"
          value={post.location}
          onChange={(e) => setPost({ ...post, location: e.target.value })}
          placeholder="From where?"
          className="form_input"
        >
          <option value="Tel-Aviv">Tel-Aviv</option>
          <option value="Hertzlia">Hertzlia</option>
          <option value="Ramat-Gan">Ramat-Gan</option>
        </select>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-blue-500 rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log('session', session);
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    description: '',
    category: '',
    location: '',
    from: '',
    to: '',
    status: '',
    availability: [''],
    entryDate: '',
  });

  // (if event.key === "Escape"...)

  const createRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          //
          userId: session?.user.email,
          userName: session?.user.name,
          description: post.description,
          category: post.category,
          location: post.location,
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
          location: '',
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
      <p>location {post.location}</p>
      <Form
        type="Create Request"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createRequest}
      />
    </div>
  );
};

export default CreatePrompt;
