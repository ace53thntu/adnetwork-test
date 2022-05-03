import PropTypes from 'prop-types';
import * as React from 'react';
import {CopyBlock, atomOneLight} from 'react-code-blocks';
import {Label} from 'reactstrap';

function InventorySnippet(props) {
  const {
    children
    // className
  } = props;

  return (
    <>
      <Label>Snippet</Label>

      <CopyBlock
        language="javascript"
        text={children}
        theme={atomOneLight}
        codeBlock
        showLineNumbers={false}
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
