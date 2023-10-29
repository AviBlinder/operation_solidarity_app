'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
const updateProposal = ({ params }) => {
  const searchParams = useSearchParams();
  const entryDate = searchParams.get('entryDate');
  console.log('entryDate: ', entryDate);
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `/api/tasks/${params?.id}?entryDate=${entryDate}`
      );
      const data = await response.json();
      console.log(data);
      setTask(data);
    };

    if (params?.id) fetchTask();
  }, [params.id]);

  return (
    <div>
      Update proposal page
      <div> Task details {task.description}</div>
    </div>
  );
};

export default updateProposal;
