import '@/styles/globals.css';

import Nav from '@/components/Navbar/Nav';
import Provider from '@/components/Provider';

export const metadata = {
  // title: t('title'),
  // description: t('description'),
  icons: {
    icon: '/favicon.svg',
  },
};

const RootLayout = function ({ children }) {
  return (
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
};
export default RootLayout;
// export { i18nInstance };
