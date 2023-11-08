import locations from './israel_cities_names_and__geometric_data.json' assert { type: 'json' };
import cities_short_list from './cities_short_listl.json' assert { type: 'json' };

export { cities_short_list };

export const getLocations = (name) => {
  const location = locations.find(
    (loc) =>
      loc.name === name || loc.english_name.toLowerCase() === name.toLowerCase()
  );
  if (location) {
    console.log('inside getLocations :', longitude, ' ', latitude);
    return { longitude: location.long, latitude: location.latt };
  } else {
    console.log('location not found');
    return false;
  }
};
