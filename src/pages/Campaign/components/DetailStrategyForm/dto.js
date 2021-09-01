import moment from 'moment';

export const destructureFormData = ({formData}) => {
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
    view_rate_prediction
  } = formData;

  const positionIds = position_ids?.map(item => item?.value);
  const startDate = moment(start_at).format('DD-MM-YYYY HH:mm:ss');
  const endDate = moment(end_at).format('DD-MM-YYYY HH:mm:ss');

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
    end_at: endDate
  };
};

export const convertApiToForm = data => {
  const {
    campaign_uuid,
    name,
    skip_delay,
    cpm,
    view_rate_prediction,
    status,
    only_unskippable,
    only_skippable,
    accepted_layouts,
    accepted_adunits,
    accepted_contexts,
    accepted_sub_contexts,
    accepted_placements,
    position_ids,
    start_at,
    end_at
  } = data;

  return {
    campaign_uuid,
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
    view_rate_prediction
  };
};
