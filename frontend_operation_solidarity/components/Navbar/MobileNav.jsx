import SignInButton from './SignInButton';
import UserProfile from './UserProfile';
import Image from 'next/image';
import Link from 'next/link';
const MobileNav = ({
  signIn,
  signOut,
  session,
  providers,
  toggleDropdown,
  setToggleDropdown,
}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASEURL;

  return (
    <div className="block lg:hidden relative">
      {session?.user ? (
        <div>
          <UserProfile
            session={session}
            toggleDropdown={toggleDropdown}
            setToggleDropdown={setToggleDropdown}
            signOut={signOut}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <div className="text-sm text-gray-400 font-medium truncate">
                {session?.user.email}
              </div>

              <Link
                href="/request/create"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Create request
              </Link>
              <Link
                href="/proposal/create"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Propose Help
              </Link>
              <Link
                href="/tasks"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                My Activity
              </Link>
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut({ redirect: false, callbackUrl: `${baseURL}` });
                }}
                className="mt-5 w-full btn_primary"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="">
            <SignInButton
              key={provider.name}
              signIn={signIn}
              provider={provider}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MobileNav;
