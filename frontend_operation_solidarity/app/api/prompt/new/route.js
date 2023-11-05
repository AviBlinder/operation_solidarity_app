export const POST = async (request) => {
  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;
  try {
    const {
      userId,
      userName,
      description,
      category,
      city,
      street,
      from,
      to,
      status,
      availability,
      entryDate,
    } = await request.json();

    console.log('inside prompt/new', city);

    // const location = await getLocations(city);
    // console.log('after getLocations', location);

    const res = await fetch(`${baseURL}/${env}/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        userName: userName ? userName : null,
        description: description ? description : 'No description',
        category: category ? category : null,
        // longitude: longitude ? longitude : null,
        // latitude: latitude ? latitude : null,
        city: city ? city : null,
        street: street ? street : null,
        from: from ? from : null,
        to: to ? to : null,
        status: status ? status : 'new',
        availability: availability ? availability : null,
        entryDate: entryDate ? entryDate : new Date(),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const tasks = await res.json();
    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
