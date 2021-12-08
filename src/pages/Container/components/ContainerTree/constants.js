export const CONTAINER_TREE_TAGS = [
  {
    id: 'web',
    name: 'Web'
  },
  {
    id: 'ios',
    name: 'iOS'
  },
  {
    id: 'android',
    name: 'Android'
  },
  {
    id: 'import-offline',
    name: 'Import offline'
  },
  {
    id: 'transfer-files',
    name: 'Transfer'
  }
];

const webKey = 'web';
const iosKey = 'ios';
const androidKey = 'android';

export const SOURCE_FROM_TAG = {
  [webKey]: 'web',
  [iosKey]: 'ios',
  [androidKey]: 'android'
};

export const TAG_FROM_SOURCE = {
  web: webKey,
  ios: iosKey,
  android: androidKey
};
