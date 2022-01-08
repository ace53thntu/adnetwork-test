import {FilterMode, FilterTypes} from 'constants/inventory-market';

export const mappingFormToApi = ({
  formData = {},
  searchType = '',
  filterMode = FilterMode.MARKET
}) => {
  console.log('🚀 ~ file: dto.js ~ line 7 ~ filterMode', filterMode);

  if (!searchType && filterMode !== FilterMode.MARKET) {
    // Only filter by bid/deal mode
    const {has_active_bid, has_active_deal} = formData;
    if (!searchType && has_active_bid) {
      return {
        has_active_bid
      };
    }
    if (!searchType && has_active_deal) {
      return {
        has_active_deal
      };
    }
  }

  if (searchType === FilterTypes.FILTER) {
    const {
      format,
      type,
      floor_price,
      deal_price,
      fill_rate,
      click_rate,
      market_type
    } = formData;
    const filterParams = {
      format: format?.value || '',
      type: type?.value || '',
      floor_price: floor_price ? parseFloat(floor_price) : '',
      deal_price: deal_price ? parseFloat(deal_price) : '',
      fill_rate: fill_rate ? parseFloat(fill_rate) : '',
      click_rate: click_rate ? parseFloat(click_rate) : '',
      market_type: market_type || ''
    };

    if (filterMode === FilterMode.BID) {
      return {...filterParams, has_active_bid: true};
    }

    if (filterMode === FilterMode.DEAL) {
      return {...filterParams, has_active_deal: true};
    }

    return filterParams;
  }

  if (searchType === FilterTypes.SEARCH) {
    const {search} = formData;

    const searchParams = {search: search?.trim() || ''};
    if (filterMode === FilterMode.BID) {
      return {...searchParams, has_active_bid: true};
    }

    if (filterMode === FilterMode.DEAL) {
      return {...searchParams, has_active_deal: true};
    }
    return searchParams;
  }

  return null;
};
