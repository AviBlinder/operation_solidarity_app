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
  console.log('listTasksHandler', event);

  const params = {
    TableName: entity,
  };

  let queryType = 'all';

  try {
    let queryParams = 'all';
    if (
      event.queryStringParameters &&
      Object.keys(event.queryStringParameters).length > 0
    ) {
      queryParams = event.queryStringParameters;
    }
    console.log('queryParams', queryParams);
    // defult order is set to desc
    let sortOrder = false;
    sortOrder =
      queryParams.sortType && queryParams.sortType.toLowerCase() === 'asc';
    params.ScanIndexForward = sortOrder;

    if (queryParams) {
      // handle queryParam=email
      if (queryParams.email) {
        params.IndexName = 'email-index';
        params.KeyConditionExpression = 'email = :emailValue';
        params.ExpressionAttributeValues = {
          ':emailValue': queryParams.email,
        };
        queryType = 'email';
      }

      // handle queryParam=emailTaskType
      if (queryParams.emailTaskType) {
        params.IndexName = 'email-taskType-index';
        params.KeyConditionExpression = 'emailtaskType = :emailTaskTypeValue';
        params.ExpressionAttributeValues = {
          ':emailTaskTypeValue': queryParams.emailTaskType,
        };
        queryType = 'emailTaskType';
      }

      // handle queryParam=status
      if (queryParams.status) {
        params.IndexName = 'status-index';
        params.KeyConditionExpression = '#status = :statusValue';
        params.ExpressionAttributeValues = {
          ':statusValue': queryParams.status,
        };
        params.ExpressionAttributeNames = {
          '#status': 'status',
        };
        queryType = 'status';
      }

      // handle queryParam=statusTaskType
      if (queryParams.statusTaskType) {
        params.IndexName = 'statustaskType-index';
        params.KeyConditionExpression = 'statustaskType = :statusTaskTypeValue';
        params.ExpressionAttributeValues = {
          ':statusTaskTypeValue': queryParams.statusTaskType,
        };
        queryType = 'statusTaskType';
      }
    }

    //
    // Handling the records retrieval
    let result = null;

    if (
      queryType == 'email' ||
      queryType == 'status' ||
      queryType == 'emailTaskType' ||
      queryType == 'statusTaskType'
    ) {
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
      // Project all attributes but 'comments'
      params.ProjectionExpression =
        'taskId, email, userId, taskType, userName, emailtaskType, entryDate, description, category, city, address, #from, #to, availability, updateDate, contact, statustaskType, #status';
      params.ExpressionAttributeNames = {
        '#from': 'from',
        '#to': 'to',
        '#status': 'status',
      };

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
      'statustaskType',
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
