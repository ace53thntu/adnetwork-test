import 'prismjs/themes/prism.css';

import {Label} from 'reactstrap';
import React from 'react';
import ReactPrismjs from '@uiw/react-prismjs';

export default function Code({children, className}) {
  return (
    <>
      <Label>Snippet</Label>
      <ReactPrismjs
        language="javascript"
        source={children}
        className={className}
      />
    </>
  );
}
