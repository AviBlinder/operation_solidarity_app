export const GET = async (request, { params }) => {
  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;
  const { id: userId } = params;
  try {
    const res = await fetch(`${baseURL}/${env}/tasks/${userId}`);
    const tasks = await res.json();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch tasks created by user', {
      status: 500,
    });
  }
};
