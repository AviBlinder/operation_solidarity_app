export const GET = async (request) => {
  const getStringParams = (url, searchParam) => {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const searchParamValue = params.get(searchParam);
    return searchParamValue;
  };

  const sortType = 'desc';
  try {
    // const userEmail = getStringParams(request.url, 'userEmail');
    const statusTaskType = getStringParams(request.url, 'statusTaskType');
    const emailTypeRequest = getStringParams(request.url, 'emailTypeRequest');
    const baseURL = process.env.baseURL;
    const env = process.env.APIGW_ENV;

    if (emailTypeRequest) {
      const res = await fetch(
        `${baseURL}/${env}/tasks?emailTaskType=${emailTypeRequest}&sortType=${sortType}`
      );
      const tasks = await res.json();
      return new Response(JSON.stringify(tasks), { status: 200 });
    } else if (statusTaskType) {
      const res = await fetch(
        `${baseURL}/${env}/tasks?statusTaskType=${statusTaskType}&sortType=${sortType}`
        // {
        //   next: { revalidate: 3600 },
        // }
      );
      const tasks = await res.json();
      return new Response(JSON.stringify(tasks), { status: 200 });
    } else {
      const res = await fetch(`${baseURL}/${env}/tasks`);
      const tasks = await res.json();
      return new Response(JSON.stringify(tasks), { status: 200 });

      // return new Response('No email provided', { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Failed to get tasks', { status: 500 });
  }
};
