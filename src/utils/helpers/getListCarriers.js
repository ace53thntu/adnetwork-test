export const getListCarriers = () => {
  const mcc_mnc_list = require('mcc-mnc-list');

  // let records = mcc_mnc_list.all();
  return mcc_mnc_list
    ?.filter({countryCode: 'VN'})
    ?.map(item => ({value: `${item?.mcc}-${item.mnc}`, label: item?.brand}));
};
