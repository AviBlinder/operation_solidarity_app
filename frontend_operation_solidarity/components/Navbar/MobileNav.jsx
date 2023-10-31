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
}) => (
  <div className="flex lg:hidden relative">
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
          </div>
        )}
      </div>
    ) : (
      providers &&
      Object.values(providers).map((provider) => (
        <SignInButton key={provider.name} signIn={signIn} provider={provider} />
      ))
    )}
  </div>
);

export default MobileNav;
