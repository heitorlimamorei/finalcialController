import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER } = process.env;

if (!AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_ISSUER) {
  throw new Error('Missing environment variables for Auth0 configuration');
}

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
    }),
  ],
});

export { handler as GET, handler as POST };
