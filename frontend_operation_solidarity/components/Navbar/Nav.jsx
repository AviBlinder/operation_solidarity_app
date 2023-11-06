'use client';

import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { RefDataContext } from '@/components/RefDataContext';
const Nav = () => {
  const { language, setLanguage, labels } = useContext(RefDataContext);

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
    <nav className="flex flex-between w-full mb-2 md:mb-16 pt-3">
      <Logo />
      <h1> {labels[language].welcome} </h1>
      <label htmlFor="language-select"></label>
      <select
        name="languages"
        id="language-select"
        onChange={(event) => setLanguage(event.target.value)}
        defaultValue="he" // set default language as English
      >
        {/* Option for English */}
        <option value="en">English</option>
        {/* Option for Hebrew */}
        <option value="he">עברית</option>
      </select>

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
