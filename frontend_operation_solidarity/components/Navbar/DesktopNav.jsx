import SignInButton from './SignInButton';
import UserProfile from './UserProfile';
import Link from 'next/link';
import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

export default function DesktopNav({
  signIn,
  signOut,
  session,
  providers,
  toggleDropdown,
  setToggleDropdown,
}) {
  const { language, labels } = useContext(RefDataContext);

  return (
    <div className="hidden lg:flex">
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/request/create" className="btn_primary">
            {labels[language].createRequest}
          </Link>
          <Link href="/proposal/create" className="btn_primary">
            {labels[language].createProposal}
          </Link>
          <Link href="/tasks" className="btn_secondary">
            {labels[language].myActivity}
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
}
