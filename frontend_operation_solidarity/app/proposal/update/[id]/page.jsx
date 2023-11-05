'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { cities_short_list } from '@/constants/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DescriptionField from '@/components/forms/DescriptionField';
import LocationTypeSelector from '@/components/forms/LocationTypeSelector';
import CitySelector from '@/components/forms/CitySelector';
import FromToSelector from '@/components/forms/FromToSelector';
import AvailabilitySelector from '@/components/forms/AvailabilitySelector';
import CategorySelector from '@/components/forms/CategorySelector';
import StatusSelector from '@/components/forms/StatusSelector';

const updateProposal = ({ params }) => {
  const type = 'propsal';
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryDate = searchParams.get('entryDate');
  const [submitting, setIsSubmitting] = useState(false);

  const [task, setTask] = useState({
    description: '',
    status: '',
    email: '',
    entryDate: '',
    userName: '',
    taskType: '',
    city: '',
    from: '',
    to: '',
    taskType: type,
  });
  const [availability, setAvailability] = useState([]);
  const [geoLocations, setGeolocations] = useState({
    cityLat: '',
    cityLng: '',
    fromLat: '',
    fromLng: '',
    toLat: '',
    toLng: '',
  });

  const { data: session } = useSession();

  const [locationType, setLocationType] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `/api/tasks/${params?.id}/?entryDate=${entryDate}`
      );
      const data = await response.json();
      setTask({
        ...task,
        description: data.description,
        status: data.status,
        email: data.email,
        entryDate: entryDate,
        userName: data.userName,
        taskType: data.taskType,
        category: data.category,
        city: data.city?.city ? data.city.city : '',
        from: data.from?.cityFrom ? data.from.cityFrom : '',
        to: data.to?.cityTo ? data.to.cityTo : '',
      });
      setAvailability([...availability, ...data.availability]);
      setGeolocations({
        ...geoLocations,
        cityLat: data.city?.lat,
        cityLng: data.city?.lng,
        fromLat: data.from?.lat,
        fromLng: data.from?.lng,
        toLat: data.to?.lat,
        toLng: data.to?.lng,
      });
      data.city?.city
        ? setLocationType('cityAddress')
        : setLocationType('fromTo');
    };

    if (params?.id) {
      fetchTask();
    }
  }, [params.id, session?.user.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (locationType === 'cityAddress') {
      setTask((prevTask) => ({ ...prevTask, from: '', to: '' }));
      setGeolocations((prevGeoLocations) => ({
        ...prevGeoLocations,
        fromLat: '',
        fromLng: '',
        toLat: '',
        toLng: '',
      }));
    } else {
      setTask((prevTask) => ({ ...prevTask, city: '' }));
      setGeolocations((prevGeoLocations) => ({
        ...prevGeoLocations,
        cityLat: '',
        cityLng: '',
      }));
    }

    // update start
    try {
      const response = await fetch(
        `/api/tasks/${params?.id}?entryDate=${entryDate}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            accessToken: session.accessToken,
          },

          body: JSON.stringify({
            //
            taskType: task.taskType,
            description: task.description,
            category: task.category,
            city: task.city
              ? {
                  city: task.city,
                  lat: geoLocations.cityLat ? geoLocations.cityLat : null,
                  lng: geoLocations.cityLng ? geoLocations.cityLng : null,
                }
              : null,
            // address: task.address,
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
            status: task.status,
            availability: availability,
            updateDate: new Date(),
          }),
        }
      );
      if (response.ok) {
        setAvailability([]);
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
      console.log('error updatin request ', error);
      router.push('/tasks');
    } finally {
      setIsSubmitting(false);
    }

    // update end
    setIsSubmitting(false);
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {session?.user.email && session?.user.email === task.email ? (
          <form className="bg-gray-100/50" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 sm:grid-cols-6">
              <div className="mt-4 form_span_6">
                <DescriptionField
                  type={type}
                  task={task}
                  setTask={setTask}
                ></DescriptionField>
              </div>
              <div className=" form_span_6">
                <LocationTypeSelector
                  locationType={locationType}
                  setLocationType={setLocationType}
                ></LocationTypeSelector>
              </div>
              {locationType === 'cityAddress' ? (
                <div className=" col-span-4 col-start-2 sm:col-span-2 sm:col-start-2">
                  <CitySelector
                    task={task}
                    setTask={setTask}
                    geoLocations={geoLocations}
                    setGeolocations={setGeolocations}
                    cities_short_list={cities_short_list}
                  ></CitySelector>
                </div>
              ) : (
                <div className=" col-span-4 col-start-2 sm:col-span-2 sm:col-start-2">
                  <FromToSelector
                    cities_short_list={cities_short_list}
                    task={task}
                    setTask={setTask}
                    geoLocations={geoLocations}
                    setGeolocations={setGeolocations}
                  ></FromToSelector>
                </div>
              )}
              <div className="form_fields_division"> </div>
              <div className=" form_span_6">
                <AvailabilitySelector
                  task={task}
                  setTask={setTask}
                  availability={availability}
                  setAvailability={setAvailability}
                ></AvailabilitySelector>
              </div>
              <div className="form_span_3">
                <CategorySelector
                  task={task}
                  setTask={setTask}
                ></CategorySelector>
              </div>
              <div className="form_span_6">
                <StatusSelector task={task} setTask={setTask} />
              </div>
              <div className="mt-4 form_span_6">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
                  >
                    {submitting ? `updating request` : 'update'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div> You need to login first</div>
        )}
      </div>
    </Suspense>
  );
};

export default updateProposal;
