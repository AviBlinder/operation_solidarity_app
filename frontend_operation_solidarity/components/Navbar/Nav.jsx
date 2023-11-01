'use client';

import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, Fragment } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex flex-between w-full mb-16 pt-3">
      <Logo />
      <Link
        href="/"
        className="text-xl md:block sm:text-xl lg:text-2xl text-supporting1-800 tracking-tighter font-bold text-center justify-center px-20 py-4"
      >
        Operation Solidarity
      </Link>
      <DesktopNav
        session={session}
        providers={providers}
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
        signIn={signIn}
        signOut={signOut}
      />
      <MobileNav
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
