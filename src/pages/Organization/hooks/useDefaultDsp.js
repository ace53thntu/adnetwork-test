import {useMemo} from 'react';
import {mappingApiToForm} from '../Dsp/components/dto';

export const useDefaultDsp = ({dspData = {}}) => {
  return useMemo(() => {
    return mappingApiToForm({dspData});
  }, [dspData]);
};
