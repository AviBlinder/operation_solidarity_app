const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const entity = process.env.TASKS_TABLE || 'TasksTable';

exports.deleteTaskHandler = async (event) => {
  try {
    const params = {
      TableName: entity,
      Key: {
        taskId: event.pathParameters.TaskId,
      },
    };
    await dynamoDb.delete(params).promise();
    return { statusCode: 204 };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

exports.getTaskHandler = async (event) => {
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

  try {
    const params = {
      TableName: entity,
      Key: {
        taskId: taskId,
        entryDate: entryDate,
      },
    };
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return { statusCode: 200, body: JSON.stringify(result.Item) };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'task not found' }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

exports.listTasksHandler = async (event) => {
  console.log('listTasksHandler', entity);
  try {
    const params = {
      TableName: entity,
    };

    // handle queryParam=email
    if (
      event.queryStringParameters &&
      event.queryStringParameters.email != null
    ) {
      params.IndexName = 'email-index';
      params.KeyConditionExpression = 'email = :emailValue';
      params.ExpressionAttributeValues = {
        ':emailValue': event.queryStringParameters.email,
      };
      queryType = 'email';
    } else {
      queryType = 'all';
    }
    // Handling the records retrieval
    let result = null;

    // result = await dynamoDb.scan(params).promise();
    // return { statusCode: 200, body: JSON.stringify(result.Items) };
    if (queryType == 'email') {
      result = await dynamoDb.query(params).promise();
      // check 'query' result
      if (result.Items) {
        return { statusCode: 200, body: JSON.stringify(result.Items) };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'tasks by email not found' }),
        };
      }
    } else if (queryType == 'all') {
      result = await dynamoDb.scan(params).promise();
      return { statusCode: 200, body: JSON.stringify(result.Items) };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

exports.postTaskHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const taskId = uuidv4();

    const params = {
      TableName: entity,
      Item: {
        taskId,
        ...data,
      },
    };
    await dynamoDb.put(params).promise();
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
    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};
    const fieldsToUpdate = [
      'description',
      'comments',
      'category',
      'city',
      'from',
      'to',
      'availability',
      'updateDate',
      'contact',
      'status',
    ];

    fieldsToUpdate.forEach((field) => {
      if (data[field] !== undefined) {
        updateExpression.push(`#${field} = :${field}`);
        expressionAttributeValues[`:${field}`] = data[field];
        expressionAttributeNames[`#${field}`] = field;
      }
    });
    if (updateExpression.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'No valid fields provided for update',
        }),
      };
    }

    const params = {
      TableName: entity,
      Key: {
        taskId: taskId,
        entryDate: entryDate,
      },
      UpdateExpression: 'set ' + updateExpression.join(', '),
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };
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
