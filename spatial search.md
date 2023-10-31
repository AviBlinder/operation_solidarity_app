```js
const haversine = require('haversine');

async function getTasksWithinDistance(userLocation, maxDistance) {
// Fetch all tasks from the database
const tasks = await fetchTasksFromDatabase();

// Filter tasks based on distance
const filteredTasks = tasks.filter(task => {
const taskLocation = {
latitude: task.city.latitude,
longitude: task.city.longitude,
};
const distance = haversine(userLocation, taskLocation);
return distance <= maxDistance;
});

return filteredTasks;
```

//
// Here is how you can use Geohash for filtering tasks by distance range:

// 1. Store Geohash in the Database:
// When you save a task to the database, calculate the Geohash of the city's coordinates and store it alongside the other task details. You can use libraries like ngeohash in Node.js for this.

// 2. Query Based on Geohash Prefix:
// To find tasks within a certain distance range, you can calculate the Geohash of the center of your search area and then query the database for tasks whose Geohash starts with a prefix of that Geohash. The length of the common prefix determines the size of the area you're searching in.

// For example, if the Geohash of your search center is "u4pruydqqvj", you could search for all tasks whose Geohash starts with "u4pru" to find tasks within a certain distance range.

// However, this method has limitations:

// It only finds tasks in the same Geohash grid cell or adjacent cells. Tasks just outside these cells won't be found, even if they are within the desired distance range.
// It doesn't take into account the actual distance, just the grid cells. So some tasks in the result set may be outside the desired distance range.
// 3. Post-Filter Results:
// To address the limitations of the Geohash query, you can do a more accurate distance calculation on the results to filter out any tasks that are outside the desired distance range.

// Benefits of Using Geohash:
// Efficiency: Geohash allows you to quickly narrow down the search to a specific geographic area, reducing the number of distance calculations you have to do and the amount of data you have to send from the database to the application.
// Scalability: This approach can scale well, especially if you're using a database that can efficiently query strings with common prefixes.

// }
