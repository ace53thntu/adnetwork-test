import PropTypes from 'prop-types';
import * as React from 'react';
import {CopyBlock, dracula} from 'react-code-blocks';
import {Label} from 'reactstrap';

function DirectSnippet(props) {
  const {children} = props;

  return (
    <>
      <Label>Direct URL</Label>

      <CopyBlock
        codeBlock
        showLineNumbers={false}
        language="html"
        text={children}
        theme={dracula}
      />
    </>
  );
}

DirectSnippet.propTypes = {
  children: PropTypes.any
};
DirectSnippet.defaultProps = {};

export default DirectSnippet;
