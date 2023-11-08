'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Loading from './loading';
import BackButton from '@/components/BackButton';
import {
  formatDate,
  translateCategory,
  translateStatus,
  translateAvailability,
  translateCity,
} from '@/app/utils';

import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const TaskDetails = ({ params }) => {
  const { language, labels, statuses, weekDays, cities, categories } =
    useContext(RefDataContext);
  const direction = language === 'he' ? 'rtl' : 'ltr';

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
      <div className="flex justify-center my-2 p-4 ">
        <div className="max-w-3xl   overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-[50%] flex flex-1">
              <BackButton className="ml-2 mb-2 max-w-md "> </BackButton>
            </div>
          </div>
          <div
            dir={direction}
            className={`transition-shadow duration-300 mt-6 bg-white shadow-lg rounded-lg grid grid-cols-6 sm:grid-cols-12
            ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
          >
            <div
              className="col-span-4 col-start-2 sm:col-span-12 sm:col-start-1 
              mt-2 md:mt-3 rounded-lg 
              px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-500 to-primary-500"
            >
              <h3 className="text-lg leading-6 font-semibold text-white">
                {taskDetails.taskType === 'request'
                  ? labels[language].requestDetails
                  : labels[language].proposalDetails}
              </h3>
              <p className="mt-1 text-xl text-purple-200">
                {labels[language].fullDetails}
              </p>
            </div>
            <div
              className="col-span-4 col-start-2 sm:col-span-12 sm:col-start-1 
                 px-4 py-5 sm:p-2"
            >
              <div className="px-2 md:px-20">
                <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1 ">
                  <dt className="text-xl font-medium text-gray-500">
                    {labels[language].description}
                  </dt>
                  <dd className="mt-1 text-xl text-gray-900">
                    {taskDetails.description}
                  </dd>
                </div>
                <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                  <dt className="text-xl font-medium text-gray-500">
                    {labels[language].publishDate}
                  </dt>
                  <dd className="mt-1 text-xl text-gray-900">
                    {formatDate(taskDetails.entryDate)}
                  </dd>
                </div>
                <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                  <dt className="text-xl font-medium text-gray-500">
                    {labels[language].category}
                  </dt>
                  <dd className="mt-1 text-xl text-gray-900">
                    {translateCategory(
                      categories,
                      taskDetails.category,
                      language
                    )}
                  </dd>
                </div>
                <div className="col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                  <dt className="text-xl font-medium text-gray-500">
                    {labels[language].statusLabel}
                  </dt>
                  <dd className="mt-1 text-xl text-gray-900">
                    {translateStatus(statuses, taskDetails.status, language)}
                  </dd>
                </div>
                <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                  <dt className="text-xl font-medium text-gray-500">
                    {labels[language].requiredDays}:{' '}
                    {taskDetails.availability.length}
                  </dt>
                  {taskDetails.availability.map((day, index) => (
                    <dd className="mt-1 text-xl text-gray-900" key={index}>
                      {' '}
                      {translateAvailability(weekDays, day, language)}{' '}
                    </dd>
                  ))}
                </div>
                {taskDetails.city ? (
                  <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-xl font-medium text-gray-500">
                      מיקום:
                    </dt>
                    <dd className="mt-1 text-xl text-gray-900">
                      {translateCity(taskDetails.city.city, language)}
                    </dd>
                  </div>
                ) : (
                  <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                    <dt className="text-xl font-medium text-gray-500">
                      {labels[language].startingPoint}
                    </dt>
                    <dd className="mt-1 text-xl text-gray-900">
                      {translateCity(taskDetails.from.cityFrom, language)}
                    </dd>
                    <dt className="text-xl font-medium text-gray-500">
                      {labels[language].targetPoint}
                    </dt>
                    <dd className="mt-1 text-xl text-gray-900">
                      {translateCity(taskDetails.to.cityTo, language)}
                    </dd>
                  </div>
                )}

                <div className="mt-4 border-t-2 col-span-4 col-start-2 sm:col-span-6 sm:col-start-1">
                  <dt className="text-xl font-medium text-gray-500 ">
                    {labels[language].emailDetails}
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
                    {labels[language].phoneDetails}
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
                    {labels[language].commentsLabel}
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
    </Suspense>
  );
};

export default TaskDetails;
