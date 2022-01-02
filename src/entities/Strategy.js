import moment from 'moment';
import {capitalize} from 'utils/helpers/string.helpers';

export const apiToForm = ({strategyData = null, positions = []}) => {
  if (!strategyData) {
    return {};
  }
  const {
    campaign,
    name = '',
    skip_delay = '',
    cpm = '',
    view_rate_prediction = '',
    status = 'active',
    only_unskippable = 'inactive',
    only_skippable = 'inactive',
    accepted_layouts = '',
    accepted_adunits = '',
    accepted_contexts = '',
    accepted_sub_contexts = '',
    accepted_placements = '',
    position_ids = null,
    start_at = null,
    end_at = null,
    uuid,
    strategy_type
  } = strategyData;

  const startDate = start_at ? new Date(start_at) : null;
  const endDate = end_at ? new Date(end_at) : null;
  const positionIds = positions?.filter(item => {
    const foundPosition = position_ids?.includes(item?.value);
    return !!foundPosition;
  });

  return {
    campaign_uuid: campaign
      ? {value: campaign?.uuid, label: campaign?.name}
      : null,
    name,
    start_at: startDate,
    end_at: endDate,
    position_ids: positionIds,
    cpm,
    skip_delay,
    status,
    only_unskippable: only_unskippable ? 'active' : 'inactive',
    only_skippable: only_skippable ? 'active' : 'inactive',
    accepted_layouts,
    accepted_adunits,
    accepted_contexts,
    accepted_sub_contexts,
    accepted_placements,
    view_rate_prediction,
    uuid,
    id: uuid,
    strategy_type: strategy_type
      ? {value: strategy_type, label: capitalize(strategy_type)}
      : null
  };
};

export const formToApi = ({formData}) => {
  const {
    campaign_uuid: campaign,
    name,
    start_at,
    end_at,
    position_ids,
    cpm,
    skip_delay,
    status,
    only_unskippable,
    only_skippable,
    accepted_layouts,
    accepted_adunits,
    accepted_contexts,
    accepted_sub_contexts,
    accepted_placements,
    view_rate_prediction,
    strategy_type
  } = formData;

  const positionIds = position_ids?.map(item => item?.value);
  const startDate = `${moment(start_at).format('DD-MM-YYYY')} 00:00:00`;
  const endDate = `${moment(end_at).format('DD-MM-YYYY')} 23:59:59`;

  return {
    campaign_uuid: campaign?.value,
    name: name?.trim(),
    skip_delay: parseInt(skip_delay, 10) ?? null,
    cpm: parseInt(cpm, 10) ?? null,
    view_rate_prediction: parseFloat(view_rate_prediction) ?? null,
    status,
    only_unskippable: only_unskippable === 'active' ? true : false,
    only_skippable: only_skippable === 'active' ? true : false,
    accepted_layouts,
    accepted_adunits,
    accepted_contexts,
    accepted_sub_contexts,
    accepted_placements,
    position_ids: positionIds,
    start_at: startDate,
    end_at: endDate,
    strategy_type: strategy_type ? strategy_type?.value : null
  };
};
