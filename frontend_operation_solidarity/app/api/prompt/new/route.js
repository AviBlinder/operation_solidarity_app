export const POST = async (request) => {
  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;

  try {
    const {
      userId,
      userName,
      description,
      category,
      location,
      from,
      to,
      status,
      availability,
      entryDate,
    } = await request.json();

    const res = await fetch(`${baseURL}/${env}/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        userName: userName ? userName : null,
        description: description ? description : 'No description',
        category: category ? category : null,
        location: location ? location : null,
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

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
