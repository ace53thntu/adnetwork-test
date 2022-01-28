import {apiToForm} from 'entities/TrackerTemplate';
import React from 'react';

export const useDefaultValues = ({trackerTemplate = {}}) => {
  return React.useMemo(() => apiToForm({trackerTemplate}), [trackerTemplate]);
};
