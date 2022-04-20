import {ReportGroupTypes} from '../constants.js';

const AdvertiserExcludeReportBy = {
  advertiser: [],
  campaign: ['advertiser'],
  strategy: ['advertiser', 'campaign'],
  concept: ['advertiser', 'campaign', 'strategy'],
  creative: ['advertiser', 'campaign', 'strategy', 'concept'],
  video: ['advertiser', 'campaign', 'strategy', 'concept'],
  native_ad: ['advertiser', 'campaign', 'strategy', 'concept']
};

const PublisherExcludeReportBy = {
  publisher: [],
  container: ['publisher'],
  page: ['publisher', 'container'],
  inventory: ['publisher', 'container', 'page']
};

export const getReportByOptions = ({
  groupType = 'advertiser',
  reportBy = 'advertiser',
  options = []
}) => {
  console.log(
    '🚀 ~ file: getReportByOptions.js ~ line 25 ~ groupType',
    groupType
  );
  if (groupType === ReportGroupTypes.ADVERTISER) {
    return options.filter(
      optionItem =>
        !AdvertiserExcludeReportBy[reportBy]?.includes(optionItem.value)
    );
  }

  return options.filter(
    optionItem =>
      !PublisherExcludeReportBy[reportBy]?.includes(optionItem.value)
  );
};
