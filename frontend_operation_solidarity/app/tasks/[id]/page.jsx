'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Loading from '../loading';
import BackButton from '@/components/BackButton';
import { formatDate, translateCategory } from '@/app/utils';

const TaskDetails = ({ params }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const searchParams = useSearchParams();
  const entryDate = searchParams.get('entryDate');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/tasks/${params?.id}?entryDate=${entryDate}`
      );
      const data = await response.json();
      setTaskDetails(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id, entryDate]);

  if (!taskDetails) return <Loading />;

  return (
    <div className="div_main">
      <div className="div_second">
        <div className="div_grid_main">
          <div className="form_span_6_1 ml-10 md:ml-0 ">
            <div className="flex flex-col md:flex-row mt-6">
              <BackButton className="ml-2  max-w-md "> </BackButton>
            </div>
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-500 to-indigo-500">
                <h3 className="text-lg leading-6 font-semibold text-white">
                  {taskDetails.taskType === 'request'
                    ? 'פרטי הבקשה'
                    : 'פרטי ההצעה'}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-purple-200">
                  פרטים מלאים
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {/* <div className="grid grid-cols-1 gap-y-4"> */}
                <div className="grid grid-cols-6 sm:grid-cols-12">
                  <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-sm font-medium text-gray-500">תיאור</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {taskDetails.description}
                    </dd>
                  </div>
                  <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-sm font-medium text-gray-500">
                      תאריך פרסום
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(taskDetails.entryDate)}
                    </dd>
                  </div>
                  <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-sm font-medium text-gray-500">
                      קטגוריה
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {translateCategory(taskDetails.category)}
                    </dd>
                  </div>
                  <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-sm font-medium text-gray-500">
                      מייל ליצרית קשר
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {taskDetails.email}
                    </dd>
                  </div>
                  <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-sm font-medium text-gray-500">
                      טלפון ליצרית קשר
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {taskDetails.contact.phone}
                    </dd>
                  </div>
                  <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-sm font-medium text-gray-500">הערות</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {taskDetails.comments}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
