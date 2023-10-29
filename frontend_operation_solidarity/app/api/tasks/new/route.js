export const POST = async (request) => {
  console.log('POST request: ', request);
  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;
  try {
    const {
      email,
      userId,
      userName,
      description,
      taskType,
      category,
      city,
      address,
      from,
      to,
      status,
      availability,
      entryDate,
    } = await request.json();

    // const location = await getLocations(city);
    // console.log('after getLocations', location);

    const res = await fetch(`${baseURL}/${env}/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        userId,
        taskType: taskType,
        userName: userName ? userName : null,
        description: description ? description : 'No description',
        category: category ? category : null,
        city: city ? city : null,
        address: address ? address : null,
        from: from ? from : null,
        to: to ? to : null,
        status: status ? status : 'new',
        availability: availability ? availability : null,
        entryDate: entryDate ? entryDate : new Date(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const tasks = await res.json();
    console.log('tasks', tasks);
    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new task', { status: 500 });
  }
};
