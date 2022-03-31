import {USER_ROLE} from 'pages/user-management/constants';
import {convertApiToGui, convertGuiToApi} from 'utils/handleCurrencyFields';
import {capitalize} from 'utils/helpers/string.helpers';

export const mappingApiToForm = ({container, containerRedux, t}) => {
  if (container) {
    const {
      name = '',
      url = '',
      status = 'active',
      publisher_uuid,
      publisher_name,
      first_party,
      cost,
      defaults
    } = container;
    return {
      name,
      url,
      status,
      publisher_uuid: publisher_uuid
        ? {value: publisher_uuid, label: publisher_name}
        : null,
      first_party: first_party ? 'active' : 'inactive',
      cost,
      defaults: {
        format: defaults?.format
          ? {value: defaults?.format, label: capitalize(defaults?.format)}
          : null,
        floor_price: convertApiToGui({value: defaults?.floor_price}),
        deal_floor_price: convertApiToGui({value: defaults?.deal_floor_price}),
        type: defaults?.type
          ? {value: defaults.type, label: capitalize(defaults.type)}
          : null,
        market: defaults?.market
          ? {value: defaults.market, label: capitalize(defaults.market)}
          : null,
        dsps:
          defaults?.dsps?.map(item => ({
            value: item?.uuid,
            label: item.name
          })) || []
      }
    };
  }
  if (containerRedux) {
    const {
      name = '',
      url = '',
      status = 'active',
      publisher_uuid,
      publisher_name,
      first_party = true,
      cost,
      defaults
    } = containerRedux;

    return {
      name,
      url,
      status,
      publisher_uuid: publisher_uuid
        ? {value: publisher_uuid, label: publisher_name}
        : null,
      first_party: first_party ? 'active' : 'inactive',
      cost,
      defaults: {
        format: defaults?.format
          ? {value: defaults?.format, label: capitalize(defaults?.format)}
          : null,
        floor_price: convertApiToGui({value: defaults?.floor_price}),
        deal_floor_price: convertApiToGui({value: defaults?.deal_floor_price}),
        type: defaults?.type
          ? {value: defaults.type, label: capitalize(defaults.type)}
          : null,
        market: defaults?.market
          ? {value: defaults.market, label: capitalize(defaults.market)}
          : null,
        dsps:
          defaults?.dsps?.map(item => ({
            value: item?.uuid,
            label: item.name
          })) || []
      }
    };
  }

  return {
    name: '',
    url: '',
    status: 'active',
    publisher_uuid: null,
    first_party: 'active',
    cost: '',
    defaults: {
      format: null,
      floor_price: '',
      deal_floor_price: '',
      type: null,
      market: null,
      dsps: []
    }
  };
};

export const mappingFormToApi = (formData, role) => {
  const {
    name,
    url,
    publisher_uuid,
    status,
    first_party,
    cost,
    defaults
  } = formData;
  return {
    name,
    url,
    publisher_uuid: publisher_uuid?.value,
    status,
    first_party: first_party === 'active' ? true : false,
    cost: [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)
      ? parseFloat(cost)
      : 0.1,
    defaults: {
      format: defaults?.format?.value || '',
      floor_price: convertGuiToApi({value: defaults?.floor_price}),
      deal_floor_price: convertGuiToApi({value: defaults?.deal_floor_price}),
      type: defaults?.type?.value || '',
      market: defaults?.market?.value || '',
      dsps: defaults?.dsps?.map(item => item?.value || '') || []
    }
  };
};
