'use client';
import { SessionProvider } from 'next-auth/react';
import { RefDataProvider } from './RefDataContext';

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    <RefDataProvider>{children}</RefDataProvider>
  </SessionProvider>
);

export default Provider;
