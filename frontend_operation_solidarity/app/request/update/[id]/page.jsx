'use client';

import { useEffect, useState } from 'react';
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

const updateRequest = ({ params }) => {
  const type = 'request';
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

  const [categories, setCategories] = useState([]);
  const [categoriesHebrew, setCategoriesHebrew] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [locationType, setLocationType] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/reference-data/categories`, {
        next: { revalidate: 3600 },
      });
      const allCategories = await response.json();
      const categoriesNames = allCategories.map((cat) => cat.itemName.S);
      const categoriesHebrewNames = allCategories.map(
        (cat) => cat.itemNameHebrew.S
      );

      setCategories(categoriesNames);
      setCategoriesHebrew(categoriesHebrewNames);
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
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
        city: data.city?.city ? data.city.city : '',
        from: data.from?.cityFrom ? data.from.cityFrom : '',
        to: data.to?.cityTo ? data.to.cityTo : '',
      });
      setSelectedCategories([...selectedCategories, ...data.category]);
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
          body: JSON.stringify({
            //
            description: task.description,
            category: selectedCategories,
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
            // status: 'new',
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

  return (
    <div>
      {session?.user.email && session?.user.email === task.email ? (
        <form className="p-8" onSubmit={handleSubmit}>
          <DescriptionField
            type={type}
            task={task}
            setTask={setTask}
          ></DescriptionField>

          <LocationTypeSelector
            locationType={locationType}
            setLocationType={setLocationType}
          ></LocationTypeSelector>
          {locationType === 'cityAddress' ? (
            <CitySelector
              task={task}
              setTask={setTask}
              geoLocations={geoLocations}
              setGeolocations={setGeolocations}
              cities_short_list={cities_short_list}
            ></CitySelector>
          ) : (
            <FromToSelector
              cities_short_list={cities_short_list}
              task={task}
              setTask={setTask}
              geoLocations={geoLocations}
              setGeolocations={setGeolocations}
            ></FromToSelector>
          )}

          <AvailabilitySelector
            task={task}
            setTask={setTask}
            availability={availability}
            setAvailability={setAvailability}
          ></AvailabilitySelector>

          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categoriesHebrew={categoriesHebrew}
          ></CategorySelector>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
            >
              {submitting ? `updating request` : 'update'}
            </button>
          </div>
        </form>
      ) : (
        <div> You need to login first</div>
      )}
    </div>
  );
};

export default updateRequest;
