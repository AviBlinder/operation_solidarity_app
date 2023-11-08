import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const BackButton = ({}) => {
  const router = useRouter();
  const { language, labels } = useContext(RefDataContext);

  return (
    <button
      className="btn_secondary px-6 py-2"
      type="button"
      onClick={() => router.back()}
    >
      {labels[language].back}
    </button>
  );
};

export default BackButton;
