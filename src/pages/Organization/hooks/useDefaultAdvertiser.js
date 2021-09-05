import {useMemo} from 'react';

export const useDefaultAdvertiser = ({advertiser = {}, iabsArr = []}) => {
  return useMemo(() => {
    let name = '',
      status = 'active',
      iabs = [],
      domains = [],
      tags = [];

    if (Object.keys(advertiser).length > 0) {
      name = advertiser?.name;
      status = advertiser?.status;
      tags =
        advertiser?.tags?.map(item => ({value: item, label: item, id: item})) ||
        [];

      //---> Destructure Domains selected.
      let domainsRes = advertiser?.domains || [];
      // TODO: Update list domains.
      domains = domainsRes.map(domainItem => ({
        value: domainItem,
        label: domainItem
      }));

      //---> Destructure IABs selected.
      let iabsRes = advertiser?.iabs || [];
      iabs = iabsArr?.filter(iabItem => {
        if (iabsRes.includes(iabItem.value)) {
          return true;
        }

        return false;
      });
    }

    return {
      name,
      status,
      iabs,
      domains,
      tags
    };
  }, [advertiser, iabsArr]);
};
