import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const GET = async (request) => {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new QueryCommand({
    TableName: 'ReferenceData',
    KeyConditionExpression: 'categoryId = :categoryId',
    ExpressionAttributeValues: {
      ':categoryId': { S: 'Categories' },
    },
  });

  try {
    const { Items } = await client.send(command);
    return new Response(JSON.stringify(Items), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to get Reference Data', { status: 500 });
  }
};
