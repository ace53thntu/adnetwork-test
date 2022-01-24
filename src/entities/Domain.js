export const DOMAIN_ENTITY = {
  id: '',
  uuid: '',
  domain: '',
  status: 'active'
};

export const apiToForm = ({domain = null}) => {
  if (domain) {
    const {uuid: id, domain: domainName, status = 'active'} = domain;

    return {
      uuid: id,
      id,
      domain: domainName,
      status
    };
  }

  return DOMAIN_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {domain, status = 'active'} = formData;

    return {
      domain,
      status
    };
  }

  return DOMAIN_ENTITY;
};
