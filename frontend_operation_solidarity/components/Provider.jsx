'use client';
// import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import store from '@/store/index';

const Provider = ({ children, session }) => (
  // <ReduxProvider store={store}>
  <SessionProvider session={session}>{children}</SessionProvider>
  // </ReduxProvider>
);

export default Provider;
