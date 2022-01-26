import {apiToForm} from 'entities/KeywordList';
import React from 'react';

export const useDefaultValues = ({keywordList = {}}) => {
  return React.useMemo(() => apiToForm({keywordList}), [keywordList]);
};
