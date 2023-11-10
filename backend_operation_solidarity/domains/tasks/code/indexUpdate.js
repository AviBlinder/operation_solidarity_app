const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ngeohash = require('ngeohash');
const entity = process.env.TASKS_TABLE || 'TasksTable';

exports.updateTaskHandler = async (event) => {
  try {
    const taskId = event.pathParameters.TaskId;
    const entryDate = event.pathParameters.EntryDate;

    if (!taskId || !entryDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'taskId and entryDate must be provided',
        }),
      };
    }

    const data = JSON.parse(event.body);
    console.log('data for update : ', data);

    // Calculate geohashes if lat and lng are provided
    if (data.city && data.city.lat && data.city.lng) {
      data.city.geohash = ngeohash.encode(data.city.lat, data.city.lng);
    } else {
      if (data.from && data.from.lat && data.from.lng) {
        data.from.geohash = ngeohash.encode(data.from.lat, data.from.lng);
      }
      if (data.to && data.to.lat && data.to.lng) {
        data.to.geohash = ngeohash.encode(data.to.lat, data.to.lng);
      }
    }

    let updateExpression = 'SET';
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    const fieldsToUpdate = [
      'description',
      // 'comments',
      'category',
      'city',
      'from',
      'to',
      'availability',
      'updateDate',
      'contact',
      'status',
      'statustaskType',
    ];

    fieldsToUpdate.forEach((field) => {
      if (data[field] !== undefined) {
        updateExpression += ` #${field} = :${field},`;
        expressionAttributeValues[`:${field}`] = data[field];
        expressionAttributeNames[`#${field}`] = field;
      }
    });

    // Prepare update for comments
    //
    if (data.comments && typeof data.comments === 'string') {
      const commentEntry = {
        date: new Date().toISOString(),
        email: data.email,
        commentText: data.comments,
      };

      updateExpression +=
        ' comments = list_append(if_not_exists(comments, :empty_list), :comment),';
      expressionAttributeValues[':comment'] = [commentEntry];
      expressionAttributeValues[':empty_list'] = [];
    }

    // Remove trailing comma if present
    updateExpression = updateExpression.replace(/,$/, '');

    if (Object.keys(expressionAttributeValues).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'No valid fields provided for update',
        }),
      };
    }

    const params = {
      TableName: entity,
      Key: { taskId, entryDate },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    if (Object.keys(expressionAttributeNames).length > 0) {
      params.ExpressionAttributeNames = expressionAttributeNames;
    }

    console.log('params for update : ', params);
    const result = await dynamoDb.update(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Attributes) };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
