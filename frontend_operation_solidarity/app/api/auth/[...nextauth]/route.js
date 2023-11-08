import NextAuth from 'next-auth';
// [NextAuth Documentation](https://next-auth.js.org/configuration/nextjs)
// import GoogleProvider from 'next-auth/providers/google';
import CognitoProvider from 'next-auth/providers/cognito';

export async function refreshAccessToken(token) {
  console.log('inside refreshAccessToken - token:', token);

  try {
    const url = `${process.env.COGNITO_DOMAIN}/oauth2/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`
          ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();
    console.log('response :', response);

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),

    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
      checks: 'nonce',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // session: {jwt: true},
  // debug: process.env.NODE_ENV === 'development' ? true : false,
  // [nextauth callbacks](https://next-auth.js.org/configuration/callbacks)

  callbacks: {
    async session({ session, token }) {
      const baseURL = process.env.baseURL;
      const env = process.env.APIGW_ENV;
      const email = session.user.email;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      try {
        const res = await fetch(`${baseURL}/${env}/users?email=${email}`);
        if (!res.ok) {
          console.error(
            'Failed to fetch user data',
            res.status,
            res.statusText
          );
          // Handle the error appropriately
          new Response('Failed to fetch user data', { status: 500 });
        }

        const user = await res.json();
        session.user.userId = user.userId;
      } catch (error) {
        return new Response('Failed to fetch user data - general error', {
          status: 500,
        });
      }

      //
      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      // if (account.provider === 'google') {
      //   console.log('User signed in with Google:', profile);
      //   return true;
      // }
      if (account.provider.toLowerCase() === 'cognito') {
        // Handle Cognito sign-in
        try {
          const user = 'avi ';
          if (profile.email) {
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
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${account.access_token}`,
                    // Authorization: `Bearer ${token}`,
                  },

                  body: JSON.stringify({
                    email: profile.email,
                    username: profile?.name,
                    given_name: profile?.given_name,
                    family_name: profile?.family_name,
                    sub: profile?.sub,
                    picture: profile?.picture,
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

            // User is authenticated - end
          } else {
            // Authentication failed
            console.log('Cognito authentication failed');
            return false;
          }
        } catch (error) {
          console.error('Error during Cognito authentication:', error);
          return false;
        }
      } else {
        console.log('Unknown provider:', account.provider);
        return false;
      }
    },
    async jwt({ token, account }) {
      // Initial sign in
      // console.log('token expiration time ', new Date(token.accessTokenExpires));
      // console.log('token =', token);
      // console.log('account =', account);
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_at * 1000;
        token.refreshToken = account.refresh_token;
      }

      // Return previous token if the access token has not expired yet
      // check token.iat ?
      // (new Date(Date.now() + 3600000 < token.iat ) --> refreshAccessToken(token)
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
