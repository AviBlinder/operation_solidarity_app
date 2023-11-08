import { createContext, useState } from 'react';
import { cities_short_list } from '@/constants';
// Create the context with a default value
// context name
export const RefDataContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

// provider's name
export const RefDataProvider = function ({ children }) {
  const [language, setLanguage] = useState('he');

  const refData = {
    languages: ['en', 'he'],
    language,
    setLanguage,
    statuses: {
      en: ['new', 'active', 'inactive', 'done'],
      he: ['חדש', 'פעיל', 'לא פעיל', 'בוצע'],
    },

    weekDays: {
      en: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      he: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    },

    cities: cities_short_list,
    categories: {
      en: [
        'general',
        'babysitting',
        'clothes',
        'food',
        'medical',
        'therapy',
        'moving',
        'shelter',
        'transportation',
      ],
      he: [
        'כללי',
        'בייבי סיטינג',
        'ביגוד',
        'מזון',
        'עזרה רפואית',
        'עזרה נפשית',
        'הובלה',
        'דיור',
        'תחבורה',
      ],
    },
    labels: {
      en: {
        welcome: 'Welcome',
        title: 'Operation Solidarity',
        createRequest: 'Create Request',
        createProposal: 'Create Proposal',
        createTask: 'Create Task',
        requests: 'Requests',
        proposals: 'Proposals',
        resetFilters: 'Reset Filters',
        showResults: 'Show Results',
        myActivity: 'My Activity',
        back: 'Back',
        loginFirst: 'You need to login first',
        description: 'Description',
        locationType: 'Location Type',
        cityAndAddress: 'City',
        fromTo: 'From / To',
        city: 'Pick a City',
        from: 'From',
        to: 'To',
        availability: 'Pick a day',
        category: 'Category',
        phoneNumber: 'Phone Number',
        addComments: 'Remarks',
        statusSelect: 'Select a Status',
        selectAll: 'Select All',
        availabilityChoice: 'Select Days',
        allStatuses: 'All Statuses',
        allCategories: 'All Categories',
        allCities: 'All Cities',
        publishDate: 'Publish Date',
        requiredDays: 'Possible Days',
        chooseCity: 'Choose a city',
        additionalDetails: 'Additional Details',
        updateDetails: 'Update Details',
        requestDetails: 'Request Details',
        proposalDetails: 'Proposal Details',
        fullDetails: 'Full Details',
        statusLabel: 'Status',
        startingPoint: 'Starting Point',
        targetPoint: 'Target Point',
        emailDetails: 'Email Details',
        phoneDetails: 'Phone Details',
        commentsLabel: 'Comments',
      },
      he: {
        welcome: 'ברוך הבא',
        title: 'מבצע סולידריות',
        createRequest: 'בקשה חדשה',
        createProposal: 'הצעה חדשה',
        createTask: 'משימה חדשה',
        requests: 'בקשות',
        proposals: 'הצעות',
        resetFilters: 'איפוס סינון',
        showResults: 'הצגת תוצאות',
        myActivity: 'הבקשות/הצעות שלי',
        back: 'חזרה',
        loginFirst: 'עליך להתחבר תחילה',
        description: 'נושא',
        locationType: 'סוג מיקום',
        cityAndAddress: 'עיר ',
        fromTo: 'ממקום למקום',
        city: 'בחירת עיר',
        from: 'מאיפה',
        to: 'לאיפה',
        availability: 'בחירת יום',
        category: 'קטגוריה',
        phoneNumber: 'מספר טלפון',
        addComments: 'הערות',
        statusSelect: 'בחירת סטטוס',
        selectAll: 'בחר הכל',
        availabilityChoice: 'בחירת יום',
        allStatuses: 'כל הסטטוסים',
        allCategories: 'כל הקטגוריות',
        allCities: 'כל הערים',
        publishDate: 'תאריך פרסום',
        requiredDays: 'ימים אפשריים',
        chooseCity: 'בחירת עיר',
        additionalDetails: 'פרטים נוספים',
        updateDetails: 'עדכון פרטים',
        requestDetails: 'פרטי הבקשה',
        proposalDetails: 'פרטי ההצעה',
        fullDetails: 'פרטים מלא',
        statusLabel: 'סטטוס',
        startingPoint: 'מקום התחלה',
        targetPoint: 'יעד סופי',
        emailDetails: 'מייל ליצרית קשר',
        phoneDetails: 'מספר טלפון ליצרית קשר',
        commentsLabel: 'הערות נוספות',
      },
    },
  };

  return (
    <RefDataContext.Provider value={refData}>
      {children}
    </RefDataContext.Provider>
  );
};
