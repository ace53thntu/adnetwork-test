import {useMemo} from 'react';
import {mappingApiToForm} from '../Publisher/components/dto';

export const useDefaultPublisher = ({
  publisher = {},
  domainsArr = [],
  countriesArr = []
}) => {
  return useMemo(() => {
    return mappingApiToForm({apiResp: publisher, domainsArr, countriesArr});
  }, [countriesArr, domainsArr, publisher]);
};
