import '@/styles/globals.css';

import Nav from '@/app/components/Nav';
import Provider from '@/app/components/Provider';

export const metadata = {
  title: 'Operation Solidarity',
  description: 'Share and Match Tasks',
  icons: {
    icon: '/favicon.svg',
  },
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
