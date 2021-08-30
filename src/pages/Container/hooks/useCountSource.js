import {useMemo} from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useCountSource = (pages = []) => {
  return useMemo(() => {
    if (validArray({list: pages})) {
      let countWeb = 0,
        countIos = 0,
        countAndroid = 0;
      pages.forEach(element => {
        const {source} = element;

        if (source === 'web') countWeb = countWeb + 1;
        if (source === 'ios') countIos++;
        if (source === 'android') countAndroid++;
      });
      return {web: countWeb, ios: countIos, android: countAndroid};
    }
    return {web: 0, ios: 0, android: 0};
  }, [pages]);
};
