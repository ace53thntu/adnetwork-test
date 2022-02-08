import {
  TrackerReferenceTypeOptions,
  TrackerReferenceTypes
} from 'pages/setting/tracker/constant';

export const TRACKER_ENTITY = {
  id: '',
  uuid: '',
  reference_type: null,
  reference_uuid: null,
  template_uuid: null,
  variables: '',
  status: 'active'
};

export const apiToForm = ({tracker = null}) => {
  if (tracker) {
    const {
      uuid: id,
      status = 'active',
      tracker_template,
      reference_type,
      reference_uuid,
      creative_name,
      video_name,
      native_ads_name,
      inventory_name,
      variables
    } = tracker;

    let referenceObj = null;
    if (reference_type === TrackerReferenceTypes.CREATIVE) {
      referenceObj = {value: reference_uuid, label: creative_name} || null;
    } else if (reference_type === TrackerReferenceTypes.VIDEO) {
      referenceObj = {value: reference_uuid, label: video_name} || null;
    } else if (reference_type === TrackerReferenceTypes.NATIVE_AD) {
      referenceObj = {value: reference_uuid, label: native_ads_name} || null;
    } else if (reference_type === TrackerReferenceTypes.INVENTORY) {
      referenceObj = {value: reference_uuid, label: inventory_name} || null;
    }

    return {
      uuid: id,
      id,
      status,
      template_uuid:
        {value: tracker_template?.uuid, label: tracker_template?.name} || null,
      variables: JSON.stringify(variables) || '',
      reference_type: TrackerReferenceTypeOptions.find(
        item => item.value === reference_type
      ),
      reference_uuid: referenceObj
    };
  }

  return TRACKER_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {
      template_uuid,
      reference_type,
      reference_uuid,
      variables,
      status = 'active'
    } = formData;

    return {
      template_uuid: template_uuid?.value,
      reference_type: reference_type?.value,
      reference_uuid: reference_uuid?.value,
      variables,
      status
    };
  }

  return TRACKER_ENTITY;
};
