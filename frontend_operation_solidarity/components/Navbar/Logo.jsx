import Link from 'next/link';
import Image from 'next/image';
const Logo = () => (
  <Link href="/" className="flex flex-row gap-2">
    <Image
      src="/assets/images/logo.svg"
      alt="logo"
      width="80"
      height="80"
      className="object-contain mt-5"
    />
  </Link>
);

export default Logo;
