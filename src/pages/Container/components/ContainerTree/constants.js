export const CONTAINER_TREE_TAGS = [
  {
    id: 'website-tag',
    name: 'Website'
  },
  {
    id: 'ios-tag',
    name: 'iOS'
  },
  {
    id: 'android-tag',
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

const webKey = 'website-tag';
const iosKey = 'ios-tag';
const androidKey = 'android-tag';

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
