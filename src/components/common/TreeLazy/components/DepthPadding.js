import React from 'react';

const DepthPadding = props => {
  const {indentWidth, depth, children} = props;
  return <div style={{paddingLeft: indentWidth * depth}}>{children}</div>;
};

export default DepthPadding;
