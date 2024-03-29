import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UserProfile = ({
  signOut,
  session,
  toggleDropdown,
  setToggleDropdown,
}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASEURL;
  const router = useRouter();
  return (
    <div className="relative">
      <Image
        src={session?.user.image}
        width={60}
        height={60}
        className=" rounded-full"
        alt="tasks"
        onClick={() => setToggleDropdown((prev) => !prev)}
      />
      {toggleDropdown && (
        <div className="dropdown">
          <div className="text-sm text-gray-400 font-medium">
            {session?.user.email}
          </div>
          <button
            type="button"
            onClick={() => {
              setToggleDropdown(false);
              signOut({ redirect: false, callbackUrl: `${baseURL}` });
              router.push('/');
            }}
            className="mt-5 w-full btn_primary"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
