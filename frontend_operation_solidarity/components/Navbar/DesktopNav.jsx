import SignInButton from './SignInButton';
import UserProfile from './UserProfile';
import Link from 'next/link';

const DesktopNav = ({
  signIn,
  signOut,
  session,
  providers,
  toggleDropdown,
  setToggleDropdown,
}) => (
  <div className="hidden lg:flex">
    {session?.user ? (
      <div className="flex gap-3 md:gap-5">
        <Link href="/request/create" className="btn_primary">
          Create Request
        </Link>
        <Link href="/proposal/create" className="btn_primary">
          Create Proposal
        </Link>
        <Link href="/tasks" className="btn_secondary">
          My Activity
        </Link>

        <UserProfile
          session={session}
          toggleDropdown={toggleDropdown}
          setToggleDropdown={setToggleDropdown}
          signIn={signIn}
          signOut={signOut}
        />
      </div>
    ) : (
      providers &&
      Object.values(providers).map((provider) => (
        <SignInButton key={providers} signIn={signIn} provider={provider} />
      ))
    )}
  </div>
);

export default DesktopNav;
