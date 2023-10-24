const chai = require('chai');
const expect = chai.expect;
const { postUserHandler, listUsersHandler } = require('../code/index');

describe('post new user', () => {
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
  });
});

describe('list users', () => {
  it('should create a new user', async () => {
    const response = await listUsersHandler();
    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody[0]).to.have.property('userId');
  });
});
