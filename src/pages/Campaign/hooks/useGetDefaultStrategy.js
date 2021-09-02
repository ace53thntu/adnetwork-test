import {useMemo} from 'react';
import {convertApiToForm} from '../components/DetailStrategyForm/dto';

export const useGetDefaultStrategy = ({
  strategyData = null,
  listCampaign = [],
  positions = []
}) => {
  return useMemo(() => {
    if (!strategyData) {
      return null;
    }

    const data = convertApiToForm({
      strategy: strategyData,
      campaigns: listCampaign,
      positions
    });
    return data;
  }, [listCampaign, positions, strategyData]);
};
