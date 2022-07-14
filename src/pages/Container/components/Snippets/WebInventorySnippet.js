import {SDK_NAME} from 'constants/container';
import PropTypes from 'prop-types';
import * as React from 'react';
import {CopyBlock, atomOneLight} from 'react-code-blocks';

const inventoryCodeSnippet = (inventoryId, option) => {
  if (option === 0) {
    return `<div data-aiactiv-sdk-placement="${inventoryId}">
    <script type="text/javascript">
      window.addEventListener('load', function () {
        ${SDK_NAME}.requestAd(${inventoryId});
      });
    </script>
  </div>
  `;
  }

  return `window.${SDK_NAME}.requestAds([{
    inventoryId: ${inventoryId},
    placementId: "//your placement ID in DOM"
  }]);`;
};

function WebInventorySnippet({inventoryId, option}) {
  return (
    <CopyBlock
      language={option === 0 ? 'html' : 'javascript'}
      text={inventoryCodeSnippet(inventoryId, option)}
      theme={atomOneLight}
      codeBlock
      showLineNumbers={false}
    />
  );
}

WebInventorySnippet.propTypes = {
  inventoryId: PropTypes.number,
  option: PropTypes.number
};
WebInventorySnippet.defaultProps = {
  option: 0
};

export default WebInventorySnippet;
