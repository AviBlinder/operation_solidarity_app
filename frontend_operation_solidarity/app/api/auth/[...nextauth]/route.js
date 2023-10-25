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
        const res = await fetch(`${baseURL}/${env}/users/{user}`);
        const user = await res.json();
        session.user.id = user.id;
      } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
      }

      //
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // await connectToDB();

        // // check if user already exists
        // const userExists = await User.findOne({ email: profile.email });
        // // if not, create a new document and save user in MongoDB
        // if (!userExists) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name.replace(' ', '').toLowerCase(),
        //     image: profile.picture,
        //   });
        // }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
