import { useRouter } from 'next/navigation';
import { labels } from '@/constants/index';

const BackButton = ({ language }) => {
  const router = useRouter();

  return (
    <button
      className="btn_secondary px-6 py-2"
      type="button"
      onClick={() => router.back()}
    >
      {language === 'he' ? labels.hebrew.back : labels.english.back}
    </button>
  );
};

export default BackButton;
