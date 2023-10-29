export const GET = async (request, { params }) => {
  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;
  const { id } = params;
  const getStringParams = (url, searchParam) => {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const searchParamValue = params.get(searchParam);
    return searchParamValue;
  };

  const entryDate = getStringParams(request.url, 'entryDate');

  try {
    console.log('inside route tasks/[id]:', id, entryDate);
    console.log('baseURL :', baseURL);
    console.log('env :', env);
    const res = await fetch(`${baseURL}/${env}/tasks/${id}/${entryDate}`);
    const task = await res.json();
    console.log('task ', task);
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log('fetch task error ', error);
    return new Response('Failed to fetch tasks created by user', {
      status: 500,
    });
  }
};
