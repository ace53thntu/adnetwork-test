import {ActionTypes} from 'pages/InventoryMarket/constants';

export const mappingFormToApi = (formData = {}, searchType = '') => {
  if (searchType === ActionTypes.FILTER) {
    const {
      format,
      type,
      floor_price,
      deal_price,
      fill_rate,
      click_rate
    } = formData;
    return {
      format: format?.value || '',
      type: type?.value || '',
      floor_price: floor_price ? parseFloat(floor_price) : '',
      deal_price: deal_price ? parseFloat(deal_price) : '',
      fill_rate: fill_rate ? parseFloat(fill_rate) : '',
      click_rate: click_rate ? parseFloat(click_rate) : ''
    };
  }

  if (searchType === ActionTypes.SEARCH) {
    const {search} = formData;

    return {search: search?.trim() || ''};
  }

  return null;
};
