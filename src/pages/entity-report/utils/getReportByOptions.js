const ExcludeReportBy = {
  advertiser: [],
  campaign: ['advertiser'],
  strategy: ['advertiser', 'campaign'],
  concept: ['advertiser', 'campaign', 'strategy'],
  creative: ['advertiser', 'campaign', 'strategy', 'concept'],
  video: ['advertiser', 'campaign', 'strategy', 'concept'],
  native_ad: ['advertiser', 'campaign', 'strategy', 'concept']
};

export const getReportByOptions = ({reportBy = 'advertiser', options = []}) => {
  return options.filter(
    optionItem => !ExcludeReportBy[reportBy].includes(optionItem.value)
  );
};
