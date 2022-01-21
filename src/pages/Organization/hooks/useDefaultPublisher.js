import {useMemo} from 'react';
import {mappingApiToForm} from '../Publisher/components/dto';

export const useDefaultPublisher = ({publisher = {}}) => {
  return useMemo(() => {
    return mappingApiToForm({apiResp: publisher});
  }, [publisher]);
};
