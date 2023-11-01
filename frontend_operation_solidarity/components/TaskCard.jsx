import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaPencilAlt, FaEye } from 'react-icons/fa';

const TaskCard = ({ task }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-primary-100 mx-2 p-2 rounded-xl">
      <div className="">
        <div className=" flex flex-col w-full items-center justify-between space-x-6 p-6">
          <div className="flex truncate ">
            <div className="flex  flex-row items-center space-x-3">
              <div>
                {' '}
                {session?.user.email === task.email &&
                  (task.taskType == 'request' ? (
                    <Link
                      href={`/request/update/${task.taskId}?entryDate=${task.entryDate}`}
                    >
                      {' '}
                      <FaPencilAlt
                        size={20}
                        className="text-primary-500 mr-6"
                      ></FaPencilAlt>
                    </Link>
                  ) : (
                    <Link
                      className="text-primary-500 mr-6"
                      href={`/proposal/update/${task.taskId}?entryDate=${task.entryDate}`}
                    >
                      <FaEye
                        size={20}
                        className="text-primary-500 mr-6"
                      ></FaEye>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {task.taskType}
            </div>
            <Link href={`/tasks/${task.taskId}?entryDate=${task.entryDate}`}>
              {' '}
              <FaPencilAlt
                size={20}
                className="text-primary-500 mr-6"
              ></FaPencilAlt>
            </Link>
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
            <div className="-ml-px flex w-0 flex-1">
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
      </div>
    </div>
  );
};

export default TaskCard;
