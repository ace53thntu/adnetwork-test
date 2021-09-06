import {useMemo} from 'react';

export const useDefaultPublisher = ({publisher = {}, domainsArr = []}) => {
  return useMemo(() => {
    let name = '',
      status = 'active',
      domains = [];

    if (Object.keys(publisher).length > 0) {
      name = publisher?.name;
      status = publisher?.status;

      //---> Destructure Domains selected.
      let domainsRes = publisher?.domains || [];
      // TODO: Update list domains.
      domains = domainsRes.map(domainItem => ({
        value: domainItem,
        label: domainItem
      }));
    }

    return {
      name,
      status,
      domains
    };
  }, [publisher]);
};
