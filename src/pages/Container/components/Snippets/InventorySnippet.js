import 'prismjs/themes/prism.css';

import PropTypes from 'prop-types';
import * as React from 'react';
import {Label} from 'reactstrap';

import ReactPrismjs from '@uiw/react-prismjs';

function InventorySnippet(props) {
  const {children, className} = props;

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

InventorySnippet.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};
InventorySnippet.defaultProps = {};

export default InventorySnippet;
