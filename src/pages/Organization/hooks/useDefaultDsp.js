import {useMemo} from 'react';

export const useDefaultDsp = ({dspData = {}}) => {
  return useMemo(() => {
    let name = '',
      status = 'active',
      url = '',
      credential = {},
      domains = '';

    if (Object.keys(dspData).length > 0) {
      name = dspData?.name;
      status = dspData?.status;
      url = dspData?.url;
      //---> Destructure Domains selected.
      let domainsRes = dspData?.domains || '';
      // TODO: Update list domains.
      domains = {
        value: domainsRes,
        label: domainsRes
      };
      credential = dspData?.credential;
    }

    return {
      name,
      status,
      url,
      credential,
      domains
    };
  }, [dspData]);
};
