import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="btn_secondary px-6 py-2"
      type="button"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default BackButton;
