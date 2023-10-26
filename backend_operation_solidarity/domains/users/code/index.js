const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const entity = process.env.USERS_TABLE || 'Users';

exports.deleteUserHandler = async (event) => {
  try {
    const params = {
      TableName: entity,
      Key: {
        userId: event.pathParameters.userId,
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
    let queryType = '';
    let params = {
      TableName: entity,
    };

    if (event.pathParameters && event.pathParameters.userId != null) {
      params.Key = {
        userId: event.pathParameters.userId,
      };
      queryType = 'userId';
    } else if (
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
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'userId or email parameter required',
          pathParameters: event.pathParameters,
          queryStringParameters: event.queryStringParameters,
        }),
      };
    }

    let result = null;
    if (queryType == 'userId') {
      result = await dynamoDb.get(params).promise();
      // check 'get' result
      if (result.Item) {
        return { statusCode: 200, body: JSON.stringify(result.Item) };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'user not found' }),
        };
      }
    } else if (queryType == 'email') {
      result = await dynamoDb.query(params).promise();
      // check 'query' result
      if (result.Items) {
        return { statusCode: 200, body: JSON.stringify(result.Items) };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'user not found' }),
        };
      }
    } else {
      return { statusCode: 500, body: 'invalid queryType ' };
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
        userId: event.pathParameters.userId,
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
