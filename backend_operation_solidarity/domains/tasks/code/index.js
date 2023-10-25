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
  try {
    const params = {
      TableName: entity,
      Key: {
        taskId: event.pathParameters.TaskId,
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

exports.listTasksHandler = async () => {
  console.log('listTasksHandler', entity);
  try {
    const params = {
      TableName: entity,
    };
    const result = await dynamoDb.scan(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Items) };
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
    const data = JSON.parse(event.body);
    const params = {
      TableName: entity,
      Key: {
        taskId: event.pathParameters.TaskId,
      },
      UpdateExpression:
        'set #name = :name, contactInfo = :contactInfo, address = :address',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': data.name,
        ':contactInfo': data.contactInfo,
        ':address': data.address,
      },
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
