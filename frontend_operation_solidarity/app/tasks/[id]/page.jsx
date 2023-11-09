'use client';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';

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
  PhoneArrowUpRightIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const TaskDetails = ({ params }) => {
  const { language, labels, statuses, weekDays, categories } =
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
      <div className="mx-4 md:mx-40 ">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 justify-center">
            <BackButton className="ml-2 mb-2 max-w-md "> </BackButton>
          </div>
        </div>
        <div
          dir={direction}
          className={`transition-shadow duration-300 mt-6 bg-white shadow-lg rounded-lg 
          
            ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
        >
          <div
            className="col-span-4 col-start-2 sm:col-span-12 sm:col-start-1 
              mt-2 md:mt-3 
              px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-500 to-primary-500"
          >
            <h3 className="text-2xl leading-6 font-semibold text-white">
              {taskDetails.taskType === 'request'
                ? labels[language].requestDetails
                : labels[language].proposalDetails}
            </h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-6 shadow-sm">
            <div class="p-4 cols-span-1 md:col-span-6 md:col-start-1 bg-supporting1-100">
              <div className="flex flex-row">
                <p classname="font-semibold text-xl">
                  {' '}
                  {labels[language].description}
                </p>
                <p>{':\u00A0 '}</p>
                <p>{taskDetails.description}</p>
              </div>
            </div>

            <div class="p-4 cols-span-1 md:col-span-1">
              <div className="flex flex-row">
                <p classname="font-semibold text-xl">
                  {' '}
                  {labels[language].category}
                </p>
                <p>{':\u00A0 '}</p>
                <p>
                  {translateCategory(
                    categories,
                    taskDetails.category,
                    language
                  )}
                </p>
              </div>
            </div>
            <div class="p-4 cols-span-1 md:col-span-1">
              <div className="flex flex-row">
                <p classname="font-semibold text-xl">
                  {' '}
                  {labels[language].statusLabel}
                </p>
                <p>{':\u00A0 '}</p>
                <p>{translateStatus(statuses, taskDetails.status, language)}</p>
              </div>
            </div>
            <div class="p-4 cols-span-1 md:col-span-4">
              <div className="flex flex-row">
                <p classname="font-semibold text-xl">
                  {' '}
                  {labels[language].requiredDays}
                </p>
                <p>{':\u00A0 '}</p>
                {taskDetails.availability.map((day, index) => (
                  <p className="capitalize" key={index}>
                    {translateAvailability(weekDays, day, language)}{' '}
                  </p>
                ))}
              </div>
            </div>

            <div class="p-4 cols-span-1 md:col-span-3">
              {/* Location */}
              <div className="flex flex-row">
                <p>
                  {taskDetails.city ? (
                    <div>
                      <p classname="font-semibold text-xl">
                        {' '}
                        {labels[language].cityAndAddress}
                      </p>
                      <p>{':\u00A0 '}</p>
                      <p>{translateCity(taskDetails.city.city, language)}</p>
                    </div>
                  ) : (
                    <div className="flex flex-row">
                      <div className="flex ">
                        <p>{labels[language].startingPoint}</p>
                        <p>{':\u00A0 '}</p>
                        <p>
                          {translateCity(taskDetails.from.cityFrom, language)}
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span>{'\u00A0\u00A0 '}</span>
                        <span className="">
                          {' '}
                          {direction === 'ltr' ? (
                            <ArrowRightIcon className="h-5 w-5  text-gray-500" />
                          ) : (
                            <ArrowLeftIcon className="h-5 w-5  text-gray-500" />
                          )}
                        </span>
                        <span>{'\u00A0\u00A0 '}</span>
                      </div>
                      <div className="flex flex-1 justify-between ">
                        <p>{labels[language].targetPoint}</p>
                        <p>{':\u00A0 '}</p>
                        <p>{translateCity(taskDetails.to.cityTo, language)}</p>
                      </div>
                    </div>
                  )}
                </p>
              </div>
            </div>
            <div class="p-4 cols-span-1 md:col-span-6 md:col-start-1 bg-supporting1-100">
              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon
                      className="h-5 w-5 text-secondary-400"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${taskDetails.email}`}
                      className="text-md hover:underline"
                    >
                      {taskDetails.email}
                    </a>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="flex items-center space-x-2">
                    <PhoneIcon
                      className="h-5 w-5 text-secondary-400"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${taskDetails.contact.phone}`}
                      className="text-md hover:underline"
                    >
                      {taskDetails.contact.phone}
                    </a>
                  </div>
                  <div className="flex mt-2">
                    <a
                      href={`https://wa.me/${taskDetails.contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 mr-4 p-2 text-sm font-semibold
                      hover:underline text-green-500"
                    >
                      <ChatBubbleBottomCenterIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${taskDetails.contact.phone}`}
                      className="flex items-center space-x-2 p-2 hover:underline"
                    >
                      <PhoneArrowUpRightIcon
                        className="h-5 w-5 text-secondary-400"
                        aria-hidden="true"
                      />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 cols-span-1 md:col-span-6 md:col-start-1 bg-supporting2-400">
              Comments
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default TaskDetails;
