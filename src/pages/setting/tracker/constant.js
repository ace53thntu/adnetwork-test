export const InputNames = {
  TEMPLATE_UUID: 'template_uuid',
  REFERENCE_TYPE: 'reference_type',
  REFERENCE_UUID: 'reference_uuid',
  VARIABLES: 'variables',
  STATUS: 'status'
};

export const TrackerReferenceTypes = {
  CREATIVE: 'creative',
  VIDEO: 'video',
  NATIVE_AD: 'native_ad',
  INVENTORY: 'inventory'
};

export const TrackerReferenceTypeOptions = [
  {value: TrackerReferenceTypes.CREATIVE, label: 'Creative'},
  {value: TrackerReferenceTypes.VIDEO, label: 'Video'},
  {value: TrackerReferenceTypes.NATIVE_AD, label: 'Native Ad'},
  {value: TrackerReferenceTypes.INVENTORY, label: 'Inventory'}
];
