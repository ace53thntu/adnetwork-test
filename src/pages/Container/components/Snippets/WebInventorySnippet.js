import {SDK_NAME} from 'constants/container';
import PropTypes from 'prop-types';
import * as React from 'react';
import {CopyBlock, atomOneLight} from 'react-code-blocks';

const inventoryCodeSnippet = inventoryId => {
  return `window.${SDK_NAME}.requestAds([{
    inventoryId: ${inventoryId},
    placementId: "//your placement ID in DOM"
  }]);`;
};

function WebInventorySnippet({inventoryId}) {
  return (
    <CopyBlock
      language="javascript"
      text={inventoryCodeSnippet(inventoryId)}
      theme={atomOneLight}
      codeBlock
      showLineNumbers={false}
    />
  );
}

WebInventorySnippet.propTypes = {
  inventoryId: PropTypes.number,
};
WebInventorySnippet.defaultProps = {};

export default WebInventorySnippet;
