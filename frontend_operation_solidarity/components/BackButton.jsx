import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="btn_secondary mx-4 my-4 px-6 py-2"
      type="button"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default BackButton;
