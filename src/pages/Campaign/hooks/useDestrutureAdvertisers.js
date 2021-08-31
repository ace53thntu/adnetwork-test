import {useMemo} from 'react';

export const useDestrutureAdvertisers = ({advertisers = []}) => {
  // Return advertiser destructure
  return useMemo(() => {
    return advertisers.map(advItem => {
      const {uuid, name} = advItem;
      return {uuid, name, value: uuid, label: name};
    });
  }, [advertisers]);
};
