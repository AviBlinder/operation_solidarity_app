'use client';
import LocationTypeSelector from './LocationTypeSelector';
import CitySelector from './CitySelector';
import FromToSelector from './FromToSelector';
import AvailabilitySelector from './AvailabilitySelector';
import CategorySelector from './CategorySelector';
import CommentsField from './CommentsField';
import StatusSelector from './StatusSelector';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cities_short_list } from '@/constants/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { weekDays } from '@/constants/index';
const UpdateRequestForm = ({ params }) => {
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

  const findLatLng = (property) => {
    const result = cities_short_list.filter((city) => city.city === property);
    const lat = result[0].lat;
    const lng = result[0].lng;
    return [lat, lng];
  };
  const handleCity = (value) => {
    const [cityLat, cityLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      cityLat: cityLat,
      cityLng: cityLng,
    });
  };

  const handleFrom = (value) => {
    const [fromLat, fromLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      fromLat: fromLat,
      fromLng: fromLng,
    });
  };
  const handleTo = (value) => {
    const [toLat, toLng] = findLatLng(value);
    setGeolocations({
      ...geoLocations,
      toLat: toLat,
      toLng: toLng,
    });
  };

  const handleCategoryChange = (category, isChecked) => {
    console.log('handleCategoryChange :', category);
    console.log('selectedCategories.length =', selectedCategories.length);
    if (isChecked) {
      setSelectedCategories([category]);
    }
    // if (isChecked) {
    //   setSelectedCategories([...selectedCategories, category]);
    // } else {
    //   if (selectedCategories.length === 1) {
    //     setSelectedCategories([]);
    //   } else {
    //     setSelectedCategories(selectedCategories.filter((a) => a != category));
    //   }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (locationType === 'cityAddress') {
      setTask({ ...task, from: '', to: '' });
      setGeolocations({
        ...geoLocations,
        fromLat: '',
        fromLng: '',
        toLat: '',
        toLng: '',
      });
    } else {
      setTask({ ...task, city: '' });
      setGeolocations({ ...geoLocations, cityLat: '', cityLng: '' });
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
    <form>
      <LocationTypeSelector
        locationType={locationType}
        setLocationType={setLocationType}
      />
      {locationType === 'cityAddress' && (
        <CitySelector cities={cities} city={city} setCity={setCity} />
      )}
      {locationType === 'fromTo' && (
        <FromToSelector
          cities={cities}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
        />
      )}
      <AvailabilitySelector
        task={task}
        setTask={setTask}
        availability={availability}
        setAvailability={setAvailability}
      />
      <CategorySelector
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <ContactDetails setContact={setContact} contact={contact} />

      <CommentsField task={task} setTask={setTask}></CommentsField>
    </form>
  );
};

export default UpdateRequestForm;
