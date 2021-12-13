import React from 'react';

import {RequiredLabelStyled} from './styled';

const RequiredLabelPrefix = ({requireNotation = '*'}) => {
  return <RequiredLabelStyled>{requireNotation}</RequiredLabelStyled>;
};

export default React.memo(RequiredLabelPrefix);
