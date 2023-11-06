const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const entity = process.env.TASKS_TABLE || 'TasksTable';

exports.postTaskHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const taskId = uuidv4();

    data.entryDate = new Date().toISOString();
    data.status ? (data.status = data.status.toLowerCase()) : 'new';
    data.emailtaskType = data.email + '-' + data.taskType;
    data.statustaskType = data.status + '-' + data.taskType;

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
      body: JSON.stringify({ error: `Internal Server Error :   ${error}` }),
    };
  }
};
