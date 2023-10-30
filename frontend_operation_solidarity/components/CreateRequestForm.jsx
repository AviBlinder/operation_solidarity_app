'use client';
import { useState, useEffect } from 'react';

import { cities_short_list } from '@/constants/index';
import { useSession } from 'next-auth/react';

import DescriptionField from '@/components/forms/DescriptionField';
import LocationTypeSelector from '@/components/forms/LocationTypeSelector';
import CitySelector from '@/components/forms/CitySelector';
import FromToSelector from '@/components/forms/FromToSelector';
import AvailabilitySelector from '@/components/forms/AvailabilitySelector';
import CategorySelector from '@/components/forms/CategorySelector';
import ContactDetails from '@/components/forms/ContactDetails';
import CommentsField from '@/components/forms/CommentsField';

function CreateRequestForm({
  type,
  task,
  setTask,
  availability,
  setAvailability,
  geoLocations,
  setGeolocations,
  selectedCategories,
  setSelectedCategories,
  contact,
  setContact,
  submitting,
  handleSubmit,
}) {
  const { data: session } = useSession();

  const [categories, setCategories] = useState([]);
  const [categoriesHebrew, setCategoriesHebrew] = useState([]);

  const [locationType, setLocationType] = useState('cityAddress');
  // load Categories
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

  return (
    <div>
      {session?.user.email ? (
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

          <ContactDetails setContact={setContact} contact={contact} />

          <CommentsField task={task} setTask={setTask}></CommentsField>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800"
            >
              {submitting ? `submitting request` : 'submit'}
            </button>
          </div>
        </form>
      ) : (
        <div> You need to login first</div>
      )}
    </div>
  );
}

export default CreateRequestForm;
