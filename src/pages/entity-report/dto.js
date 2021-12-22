import moment from 'moment';

const DATE_FORMAT_STR = 'DD-MM-YYYY hh:mm:ss';

export function mappingFormToApi({
  formData,
  entityId,
  metricSet,
  metricType,
  entityType,
  ownerRole,
  ownerUuid
}) {
  const {api, properties} = formData;
  let {unit, time_range, distribution_by} = api;
  unit = unit?.value;
  time_range = time_range?.value;
  distribution_by = distribution_by?.value;

  const data = {
    name: `${entityType} report - ${moment().format(DATE_FORMAT_STR)}`,
    type: 'overview',
    service: 'service',
    entity_uuid: entityId,
    entity_type: entityType,
    owner_role: ownerRole,
    owner_uuid: ownerUuid,
    properties: {...properties, metric_set: metricSet},
    api: {
      unit,
      time_range,
      distribution_by,
      metric_type: metricType
    },
    status: 'active'
  };

  return data;
}
