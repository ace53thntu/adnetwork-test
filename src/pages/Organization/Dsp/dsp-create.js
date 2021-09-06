import React from 'react';

const DspCreate = ({children}) => {
  return <div>{children}</div>;
};

export default React.memo(DspCreate);
