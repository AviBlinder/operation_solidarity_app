import { categories } from '@/constants/index';

export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    // timeZoneName: 'short',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const translateCategory = (category) => {
  const index = categories.english.findIndex(
    (cat) => cat.name === category.english
  );
  return categories.hebrew[index];
};
