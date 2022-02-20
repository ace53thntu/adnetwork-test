import {Statuses} from 'constants/misc';

export const DOMAIN_GROUP_ENTITY = {
  id: '',
  uuid: '',
  name: '',
  description: '',
  domains: [],
  status: Statuses.ACTIVE
};

export const apiToForm = ({domainGroup = null}) => {
  if (domainGroup) {
    const {
      uuid: id,
      name,
      description,
      domain_list,
      status = Statuses.ACTIVE
    } = domainGroup;

    const domains = domain_list?.map(domain => ({
      value: domain?.uuid,
      label: domain?.domain
    }));

    return {
      uuid: id,
      id,
      name,
      description,
      domains,
      status
    };
  }

  return DOMAIN_GROUP_ENTITY;
};

export const formToApi = ({formData = {}}) => {
  if (formData) {
    const {name, description, domains, status = Statuses.ACTIVE} = formData;

    const domainList =
      domains?.length > 0 ? Array.from(domains, domain => domain?.value) : [];

    return {
      name,
      description,
      domains: domainList,
      status
    };
  }

  return DOMAIN_GROUP_ENTITY;
};
