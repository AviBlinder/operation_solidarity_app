const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;
const {
  postUserHandler,
  listUsersHandler,
  getUserHandler,
} = require('../code/index');
const AWS = require('aws-sdk-mock');
describe('getUserHandler', () => {
  beforeEach(() => {
    process.env.ENTITY_TABLE_NAME = 'Users'; // Replace with your actual table name
  });

  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient');
  });

  it('should return 200 and user data when user is found', async () => {
    const userData = { userId: '2', email: 'test2@gmail.com' };
    AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, { Item: userData });
    });

    const event = {
      pathParameters: { userId: '2' },
    };

    const response = await getUserHandler(event);
    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response.body)).to.deep.equal(userData);
  });

  it('should return 404 when user is not found', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, {});
    });

    const event = {
      pathParameters: { userId: 'nonexistent' },
    };

    const response = await getUserHandler(event);
    expect(response.statusCode).to.equal(404);
    expect(JSON.parse(response.body).error).to.equal('user not found');
  });

  it('should handle missing path parameters gracefully', async () => {
    const event = {
      pathParameters: {},
    };

    const response = await getUserHandler(event);
    // The expected behavior when path parameters are missing depends on your application
    expect(response.statusCode).to.be.oneOf([400, 500]);
    expect(JSON.parse(response.body).error).to.be.a('string');
  });
});
