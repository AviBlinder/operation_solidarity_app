export const GET = async (request) => {
  const getStringParams = (url, searchParam) => {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const searchParamValue = params.get(searchParam);
    return searchParamValue;
  };

  try {
    const userEmail = getStringParams(request.url, 'userEmail');
    const baseURL = process.env.baseURL;
    const env = process.env.APIGW_ENV;

    if (userEmail) {
      const res = await fetch(`${baseURL}/${env}/tasks?email=${userEmail}`);
      console.log('res 1=', res);

      const tasks = await res.json();
      return new Response(JSON.stringify(tasks), { status: 200 });
    } else {
      const res = await fetch(`${baseURL}/${env}/tasks`);
      console.log('res 2=', res);
      const tasks = await res.json();
      return new Response(JSON.stringify(tasks), { status: 200 });

      // return new Response('No email provided', { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Failed to get tasks', { status: 500 });
  }
};
