'use client';

import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [language, setLanguage] = useState('he');

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex flex-between w-full mb-2 md:mb-16 pt-3">
      <Logo />
      <Link
        href="/"
        className="text-lg md:block sm:text-xl lg:text-2xl text-supporting1-800
         tracking-tighter font-bold text-center justify-center  py-4"
      >
        Operation Solidarity
      </Link>
      <DesktopNav
        language={language}
        session={session}
        providers={providers}
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
        signIn={signIn}
        signOut={signOut}
      />
      <MobileNav
        language={language}
        session={session}
        providers={providers}
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
        signIn={signIn}
        signOut={signOut}
      />
    </nav>
  );
};

export default Nav;
