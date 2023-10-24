const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const entity = process.env.USERS_TABLE || 'Users';

exports.deleteUserHandler = async (event) => {
  try {
    const params = {
      TableName: entity,
      Key: {
        userId: event.pathParameters.UserId,
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

exports.getUserHandler = async (event) => {
  try {
    const params = {
      TableName: entity,
      Key: {
        userId: event.pathParameters.UserId,
      },
    };
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return { statusCode: 200, body: JSON.stringify(result.Item) };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'user not found' }),
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

exports.listUsersHandler = async () => {
  console.log('listUsersHandler', entity);

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

exports.postUserHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const userId = uuidv4();
    const params = {
      TableName: entity,
      Item: {
        userId,
        ...data,
      },
    };
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ userId, ...data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

exports.updateUserHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const params = {
      TableName: entity,
      Key: {
        userId: event.pathParameters.UserId,
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
