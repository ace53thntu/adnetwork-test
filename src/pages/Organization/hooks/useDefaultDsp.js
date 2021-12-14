import {useMemo} from 'react';

export const useDefaultDsp = ({dspData = {}}) => {
  return useMemo(() => {
    let name = '',
      status = 'active',
      url = '',
      credential = {},
      domain = null;

    if (Object.keys(dspData).length > 0) {
      name = dspData?.name;
      status = dspData?.status;
      url = dspData?.url;
      //---> Destructure Domains selected.
      domain = dspData?.domain
        ? {
            value: dspData?.domain,
            label: dspData?.domain
          }
        : null;
      // TODO: Update list domains.

      credential = dspData?.credential;
    }

    return {
      name,
      status,
      url,
      credential,
      domain
    };
  }, [dspData]);
};
