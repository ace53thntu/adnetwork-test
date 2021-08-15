import {useMemo} from 'react';

export const useDestrutureAdvertisers = ({advertisers = []}) => {
  // Return advertiser destructure
  return useMemo(() => {
    return advertisers.map(advItem => {
      const {id, name} = advItem;
      return {id, name, value: id, label: name};
    });
  }, [advertisers]);
};
