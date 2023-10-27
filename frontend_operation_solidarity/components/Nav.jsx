'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  // useSession handles the 'session' object created by nuxt-auth/react
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BASEURL;
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-row gap-2  ">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width="80"
          height="80"
          className="object-contain"
        />
      </Link>
      <p
        className="sm:hidden lg:flex text-4xl logo_text ml-6 text-center justify-center
         px-20 py-4
        "
      >
        Operation Solidarity
      </p>

      {/* Desktop Navigation */}
      <div className=" hidden lg:flex ">
        {/* <p>Desktop</p> */}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-request" className="btn_primary">
              Create Request
            </Link>
            <Link href="/create-proposal" className="btn_primary">
              Create Proposal
            </Link>
            <Link href="/profile" className="btn_secondary">
              Get tasks
            </Link>

            <div className="relative">
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="profile"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
              </Link>
              <div className="">
                {toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/create-request"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create request
                    </Link>
                    <Link
                      href="/create-request"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Propose Help
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut({ callbackUrl: `${baseURL}` });
                      }}
                      className="mt-5 w-full btn_primary"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="btn_primary"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden relative">
        {/* <p>Mobile</p> */}
        {session?.user ? (
          <div className="flex mt-4">
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className="rounded-full"
              alt="profile"
              // onClick={() => setToggleDropdown(!toggleDropdown)}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/create-request"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create request
                </Link>
                <Link
                  href="/create-request"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Propose Help
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: `${baseURL}` });
                  }}
                  className="mt-5 w-full btn_primary"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="btn_primary"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
