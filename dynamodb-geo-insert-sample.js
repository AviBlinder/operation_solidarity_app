const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const ddbGeo = require('dynamodb-geo');

// Set up AWS config
const ddb = new AWS.DynamoDB();
const config = new ddbGeo.GeoDataManagerConfiguration(
  ddb,
  process.env.TABLE_NAME
);

// Use GeoTableUtil to help create a table
const geoTableUtil = new ddbGeo.GeoTableUtil(config);
await geoTableUtil.createGeoTable({
  // Specify your hashKeyLength
});

// Instantiate the GeoDataManager
const geoDataManager = new ddbGeo.GeoDataManager(config);

// Lambda Handler
exports.postTaskHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const taskId = uuidv4();

    // Prepare the item with a geospatial attribute
    const putPointInput = {
      RangeKeyValue: { S: taskId }, // Use this to ensure uniqueness of the hash/range pairs.
      GeoPoint: {
        latitude: data.city.lat,
        longitude: data.city.lng,
      },
      PutItemInput: {
        Item: {
          // your item attributes
          taskId: { S: taskId },
          // ... copy all the other attributes of 'data' you want to store
        },
      },
    };

    // Perform the put operation on the geospatial data manager
    await geoDataManager.putPoint(putPointInput).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ taskId, ...data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
