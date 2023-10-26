import NextAuth from 'next-auth';
// [NextAuth Documentation](https://next-auth.js.org/configuration/nextjs)
import GoogleProvider from 'next-auth/providers/google';

// import User from '@models/user';
// import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    // 1. console.cloud.google.com --> create new project ==> API & Services ==>
    //  oauth consent
    // 2. Click "CREATE"
    // 3. Add Name + Authorized domains
    // 4. edit %SystemRoot%\System32\drivers\etc\ so it redirects from dummy Authorized domain
    // test.cc --> localhost
    // refer to https://stackoverflow.com/questions/76350539/google-oauth-consent-screen-scheme-error-invalid-domain-must-not-specify-the-s
    // 5. Credentials -> Create Credentials -> OAUTH Client ID -> Application Type = Web App.
    // Authorized JavaScript Origins = http://localhost:3000
    // Authorized Redirect URIs = http://localhost:3000/api/auth/callback/google
    // Grab and update .env with GOOGLE_ID and GOOGLE_CLIENT_SECRET
    // 6. Configure next.config.js so CORS is allowed for user's image:
    // images: {
    //   domains: ['lh3.googleusercontent.com'],
    // },
    // checking is a user is logged in or not:
    // session?.user && ...
    // or
    // session?.user ? ... : ...

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // [nextauth callbacks](https://next-auth.js.org/configuration/callbacks)
  callbacks: {
    async session({ session }) {
      const baseURL = process.env.baseURL;
      const env = process.env.APIGW_ENV;
      const email = session.user.email;
      try {
        const res = await fetch(`${baseURL}/${env}/users?email=${email}`);
        const user = await res.json();
        session.user.userId = user.userId;
      } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
      }

      //
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      // fetch the user details on each sign In
      try {
        // check if user already exists
        const baseURL = process.env.baseURL;
        const env = process.env.APIGW_ENV;
        const email = profile.email;
        const res = await fetch(`${baseURL}/${env}/users?email=${email}`);
        const userExists = await res.json();
        // // if not, create a new User and save it in the DynamoDB users table
        if (userExists.length === 0) {
          const response = await fetch(`${baseURL}/${env}/users`, {
            method: 'POST',
            body: JSON.stringify({
              email: profile.email,
              username: profile.name.replace(' ', '').toLowerCase(),
              createDate: new Date().toISOString(),
              isVolunteer: null,
              isRequester: null,
              isAdmin: false,
              status: 'active',
            }),
          });
          if (response.ok) {
            const user = await response.json();
            console.log('created new user ', user);
            // profile.user.userId = user.userId;
          } else {
            console.log('Error creating user: ', response);
          }
        }
        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
