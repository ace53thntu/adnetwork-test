import moment from 'moment';
import {convertArrayToObject} from 'utils/helpers/dataStructure.helpers';

export const useGetStrategies = ({advertisers = [], campaigns = []}) => {
  if (!advertisers || advertisers.length === 0) {
    return [];
  }

  if (!campaigns || campaigns.length === 0) {
    return [];
  }

  const advertiserObj = convertArrayToObject(advertisers, 'id');

  const result = campaigns.reduce((acc, campaignItem) => {
    const {strategies, name, id, advertiser_id} = campaignItem;
    const advertiser = advertiserObj[advertiser_id] || null;
    let destructureData = [];
    if (Array.isArray(strategies) && strategies.length > 0) {
      destructureData = strategies?.map(strategyItem => {
        const {
          name: strategyName,
          id: strategyId,

          active: status
        } = strategyItem;
        // TODO: Request API response 3 these fields
        const startDate = moment().format('DD/MM/YYYY');
        const dueDate = moment().format('DD/MM/YYYY');
        const process = 0;
        return {
          advertiserId: advertiser?.id,
          advertiserName: advertiser?.name,
          campaignName: name,
          campaignId: id,
          strategyId,
          strategyName,
          status: status ? 'active' : 'inactive',
          startDate,
          dueDate,
          process
        };
      });
    }

    acc = [...acc, ...destructureData];
    return acc;
  }, []);

  return result;
};
