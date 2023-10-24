const chai = require('chai');
const expect = chai.expect;
const {
  postAssignmentHandler,
  listAssignmentsHandler,
} = require('../code/index');

describe('post new assignment', () => {
  it('should create a new assignment', async () => {
    const event = {
      body: JSON.stringify({
        status: 'new',
        description: 'Test new assignment',
        assignee: 'Test Assignment',
      }),
    };

    const response = await postAssignmentHandler(event);

    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody).to.have.property('assignmentId');
  });
});

describe('list assignments', () => {
  it('should create a new assignment', async () => {
    const response = await listAssignmentsHandler();
    expect(response.statusCode).to.equal(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody[0]).to.have.property('assignmentId');
  });
});
