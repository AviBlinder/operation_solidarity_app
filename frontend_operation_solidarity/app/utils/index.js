import { categories, statuses } from '@/constants/index';

export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    // timeZoneName: 'short',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const translateCategory = (value) => {
  const index = categories.english.findIndex((cat) => cat === value);
  return categories.hebrew[index];
};
export const translateStatus = (value) => {
  const index = statuses.english.findIndex((val) => val === value);
  return statuses.hebrew[index];
};
