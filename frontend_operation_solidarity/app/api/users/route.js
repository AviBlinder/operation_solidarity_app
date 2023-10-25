export const GET = async (request, { params }) => {
  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;
  try {
    const res = await fetch(`${baseURL}/${env}/tasks`);
    const tasks = await res.json();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log('error: ', error);
    return new Response('Failed to fetch tasks created by user', {
      status: 500,
    });
  }
};
