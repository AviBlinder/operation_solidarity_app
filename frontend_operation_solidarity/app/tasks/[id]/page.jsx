'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Loading from './loading';
import BackButton from '@/components/BackButton';
import { formatDate, translateCategory, translateStatus } from '@/app/utils';
import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/20/solid';

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
    <Suspense fallback={<Loading />}>
      <div className="flex justify-center my-10 p-4 ">
        <div className="max-w-3xl   overflow-hidden">
          <div className="">
            <div className=" ">
              <div className="flex flex-col md:flex-row mt-6">
                <div className="w-[50%] flex flex-1">
                  <BackButton
                    language={language}
                    className="ml-2 mb-2 max-w-md "
                  >
                    {' '}
                  </BackButton>
                </div>
              </div>
              <div className="mt-6 bg-white shadow-lg rounded-lg grid grid-cols-6 sm:grid-cols-12">
                <div
                  className="col-span-4 col-start-2 sm:col-span-12 sm:col-start-1  text-right
              px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-500 to-primary-500"
                >
                  <h3 className="text-lg leading-6 font-semibold text-white">
                    {taskDetails.taskType === 'request'
                      ? 'פרטי הבקשה'
                      : 'פרטי ההצעה'}
                  </h3>
                  <p className="mt-1 text-xl text-purple-200">פרטים מלאים</p>
                </div>
                <div
                  className="col-span-4 col-start-2 sm:col-span-12 sm:col-start-1 
                text-right px-4 py-5 sm:p-6"
                >
                  <div className="px-2 md:px-20">
                    <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1 text-right">
                      <dt className="text-xl font-medium text-gray-500">
                        תיאור
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900">
                        {taskDetails.description}
                      </dd>
                    </div>
                    <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="text-xl font-medium text-gray-500">
                        תאריך פרסום
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900">
                        {formatDate(taskDetails.entryDate)}
                      </dd>
                    </div>
                    <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="text-xl font-medium text-gray-500">
                        קטגוריה
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900">
                        {translateCategory(taskDetails.category)}
                      </dd>
                    </div>
                    <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="text-xl font-medium text-gray-500">
                        סטטוס
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900">
                        {translateStatus(taskDetails.status)}
                      </dd>
                    </div>
                    <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="text-xl font-medium text-gray-500">
                        ימים בשבוע: {taskDetails.availability.length}
                      </dt>
                      {taskDetails.availability.map((day, index) => (
                        <dd className="mt-1 text-xl text-gray-900" key={index}>
                          {' '}
                          {day}{' '}
                        </dd>
                      ))}
                    </div>
                    {taskDetails.city ? (
                      <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                        <dt className="text-xl font-medium text-gray-500">
                          מיקום:
                        </dt>
                        <dd className="mt-1 text-xl text-gray-900">
                          {taskDetails.city.city}
                        </dd>
                      </div>
                    ) : (
                      <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                        <dt className="text-xl font-medium text-gray-500">
                          :מאיפה לאיפה
                        </dt>
                        <dd className="mt-1 text-xl text-gray-900">
                          מ{''}
                          {taskDetails.from.cityFrom} ל{''}
                          {taskDetails.to.cityTo}
                        </dd>
                      </div>
                    )}

                    <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="text-xl font-medium text-gray-500 ">
                        מייל ליצרית קשר
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900 truncate ">
                        <a
                          href={`mailto:${taskDetails.email}`}
                          className="flex flex-col md:flex-row"
                        >
                          <EnvelopeIcon
                            className="h-5 w-5  md:mt-2 text-secondary-400"
                            aria-hidden="true"
                          />
                          <span className="ml-1 md:ml-2 text-md`">
                            {taskDetails.email}
                          </span>
                        </a>
                      </dd>
                    </div>
                    <div className="mt-4 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="mt-4 text-xl font-medium text-gray-500 ">
                        טלפון ליצרית קשר
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900 truncate">
                        {taskDetails.contact.phone}

                        <div className="flex flex-col md:flex-row justify-center">
                          <a
                            href={`https://wa.me/${taskDetails.contact.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-3 rounded-br-lg border border-transparent p-4 text-sm font-semibold text-green-500"
                          >
                            <ChatBubbleBottomCenterIcon
                              className="h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            <span className="ml-1 md:ml-2`">WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${taskDetails.contact.phone}`}
                            className="flex items-center justify-center space-x-3 rounded-br-lg border border-transparent p-4 text-sm font-semibold text-gray-900"
                          >
                            <PhoneIcon
                              className="h-5 w-5 text-secondary-400"
                              aria-hidden="true"
                            />
                            <span className="ml-1 md:ml-2`">Call</span>
                          </a>
                        </div>
                      </dd>
                    </div>
                    <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                      <dt className="text-xl font-medium text-gray-500">
                        הערות
                      </dt>
                      <dd className="mt-1 text-xl text-gray-900">
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
    </Suspense>
  );
};

export default TaskDetails;
