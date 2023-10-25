import locations from './israel_cities_names_and__geometric_data.json' assert { type: 'json' };
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
