import {capitalize} from 'utils/helpers/string.helpers';

export const TrackerInputName = {
  TEMPLATE_UUID: 'tracker.template_uuid',
  REFERENCE_TYPE: 'tracker.reference_type',
  VARIABLES: 'tracker.variables',
  STATUS: 'tracker.status'
};

export const InteractiveFileType = {
  STANDARD: 'standard',
  INTERACTIVE_BANNER: 'interactive_banner'
};

export const getInteractiveFileTypeOptions = () =>
  Object.entries(InteractiveFileType).map(([key, value]) => ({
    value,
    label: capitalize(value?.replace(/_/g, ' '))
  }));

export const InteractivePlayType = {
  INTERACTIVE_BANNER_MFV: 'interactive_banner_mfv',
  INTERACTIVE_BANNER_SPIN: 'interactive_banner_spin',
  INTERACTIVE_BANNER_CARDS: 'interactive_banner_cards'
};

export const getInteractivePlayTypeOptions = () =>
  Object.entries(InteractivePlayType).map(([key, value]) => ({
    value,
    label: capitalize(value?.replace(/_/g, ' '))
  }));

export const InteractiveStandardPlayType = {
  STANDARD: 'standard'
};

export const getInteractiveStandardPlayTypeOptions = () =>
  Object.entries(InteractiveStandardPlayType).map(([key, value]) => ({
    value,
    label: capitalize(value?.replace(/_/g, ' '))
  }));
