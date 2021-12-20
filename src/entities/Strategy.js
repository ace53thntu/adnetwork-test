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
    uuid
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
    uuid
  };
};
