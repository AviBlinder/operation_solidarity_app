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

function CreateProposalForm({
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
  //

  return (
    <div>
      {session?.user.email ? (
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
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                categoriesHebrew={categoriesHebrew}
              ></CategorySelector>
            </div>
            <div className="form_fields_division" />

            <div className="col-span-4 col-start-2 sm:col-span-1 sm:col-start-2">
              <ContactDetails setContact={setContact} contact={contact} />
            </div>
            <div className="form_span_3">
              <CommentsField task={task} setTask={setTask}></CommentsField>
            </div>
            <div className="mt-4 form_span_6">
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn_secondary p-2"
                >
                  {submitting ? `submitting request` : 'submit'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div> You need to login first</div>
      )}
    </div>
  );
}

export default CreateProposalForm;
