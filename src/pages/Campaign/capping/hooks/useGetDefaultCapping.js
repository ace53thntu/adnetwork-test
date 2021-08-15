import {useMemo} from 'react';
import {CAPPING_TYPE} from 'pages/Campaign/constants';

export const useGetDefaultCapping = capping => {
  return useMemo(() => {
    let ctype = null,
      time_frame = 0,
      climit = 0,
      smooth = 'active';
    if (capping) {
      ctype = capping?.ctype;
      ctype = CAPPING_TYPE.find(item => item.value === ctype);

      time_frame = capping?.time_frame;
      climit = capping?.climit;
      smooth = capping?.smooth ? 'active' : 'inactive';
    }

    return {
      ctype,
      time_frame,
      climit,
      smooth
    };
  }, [capping]);
};
