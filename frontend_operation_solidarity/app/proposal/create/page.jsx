'use client';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Loading from './loading';
import BackButton from '@/components/BackButton';
import { cities_short_list, labels } from '@/constants/index';

import DescriptionField from '@/components/forms/DescriptionField';
import LocationTypeSelector from '@/components/forms/LocationTypeSelector';
import CitySelector from '@/components/forms/CitySelector';
import FromToSelector from '@/components/forms/FromToSelector';
import AvailabilitySelector from '@/components/forms/AvailabilitySelector';
import CategorySelector from '@/components/forms/CategorySelector';
import ContactDetails from '@/components/forms/ContactDetails';
import CommentsField from '@/components/forms/CommentsField';

const CreateProposal = () => {
  const { data: session } = useSession();
  const [language, setLanguage] = useState('he');

  const [availability, setAvailability] = useState([]);
  const [contact, setContact] = useState({ phone: '' });

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
    comments: '',
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
        headers: {
          'Content-Type': 'application/json',
          accessToken: session?.accessToken,
        },
        body: JSON.stringify({
          email: session?.user.email,
          userId: session?.user.userId,
          userName: session?.user.name,
          description: task.description,
          comments: task.comments ? task.comments : null,
          contact: contact?.phone ? contact : null,
          taskType: 'proposal',
          category: task.category,
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
        setContact({ phone: '' });
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
          comments: '',
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

  const [categories, setCategories] = useState([]);
  const [categoriesHebrew, setCategoriesHebrew] = useState([]);

  const [locationType, setLocationType] = useState('cityAddress');

  return (
    <div className="div_main">
      <div className="div_second">
        <div className="div_grid_main">
          <div className="form_span_6_1 ml-10 md:ml-0">
            <div className="flex flex-col md:flex-row mt-6">
              <BackButton className="ml-2 mb-2 md:mb-0 max-w-md "> </BackButton>
              <p className="text-md md:text-lg">
                <span className="blue_gradient text-2xl ml-8 text-center font-bold ">
                  {language === 'he'
                    ? labels.hebrew.createProposal
                    : labels.english.createProposal}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <div>
            {session?.user.email ? (
              <form className="bg-gray-100/50" onSubmit={createRequest}>
                <div className="grid grid-cols-6 sm:grid-cols-6">
                  <div className="mt-4 form_span_6">
                    <DescriptionField
                      type="proposal"
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
                  <div className="form_fields_division" />
                  <div className="col-span-4 col-start-2 sm:col-span-2 sm:col-start-2">
                    <ContactDetails setContact={setContact} contact={contact} />
                  </div>
                  <div className="form_span_3">
                    <CommentsField
                      task={task}
                      setTask={setTask}
                    ></CommentsField>
                  </div>
                  <div className="py-3 mx-2 col-span-6 col-start-1  md:col-span-6 md:col-start-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn_submit"
                    >
                      {submitting ? `submitting request` : 'submit'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div> You need to login first</div>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CreateProposal;
