'use client';
import { SessionProvider } from 'next-auth/react';
import { RefDataProvider } from './RefDataContext';
import { useState, createContext } from 'react';
const Provider = function ({ children, session }) {
  return (
    <SessionProvider session={session}>
      <RefDataProvider>{children}</RefDataProvider>
    </SessionProvider>
  );
};

export default Provider;
