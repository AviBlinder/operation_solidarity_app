import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

import {
  formatDate,
  translateCategory,
  translateAvailability,
} from '@/app/utils/index';
const TaskCard = ({ task }) => {
  const { data: session } = useSession();
  const { language, labels, categories, weekDays, cities } =
    useContext(RefDataContext);
  const direction = language === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="bg-primary-100 mx-2 my-4 p-4 rounded-xl shadow-lg hover:shadow-2xl ">
      <div
        dir={direction}
        className={` transition-shadow duration-300 ${
          direction === 'rtl' ? 'text-right' : 'text-left'
        }`}
      >
        <div className="flex flex-col w-full  space-x-2 p-6">
          <div className="flex flex-wrap flex-col rounded-full  px-1.5 py-0.5 text-xl font-medium ">
            <p className="font-bold mt-1 whitespace-normal text-xl text-gray-500 ">
              {labels[language].description}
            </p>
            <p className="mt-1 text-center whitespace-normal text-xl text-gray-500 ">
              {task.description}
            </p>
          </div>
          <div className="flex flex-wrap flex-col  rounded-full  px-1.5 py-0.5 text-xl font-medium ">
            <p className="font-bold mt-1 whitespace-normal text-xl text-gray-500 ">
              {labels[language].category}
            </p>

            <p className="mt-1 text-xl text-gray-500">
              {translateCategory(categories, task.category, language)}
            </p>
          </div>
          <div className="flex flex-wrap flex-col  rounded-full  px-1.5 py-0.5 text-xl font-medium ">
            <p className="font-bold mt-1 whitespace-normal text-xl text-gray-500 ">
              {labels[language].publishDate}
            </p>

            <p className=" mt-1 text-xl text-gray-500">
              {formatDate(task.entryDate)}
            </p>
          </div>

          <div className="text left flex flex-col w-full items-center justify-between space-y-2 p-2">
            <Link
              className="text-white mx-6 w-full mt-1 bg-secondary-400 rounded-lg"
              href={`/tasks/${task.taskId}?entryDate=${task.entryDate}`}
            >
              <div className="flex flex-row flex-wrap justify-center align-middle p-1">
                <span className="mx-2 text-sm">
                  {labels[language].additionalDetails}
                </span>
                <FaEye size={20} className="text-gray-600/80 ml-3 mt-1"></FaEye>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="divide-y divide-blue-200"></div> */}
      <div className="border-t-2 bg-gray-200/90">
        <div className="flex flex-col md:flex-row ">
          <div className="flex flex-1">
            <a
              href={`mailto:${task.email}`}
              className="flex items-center justify-center space-x-3 rounded-bl-lg border border-transparent p-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="ml-1 md:ml-2`">Email</span>
            </a>
          </div>
          {task.contact && (
            <div className="flex flex-1 flex-wrap">
              <a
                href={`tel:${task.contact.phone}`}
                className="flex items-center justify-center space-x-3 rounded-br-lg border border-transparent p-4 text-sm font-semibold text-gray-900"
              >
                <PhoneIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-1 md:ml-2`">Call</span>
              </a>
            </div>
          )}
        </div>
        {task.contact && (
          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-1">
              <a
                href={`https://wa.me/${task.contact.phone}`}
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
            </div>
          </div>
        )}

        {session?.user.email === task.email && (
          <div className="flex flex-col w-full items-center justify-between space-y-2 p-1">
            <Link
              className="text-white mx-6 w-full mt-1 mb-4 bg-secondary-400 rounded-lg"
              href={`/${task.taskType}/update/${task.taskId}?entryDate=${task.entryDate}`}
            >
              <div className="flex flex-row flex-wrap justify-center align-middle p-1">
                <span className="mx-2">{labels[language].updateDetails}</span>
                <FaPencilAlt
                  size={20}
                  className="text-gray-600/80 ml-3 mt-1"
                ></FaPencilAlt>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
