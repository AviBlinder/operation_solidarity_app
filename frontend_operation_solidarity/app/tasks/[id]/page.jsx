'use client';
import { Suspense } from 'react';
import Loading from '../loading';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSearchParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
const TaskDetails = ({ params }) => {
  const [taskDetails, setTaskDetails] = useState([]);
  const searchParams = useSearchParams();
  const entryDate = searchParams.get('entryDate');

  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/tasks/${params?.id}?entryDate=${entryDate}`
      );
      const data = await response.json();
      console.log('data =', data);

      setTaskDetails(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    //
    <Suspense fallback={<Loading />}>
      <div className="max-w-2xl mx-auto my-10 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <BackButton />
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-500 to-indigo-500">
            <h3 className="text-lg leading-6 font-semibold text-white">
              Task Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-purple-200">
              Information about the task.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {Object.entries(taskDetails).map(([key, value], index) => (
                <div
                  key={key}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } px-4 py-5 grid grid-cols-3 gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-gray-500">
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {Array.isArray(value) ? (
                      value.join(', ')
                    ) : typeof value === 'object' && value !== null ? (
                      <pre className="whitespace-pre-wrap text-xs">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : key.toLowerCase().includes('date') ? (
                      formatDate(value)
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default TaskDetails;
