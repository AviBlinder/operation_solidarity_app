export const PUT = async (request) => {
  const accessToken = request.headers.get('accessToken');

  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;

  try {
    const { taskId, entryDate, comments, email } = await request.json();
    const res = await fetch(`${baseURL}/${env}/tasks/${taskId}/${entryDate}`, {
      method: 'PUT',
      body: JSON.stringify({
        taskId: taskId,
        entryDate: entryDate,
        comments: comments,
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      // Handle non-2xx HTTP responses
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const tasks = await res.json();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`Failed to update task: ${error.message}`, {
      status: error.status || 500,
    });
  }
};
