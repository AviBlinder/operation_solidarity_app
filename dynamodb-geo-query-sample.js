const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');

// Set up AWS
AWS.config.update({
  region: 'us-west-2',
});

// Use a local DynamoDB instance
const ddb = new AWS.DynamoDB();

// Configure the library to know about your table and how it stores location data
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'YourGeoTable');
config.hashKeyLength = 5; // Geohash length

// Instantiate the manager
const myGeoTableManager = new ddbGeo.GeoDataManager(config);

// Querying radius
const userGeoPoint = {
  latitude: userLatitude,
  longitude: userLongitude,
};

// Radius in meters
const radiusInMeters = 10000;

myGeoTableManager
  .queryRadius({
    RadiusInMeter: radiusInMeters,
    CenterPoint: userGeoPoint,
  })
  .then((results) => {
    // Process the results
    console.log(results);
  })
  .catch((error) => {
    // Handle possible errors
    console.error(error);
  });

// Check if the geolocation data is present and encode it
if (data.city && data.city.lat && data.city.lng) {
  data.geohash = ngeohash.encode(data.city.lat, data.city.lng);
}

const cityGeoHash = data.city
  ? ngeohash.encode(data.city.lat, data.city.lng)
  : null;

//On server-side
// Include geohash if available in the body
const requestBody = {
  email: session?.user.email,
  userId: session?.user.userId,
  userName: session?.user.name,
  // ... other fields ...
  status: 'new',
  availability: availability,
  entryDate: new Date(),
};

if (geoLocations.cityLat && geoLocations.cityLng) {
  requestBody.city = {
    city: task.city,
    lat: geoLocations.cityLat,
    lng: geoLocations.cityLng,
    geohash: encodeGeohash(geoLocations.cityLat, geoLocations.cityLng), // Add this line to encode geohash
  };
}

// This function would be responsible for encoding lat/lng into a geohash
function encodeGeohash(lat, lng) {
  const ngeohash = require('ngeohash');
  return ngeohash.encode(lat, lng);
}
