'use client';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CreateProposalForm from '@/components/CreateProposalForm';
import Loading from './loading';

//

const CreateProposal = () => {
  const { data: session } = useSession();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [geoLocations, setGeolocations] = useState({
    cityLat: '',
    cityLng: '',
    fromLat: '',
    fromLng: '',
    toLat: '',
    toLng: '',
  });
  const [task, setTask] = useState({
    description: '',
    category: '',
    city: '',
    address: '',
    from: '',
    to: '',
    status: '',
    entryDate: '',
  });
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks/new', {
        method: 'POST',
        body: JSON.stringify({
          email: session?.user.email,
          userId: session?.user.userId,
          userName: session?.user.name,
          description: task.description,
          taskType: 'proposal',
          category: selectedCategories,
          city: task.city
            ? {
                city: task.city,
                lat: geoLocations.cityLat ? geoLocations.cityLat : null,
                lng: geoLocations.cityLng ? geoLocations.cityLng : null,
              }
            : null,
          address: task.address,
          from: task.from
            ? {
                cityFrom: task.from,
                lat: geoLocations.fromLat ? geoLocations.fromLat : null,
                lng: geoLocations.fromLng ? geoLocations.fromLng : null,
              }
            : null,
          to: task.to
            ? {
                cityTo: task.to,
                lat: geoLocations.toLat ? geoLocations.toLat : null,
                lng: geoLocations.toLng ? geoLocations.toLng : null,
              }
            : null,

          status: 'new',
          availability: availability,
          entryDate: new Date(),
        }),
      });
      if (response.ok) {
        setAvailability([]);
        setSelectedCategories([]);
        setGeolocations({
          cityLat: '',
          cityLng: '',
          fromLat: '',
          fromLng: '',
          toLat: '',
          toLng: '',
        });
        setTask({
          description: '',
          category: '',
          city: '',
          address: '',
          from: '',
          to: '',
          status: '',
          entryDate: '',
        });

        router.push('/tasks');
      }
    } catch (error) {
      console.log(error);
      router.push('/tasks');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <p className=" desc text-left max-w-md">
        <span className="blue_gradient text-2xl ml-8 text-center font-bold ">
          Create Proposal
        </span>
      </p>
      <Suspense fallback={<Loading />}>
        <CreateProposalForm
          type="proposal"
          task={task}
          setTask={setTask}
          availability={availability}
          setAvailability={setAvailability}
          geoLocations={geoLocations}
          setGeolocations={setGeolocations}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          submitting={submitting}
          handleSubmit={createRequest}
        />
      </Suspense>
    </div>
  );
};

export default CreateProposal;
