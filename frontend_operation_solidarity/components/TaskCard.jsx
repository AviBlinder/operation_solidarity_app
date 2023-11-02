import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaPencilAlt, FaEye } from 'react-icons/fa';

const TaskCard = ({ task }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-primary-100 mx-2 p-2 rounded-xl">
      <div className="">
        <div className="flex flex-col w-full items-center justify-between space-x-6 p-6">
          <Link
            className="text-white mx-6 w-full mt-1 mb-4 bg-secondary-400 rounded-lg"
            href={`/tasks/${task.taskId}?entryDate=${task.entryDate}`}
          >
            <div className="flex flex-row flex-wrap justify-center  align-middle   p-2">
              <span className="mx-2 ">View Details</span>
              <FaEye size={20} className="text-gray-600/80 ml-3 mt-1"></FaEye>
            </div>
          </Link>

          <div className="flex truncate ">
            <div className="flex  flex-row items-center space-x-3"></div>
            <div className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {task.taskType}
            </div>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            {task.description}
          </p>
          <p className="mt-1 truncate text-sm text-gray-500">
            Category: {task.category}
          </p>
          <p className="mt-1 truncate text-sm text-gray-500">
            Status: {task.status}
          </p>
          <p className="mt-1 truncate text-sm text-gray-500">
            Availability: {task.availability}
          </p>
        </div>
      </div>
      <div>
        {session?.user.email === task.email && (
          <div className="flex flex-col w-full items-center justify-between space-x-6 p-6">
            <Link
              className="text-white mx-6 w-full mt-1 mb-4 bg-secondary-400 rounded-lg"
              href={`/${task.taskType}/update/${task.taskId}?entryDate=${task.entryDate}`}
            >
              <div className="flex flex-row flex-wrap justify-center  align-middle   p-2">
                <span className="mx-2 ">Update Task</span>
                <FaPencilAlt
                  size={20}
                  className="text-gray-600/80 ml-3 mt-1"
                ></FaPencilAlt>
              </div>
            </Link>
          </div>
        )}
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${task.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Email
            </a>
          </div>
          {task.contact && (
            <div className="flex w-0 flex-1">
              <a
                href={`tel:${task.contact.phone}`}
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <PhoneIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Call
              </a>
            </div>
          )}
        </div>
        {task.contact && (
          <div className="flex flex-1">
            <a
              href={`https://wa.me/${task.contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <ChatBubbleBottomCenterIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
