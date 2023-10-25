import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSelector = ({ post, setPost }) => {
  const api_url = 'https://data.gov.il/api/3/action/datastore_search';
  const cities_resource_id = '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba';
  const streets_resource_id = 'a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3';
  const city_name_key = 'שם_ישוב';
  const street_name_key = 'שם_רחוב';

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_url, {
          params: { resource_id: cities_resource_id, limit: 32000 },
          responseType: 'json',
        });
        setCities(response.data.result.records);
      } catch (error) {
        console.error('Error fetching cities', error);
      }
    };
    if (cities.length === 0) fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;
      try {
        const response = await axios.get(api_url, {
          params: {
            resource_id: streets_resource_id,
            q: selectedCity,
            limit: 32000,
          },
          responseType: 'json',
        });
        setStreets(response.data.result.records);
      } catch (error) {
        console.error('Error fetching streets', error);
      }
    };
    fetchData();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value.trim());
    setPost({ ...post, city: event.target.value.trim() });
  };

  return (
    <div>
      <label htmlFor="city-choice">City:</label>
      <input
        list="cities-data"
        id="city-choice"
        name="city-choice"
        // value={post.city}
        onChange={handleCityChange}
      />
      <datalist id="cities-data">
        {cities.map((city, index) => (
          <option key={index} value={city[city_name_key]} />
        ))}
      </datalist>

      <label htmlFor="street-choice">Street:</label>
      <input
        list="streets-data"
        id="street-choice"
        name="street-choice"
        onChange={(e) => setPost({ ...post, street: e.target.value.trim() })}
      />
      <datalist id="streets-data">
        {streets.map((street, index) => (
          <option key={index} value={street[street_name_key]} />
        ))}
      </datalist>
    </div>
  );
};

export default LocationSelector;
