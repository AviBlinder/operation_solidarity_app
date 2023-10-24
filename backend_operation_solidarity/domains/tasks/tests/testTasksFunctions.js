const chai = require('chai');
const expect = chai.expect;
const { postTaskHandler, listTasksHandler } = require('../code/index');

describe('post new task', () => {
  it('should create a new task', async () => {
    const event = {
      body: JSON.stringify({
        status: 'new',
        description: 'Test new task',
        assignee: 'Test User',
      }),
    };

    const response = await postTaskHandler(event);

    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody).to.have.property('taskId');
  });
});

describe('list tasks', () => {
  it('should create a new task', async () => {
    const response = await listTasksHandler();
    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody[0]).to.have.property('taskId');
  });
});
