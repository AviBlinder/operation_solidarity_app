import { createContext, useState } from 'react';

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
    statuses: ['new', 'in-progress', 'active', 'done'],
    cities: [
      {
        city: 'Tel Aviv-Yafo',
        cityHebrew: 'תל אביב-יפו',
        lat: '32.08',
        lng: '34.78',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: 'admin',
        population: '1388400',
        population_proper: '451523',
      },
      {
        city: 'Jerusalem',
        cityHebrew: 'ירושלים',
        lat: '31.7784',
        lng: '35.2066',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Jerusalem',
        capital: 'primary',
        population: '919438',
        population_proper: '919438',
      },
      {
        city: 'Haifa',
        cityHebrew: 'חיפה',
        lat: '32.8192',
        lng: '34.9992',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: 'admin',
        population: '600000',
        population_proper: '281087',
      },
      {
        city: 'Rishon LeẔiyyon',
        cityHebrew: 'ראשון לציון',
        lat: '31.95',
        lng: '34.8',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '249860',
        population_proper: '249860',
      },
      {
        city: 'Petaẖ Tiqwa',
        cityHebrew: 'פתח תקווה',
        lat: '32.0889',
        lng: '34.8864',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '236169',
        population_proper: '236169',
      },
      {
        city: 'Ashdod',
        cityHebrew: 'אשדוד',
        lat: '31.8',
        lng: '34.65',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '220174',
        population_proper: '220174',
      },
      {
        city: 'Netanya',
        cityHebrew: 'נתניה',
        lat: '32.3286',
        lng: '34.8567',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '217244',
        population_proper: '217200',
      },
      {
        city: 'Beersheba',
        cityHebrew: 'באר שבע',
        lat: '31.2589',
        lng: '34.7997',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: 'admin',
        population: '209000',
        population_proper: '209000',
      },
      {
        city: 'Holon',
        cityHebrew: 'חולון',
        lat: '32.0167',
        lng: '34.7667',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '194300',
        population_proper: '194300',
      },
      {
        city: 'Bené Beraq',
        cityHebrew: 'בני ברק',
        lat: '32.0833',
        lng: '34.8333',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '193774',
        population_proper: '193774',
      },
      {
        city: 'Ramat Gan',
        cityHebrew: 'רמת גן',
        lat: '32.07',
        lng: '34.8236',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '159200',
        population_proper: '159200',
      },
      {
        city: 'Ashqelon',
        cityHebrew: 'אשקלון',
        lat: '31.6667',
        lng: '34.5667',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '134454',
        population_proper: '134454',
      },
      {
        city: 'Reẖovot',
        cityHebrew: 'רחובות',
        lat: '31.8981',
        lng: '34.8081',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '132671',
        population_proper: '132671',
      },
      {
        city: 'Bat Yam',
        cityHebrew: 'בת ים',
        lat: '32.0167',
        lng: '34.75',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '128800',
        population_proper: '128800',
      },
      {
        city: 'Bet Shemesh',
        cityHebrew: 'בית שמש',
        lat: '31.7456',
        lng: '34.9867',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Jerusalem',
        capital: '',
        population: '118700',
        population_proper: '118700',
      },
      {
        city: 'Kefar Sava',
        cityHebrew: 'כפר סבא',
        lat: '32.1714',
        lng: '34.9083',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '100800',
        population_proper: '100800',
      },
      {
        city: 'Hadera',
        cityHebrew: 'חדרה',
        lat: '32.45',
        lng: '34.9167',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '95700',
        population_proper: '95700',
      },
      {
        city: 'Herẕliyya',
        cityHebrew: 'הרצליה',
        lat: '32.1653',
        lng: '34.8458',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '93989',
        population_proper: '93989',
      },
      {
        city: 'Modi‘in Makkabbim Re‘ut',
        cityHebrew: 'מודיעין-מכבים רעות',
        lat: '31.9077',
        lng: '35.0076',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '90013',
        population_proper: '90013',
      },
      {
        city: 'Nazareth',
        cityHebrew: 'נצרת',
        lat: '32.7019',
        lng: '35.3033',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: 'admin',
        population: '83400',
        population_proper: '83400',
      },
      {
        city: 'Lod',
        cityHebrew: 'לוד',
        lat: '31.9519',
        lng: '34.8881',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '75700',
        population_proper: '75700',
      },
      {
        city: 'Ramla',
        cityHebrew: 'רמלה',
        lat: '31.9275',
        lng: '34.8625',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: 'admin',
        population: '75500',
        population_proper: '75500',
      },
      {
        city: 'Ra‘ananna',
        cityHebrew: 'רעננה',
        lat: '32.1833',
        lng: '34.8667',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '74000',
        population_proper: '74000',
      },
      {
        city: 'Rahat',
        cityHebrew: 'רהט',
        lat: '31.3925',
        lng: '34.7544',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '64462',
        population_proper: '64462',
      },
      {
        city: 'Qiryat Gat',
        cityHebrew: 'קרית גת',
        lat: '31.6061',
        lng: '34.7717',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '61817',
        population_proper: '61817',
      },
      {
        city: 'Nahariyya',
        cityHebrew: 'נהריה',
        lat: '33.0058',
        lng: '35.0989',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '60000',
        population_proper: '60000',
      },
      {
        city: 'Afula',
        cityHebrew: 'עפולה',
        lat: '32.6064',
        lng: '35.2881',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '60000',
        population_proper: '60000',
      },
      {
        city: 'Givatayim',
        cityHebrew: 'גבעתיים',
        lat: '32.0714',
        lng: '34.81',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '59518',
        population_proper: '59518',
      },
      {
        city: 'Hod HaSharon',
        cityHebrew: 'הוד השרון',
        lat: '32.15',
        lng: '34.8833',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '56659',
        population_proper: '56659',
      },
      {
        city: 'Rosh Ha‘Ayin',
        cityHebrew: 'ראש העין',
        lat: '32.0956',
        lng: '34.9567',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '56300',
        population_proper: '56300',
      },
      {
        city: 'Qiryat Ata',
        cityHebrew: 'קרית אתא',
        lat: '32.8',
        lng: '35.1',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '55464',
        population_proper: '55464',
      },
      {
        city: 'Umm el Faḥm',
        cityHebrew: 'אום אל פחם',
        lat: '32.5194',
        lng: '35.1536',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '55300',
        population_proper: '55300',
      },
      {
        city: 'Eilat',
        cityHebrew: 'אילת',
        lat: '29.5569',
        lng: '34.9517',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '51935',
        population_proper: '51935',
      },
      {
        city: 'Nes Ẕiyyona',
        cityHebrew: 'נס ציונה',
        lat: '31.9333',
        lng: '34.8',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '50200',
        population_proper: '50200',
      },
      {
        city: '‘Akko',
        cityHebrew: 'עכו',
        lat: '32.9278',
        lng: '35.0817',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '48900',
        population_proper: '48900',
      },
      {
        city: 'El‘ad',
        cityHebrew: 'אלעד',
        lat: '32.0522',
        lng: '34.9511',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '46896',
        population_proper: '46896',
      },
      {
        city: 'Ramat HaSharon',
        cityHebrew: 'רמת השרון',
        lat: '32.15',
        lng: '34.8333',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '46700',
        population_proper: '46700',
      },
      {
        city: 'Karmiel',
        cityHebrew: 'כרמיאל',
        lat: '32.9136',
        lng: '35.2961',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '45300',
        population_proper: '45300',
      },
      {
        city: 'Tiberias',
        cityHebrew: 'טבריה',
        lat: '32.7944',
        lng: '35.5333',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '44200',
        population_proper: '44200',
      },
      {
        city: 'Eṭ Ṭaiyiba',
        cityHebrew: 'טייבה',
        lat: '32.2667',
        lng: '35.0103',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '43100',
        population_proper: '43100',
      },
      {
        city: 'Ben Zakkay',
        cityHebrew: 'בן זכאי',
        lat: '31.8558',
        lng: '34.73',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '42314',
        population_proper: '42314',
      },
      {
        city: 'Pardés H̱anna Karkur',
        cityHebrew: 'פרדס חנה-כרכור',
        lat: '32.4711',
        lng: '34.9675',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '42100',
        population_proper: '42100',
      },
      {
        city: 'Qiryat Moẕqin',
        cityHebrew: 'קרית מוצקין',
        lat: '32.8333',
        lng: '35.0833',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '42000',
        population_proper: '42000',
      },
      {
        city: 'Qiryat Ono',
        cityHebrew: 'קרית אונו',
        lat: '32.0636',
        lng: '34.8553',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '41900',
        population_proper: '41900',
      },
      {
        city: 'Shefar‘am',
        cityHebrew: 'שפרעם',
        lat: '32.8056',
        lng: '35.1694',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '41600',
        population_proper: '41600',
      },
      {
        city: 'Qiryat Bialik',
        cityHebrew: 'קרית ביאליק',
        lat: '32.8333',
        lng: '35.0833',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '39900',
        population_proper: '39900',
      },
      {
        city: 'Qiryat Yam',
        cityHebrew: 'קרית ים',
        lat: '32.8333',
        lng: '35.0667',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Haifa',
        capital: '',
        population: '39416',
        population_proper: '39416',
      },
      {
        city: 'Or Yehuda',
        cityHebrew: 'אור יהודה',
        lat: '32.0333',
        lng: '34.85',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Tel Aviv',
        capital: '',
        population: '36706',
        population_proper: '36706',
      },
      {
        city: 'Ma‘alot Tarshīḥā',
        cityHebrew: 'מעלות טרשיחא',
        lat: '33.0167',
        lng: '35.2708',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '36000',
        population_proper: '36000',
      },
      {
        city: 'Ẕefat',
        cityHebrew: 'צפת',
        lat: '32.9658',
        lng: '35.4983',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '35700',
        population_proper: '35700',
      },
      {
        city: 'Dimona',
        cityHebrew: 'דימונה',
        lat: '31.0667',
        lng: '35.0333',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '34135',
        population_proper: '34135',
      },
      {
        city: 'Tamra',
        cityHebrew: 'טמרה',
        lat: '32.8536',
        lng: '35.1978',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '34000',
        population_proper: '34000',
      },
      {
        city: 'Netivot',
        cityHebrew: 'נתיבות',
        lat: '31.4167',
        lng: '34.5833',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Southern',
        capital: '',
        population: '31314',
        population_proper: '31314',
      },
      {
        city: 'Sakhnīn',
        cityHebrew: 'סחנין',
        lat: '32.8667',
        lng: '35.3',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Northern',
        capital: '',
        population: '31100',
        population_proper: '31100',
      },
      {
        city: 'Yehud',
        cityHebrew: 'יהוד',
        lat: '32.0333',
        lng: '34.8833',
        country: 'Israel',
        iso2: 'IL',
        admin_name: 'Central',
        capital: '',
        population: '29146',
        population_proper: '29146',
      },
    ],
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
      },
    },
  };

  return (
    <RefDataContext.Provider value={refData}>
      {children}
    </RefDataContext.Provider>
  );
};