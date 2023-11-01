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
    const res = await fetch(`${baseURL}/${env}/tasks/${id}/${entryDate}`);
    const task = await res.json();
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log('fetch task error ', error);
    return new Response('Failed to fetch tasks created by user', {
      status: 500,
    });
  }
};

export const PUT = async (request, { params }) => {
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
    const {
      description,
      category,
      city,
      from,
      to,
      availability,
      updateDate,
      status,
    } = await request.json();
    console.log('description :', description);
    const res = await fetch(`${baseURL}/${env}/tasks/${id}/${entryDate}`, {
      method: 'PUT',
      body: JSON.stringify({
        description: description ? description : 'No description',
        category: category ? category : null,
        city: city ? city : null,
        from: from ? from : null,
        to: to ? to : null,
        availability: availability ? availability : null,
        status: status ? status : null,
        updateDate: [updateDate],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const tasks = await res.json();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response('Failed to create a new task', { status: 500 });
  }
};
