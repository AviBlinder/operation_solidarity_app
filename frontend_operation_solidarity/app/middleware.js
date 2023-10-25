import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth);
  }
  // {
  //   callbacks: {
  //     authorized: ({ token }) => token?.role === 'admin',
  //   },
  // }
);

// https://next-auth.js.org/configuration/nextjs#in-app-router
// If you only want to secure certain pages, export a config object with a matcher.
// **matcher** allows you to filter Middleware to run on specific paths.
// export const config = { matcher: ['/profile', '/admin', '/api/auth/callback/credentials'] };

// if you want to require authentication for all pages
// export const config = { matcher: '/' }
// export const config = { matcher: ['/profile'] };

// If a user is not logged in, the default behavior is to redirect them to the sign-in page.
