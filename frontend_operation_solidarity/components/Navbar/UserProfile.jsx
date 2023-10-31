import Image from 'next/image';

const UserProfile = ({
  signOut,
  session,
  toggleDropdown,
  setToggleDropdown,
}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASEURL;

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
          {/* Add your links here */}
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
  );
};

export default UserProfile;
