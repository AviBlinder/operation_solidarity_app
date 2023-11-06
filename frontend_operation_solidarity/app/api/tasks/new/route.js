import { headers } from 'next/headers';

export const POST = async (request) => {
  console.log('POST request: ', request);
  const headersList = headers();
  const accessToken = headersList.get('accessToken');

  console.log('accessToken :', accessToken);

  const baseURL = process.env.baseURL;
  const env = process.env.APIGW_ENV;
  try {
    const {
      email,
      userId,
      userName,
      description,
      comments,
      contact,
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

    const res = await fetch(`${baseURL}/${env}/tasks`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        userId,
        taskType: taskType,
        userName: userName ? userName : null,
        description: description ? description : 'No description',
        comments: comments ? comments : null,
        contact: contact ? contact : null,
        category: category ? category : null,
        city: city ? city : null,
        address: address ? address : null,
        from: from ? from : null,
        to: to ? to : null,
        status: status ? status : 'new',
        availability: availability ? availability : null,
        // entryDate: entryDate ? entryDate : new Date(),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const tasks = await res.json();
    console.log('tasks POST result:', tasks);
    if (tasks.message === 'Unauthorized') {
      return new Response('Token Unothorized, please sign out and in again', {
        status: 500,
      });
    }
    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    return new Response(`Failed to create a new task : ${error}`, {
      status: 500,
    });
  }
};
