'use client';

import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, Fragment } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
    <nav className="flex-between w-full mb-16 pt-3">
      <Logo />
      <p className="sm:hidden md:flex text-2xl text-supporting1-800 tracking-tighter font-bold text-center justify-center px-20 py-4">
        Operation Solidarity
      </p>
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
