export const GET = async (request) => {
  const getStringParams = (url, searchParam) => {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const searchParamValue = params.get(searchParam);
    return searchParamValue;
  };

  try {
    const userEmail = getStringParams(request.url, 'userEmail');

    if (userEmail) {
      const baseURL = process.env.baseURL;
      const env = process.env.APIGW_ENV;
      const res = await fetch(`${baseURL}/${env}/tasks?email=${userEmail}`);
      const tasks = await res.json();
      console.log('fetch by userEmail =', tasks);
      return new Response(JSON.stringify(tasks), { status: 200 });
    } else {
      return new Response('No email provided', { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Failed to get tasks', { status: 500 });
  }
};
