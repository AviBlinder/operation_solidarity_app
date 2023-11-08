import { cities_short_list } from '@/constants';

export const formatDate = (dateString) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    // timeZoneName: 'short',
  };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

export const translateCategory = (categories, value, language) => {
  const index = categories.en.findIndex((cat) => cat === value);
  return categories[language][index];
};
export const translateStatus = (statuses, value, language) => {
  const index = statuses.en.findIndex((val) => val === value);
  return statuses[language][index];
};
export const translateAvailability = (weekDays, value, language) => {
  const index = weekDays.en.findIndex((val) => val === value);
  return weekDays[language][index];
};

export const translateCity = (value, language) => {
  if (language === 'en') return value;

  const index = cities_short_list.findIndex((val) => val.city === value);
  return cities_short_list[index].cityHebrew;
};
