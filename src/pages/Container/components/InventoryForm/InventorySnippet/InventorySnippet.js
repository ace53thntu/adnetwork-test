import {Collapse} from 'components/common';
import React from 'react';
import InventorySnippetTabs from './InventorySnippetTabs';

const InventorySnippet = ({inventoryId}) => {
  return (
    <Collapse initialOpen={false} title="Snippet" unMount={false}>
      <InventorySnippetTabs inventoryId={inventoryId} />
    </Collapse>
  );
};

export default React.memo(InventorySnippet);
