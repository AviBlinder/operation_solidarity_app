import { statuses } from '@/constants/index';

export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    // timeZoneName: 'short',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const translateCategory = (categories, value) => {
  const index = categories.en.findIndex((cat) => cat === value);
  return categories.he[index];
};
export const translateStatus = (value) => {
  const index = statuses.english.findIndex((val) => val === value);
  return statuses.hebrew[index];
};
