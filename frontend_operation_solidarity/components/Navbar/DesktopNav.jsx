import SignInButton from './SignInButton';
import UserProfile from './UserProfile';
import Link from 'next/link';
import { labels } from '@/constants/index';

const DesktopNav = ({
  language,
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
          {language === 'he'
            ? labels.hebrew.createRequest
            : labels.english.createRequest}
        </Link>
        <Link href="/proposal/create" className="btn_primary">
          {language === 'he'
            ? labels.hebrew.createProposal
            : labels.english.createProposal}
        </Link>
        <Link href="/tasks" className="btn_secondary">
          {language === 'he'
            ? labels.hebrew.myActivity
            : labels.english.myActivity}
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
