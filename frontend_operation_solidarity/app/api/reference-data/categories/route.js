import AWS from 'aws-sdk';

export const GET = async (request) => {
  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'ReferenceData',
    KeyConditionExpression: 'categoryId = :categoryId',
    ExpressionAttributeValues: {
      ':categoryId': 'Categories',
    },
  };

  try {
    const data = await docClient.query(params).promise();
    console.log('data =', data);
    const categories = data.Items;

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to get Reference Data', { status: 500 });
  }
};
