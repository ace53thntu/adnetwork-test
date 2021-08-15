import {useMemo} from 'react';

export const useDestructureLabels = ({labelsData = []}) => {
  return useMemo(() => {
    if (!labelsData) {
      return [];
    }

    return labelsData.map(item => {
      const {id, advertiser_id, label_key} = item;
      return {value: id, label: label_key, advertiser_id};
    });
  }, [labelsData]);
};
