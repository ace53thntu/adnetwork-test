// Link refer: https://en.wikipedia.org/wiki/List_of_mobile_phone_brands_by_country

const ListMobilePhoneBrands = [
  'Condor',
  'Walton',
  'Kogan',
  'Gradiente',
  'Multilaser',
  'Positivo',
  '10.Or(Tenor)',
  'Amoi',
  'BBK',
  'Coolpad',
  'Cubot',
  'Gfive',
  'Haier',
  'Hisense',
  'Honor',
  'Huawei',
  'Konka',
  'LeEco',
  'Meitu',
  'Meizu',
  'Ningbo Bird',
  'OnePlus',
  'Oppo',
  'iQOO',
  'Itel Mobile',
  'Realme',
  'Smartisan',
  'TCL Corporation',
  'Technology Happy Life',
  'Tecno Mobile',
  'Umidigi',
  'Vivo',
  'Vsun',
  'Wasam',
  'Xiaomi',
  'ZTE',
  'ZUK Mobile',
  'Jablotron',
  'Verzo',
  'SICO Technology',
  'Jolla',
  'Nokia Corporation',
  'HMD Global',
  'Bittium',
  'Archos',
  'Alcatel Mobile',
  'Groupe Bull',
  'MobiWire',
  'Wiko',
  'Gigaset',
  'Medion',
  'TechniSat',
  'Tiptel',
  'MLS',
  'X-tigi Mobile',
  'Lenovo',
  'Infinix',
  'Celkon',
  'Iball',
  'Intex Technologies',
  'Karbonn Mobiles',
  'Lava International',
  'HCL Technologies',
  'Jio',
  'LYF',
  'Micromax Informatics',
  'Onida Electronics',
  'Spice Digital',
  'Videocon',
  'Xolo',
  'YU Televentures',
  'Nexian',
  'MITO',
  'Polytron',
  'Advan',
  'Axioo',
  'IMO',
  'Zyrex',
  'Evercoss',
  'SPC',
  'Brondi',
  'Q.Bell[1]',
  'New Generation Mobile',
  'Olivetti',
  'Akai',
  'Fujitsu',
  'Casio',
  'Hitachi',
  'JRC',
  'Kyocera',
  'Mitsubishi Electric',
  'NEC',
  'Panasonic',
  'Sansui',
  'Sharp',
  'Sony',
  'Toshiba',
  'Just5',
  'M Dot',
  'Ninetology',
  'Kyoto Electronics',
  'Lanix',
  'Zonda',
  'Fairphone',
  "John's Phone",
  'Philips',
  'Arirang[citation needed]',
  'QMobile',
  'Cherry Mobile',
  'Firefly Mobile (PH)',
  'Starmobile',
  'Cloudfone',
  'MyPhone',
  'Torque',
  'Kruger&Matz [pl]',
  'Manta Multimedia [pl]',
  'myPhone (Poland) [pl]',
  'Allview',
  'Evolio',
  'E-Boda',
  'Myria',
  'Utok',
  'Beeline',
  'Explay',
  'Gresso',
  'Highscreen',
  'Megafon',
  'MTS',
  'RoverPC',
  'teXet',
  'Sitronics',
  'Yotaphone',
  'Cell C',
  'MTN',
  'Mobicel',
  'Telkom',
  'Vodacom',
  'KT Tech',
  'Pantech',
  'Samsung',
  'Doro',
  'Acer',
  'Asus',
  'BenQ',
  'DBTel',
  'Dopod',
  'Foxconn',
  'Gigabyte Technology',
  'HTC',
  'AIS',
  'DTAC',
  'TRUE',
  'Wellcom',
  'I-Mobile',
  'EvertekTunisie',
  'ASELSAN',
  'Vestel',
  'Thuraya',
  'Bullitt Group',
  'Wileyfox',
  'Nothing',
  'Apple',
  'BLU Products',
  'Caterpillar',
  'Firefly',
  'Garmin',
  'Google',
  'HP',
  'InFocus',
  'InfoSonics[4]',
  'Motorola Mobility',
  'Obi Worldphone',
  'Nextbit',
  'Purism, SPC',
  'BPhone',
  'Masstel',
  'GTel',
  'Jeotex (Datawind)',
  'Gionee',
  'AEG',
  'BenQ Mobile',
  'Grundig Mobile',
  'Hagenuk Telecom GmbH',
  'Siemens Mobile',
  'Telefunken',
  'Onda Mobile Communication',
  'Sanyo',
  'GeeksPhone',
  'Vitelcom',
  'Energy Sistem',
  'BQ',
  '8.ta',
  'Vertu',
  'Kazam',
  'Essential Products',
  'Microsoft Mobile',
  'FPT',
  'VinSmart',
  'Avio',
  'Hi-Mobile',
  'Bluefone',
  'Mobiistar',
  'Asanzo',
  'VNPT',
  'Kangaroo Mobile',
  'Maxfone',
  'K-Touch',
  'Viettel',
  'Q-Mobile'
];

export const getListMobilePhoneBrands = () => {
  return ListMobilePhoneBrands.map(item => ({value: item, label: item}));
};
