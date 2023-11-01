// import Prompt from '@models/prompt';
// import { connectToDB } from '@utils/database';

export const GET = async (request) => {
  try {
    // await connectToDB();
    console.log('inside GET PROMPT');
    // we use populate() function to the data from the User's collection set as FK in the
    // Prompt's collection
    // const prompts = await Prompt.find({}).populate('creator');
    const prompts = {};

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
