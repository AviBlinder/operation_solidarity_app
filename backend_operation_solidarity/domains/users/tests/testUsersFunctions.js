const chai = require('chai');
const expect = chai.expect;
const {
  postUserHandler,
  listUsersHandler,
  getUserHandler,
} = require('../code/index');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

describe('post new user', () => {
  // Delete the user from DynamoDB

  it('should create a new user', async () => {
    const event = {
      body: JSON.stringify({
        status: 'new',
        description: 'Test new user',
        assignee: 'Test User',
      }),
    };

    const response = await postUserHandler(event);

    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody).to.have.property('userId');

    // Delete created record
    const params = {
      TableName: process.env.USERS_TABLE || 'Users',
      Key: {
        userId: responseBody.userId,
      },
    };
    await dynamoDb.delete(params).promise();
  });
});

describe('list users', () => {
  it('should list all users', async () => {
    const response = await listUsersHandler();
    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody[0]).to.have.property('userId');
  });
});

describe('Get User', () => {
  // Mock data for testing
  const testData = {
    userId: 'validUserId',
    email: 'testUser@test.com',
    otherField: 'someValue',
  };

  // Create a new user in DynamoDB
  before(async () => {
    const params = {
      TableName: process.env.USERS_TABLE || 'Users',
      Item: testData,
    };
    await dynamoDb.put(params).promise();
  });

  // Delete the user from DynamoDB
  after(async () => {
    const params = {
      TableName: process.env.USERS_TABLE || 'Users',
      Key: {
        userId: testData.userId,
      },
    };
    await dynamoDb.delete(params).promise();
  });

  // Scenario 1: Get user by userId
  it('should return user details when provided a valid userId', async () => {
    const event = {
      pathParameters: {
        userId: 'validUserId',
      },
    };
    console.log('event =', event);
    const response = await getUserHandler(event);
    console.log('response =', JSON.parse(response.body));
    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody).to.have.property('userId');
    expect(responseBody.userId).to.equal('validUserId');
  });

  // Scenario 2: Get user by email
  it('should return user details when provided a valid email', async () => {
    const event = {
      queryStringParameters: {
        email: 'testUser@test.com',
      },
    };

    const response = await getUserHandler(event);
    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    console.log('responseBody =', responseBody);
    expect(responseBody[0]).to.have.property('email');
    expect(responseBody[0].email).to.equal('testUser@test.com');
  });

  // Scenario 3: User not found
  it('should return 404 when user is not found', async () => {
    const event = {
      pathParameters: {
        userId: 'nonexistentUserId',
      },
    };

    const response = await getUserHandler(event);
    expect(response.statusCode).to.equal(404);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.error).to.equal('user not found');
  });

  // Scenario 4: Missing userId and email
  it('should return 400 when both userId and email are missing', async () => {
    const event = {};

    const response = await getUserHandler(event);
    expect(response.statusCode).to.equal(400);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.error).to.equal('userId or email parameter required');
  });
});
