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
    const {uuid: id, status = 'active'} = tracker;

    return {
      uuid: id,
      id,
      status
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
