//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Col, Button, FormText} from 'reactstrap';

//---> Internal Modules
import {Collapse} from 'components/common';
import {InventoryModal, StrategyInventory} from './inventories';
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';
import {useStrategyInventorySelector} from 'store/reducers/campaign';

const propTypes = {
  isView: PropTypes.bool
};

const InventoryGroup = ({isView = false}) => {
  const strategyInventories = useStrategyInventorySelector();

  const [openModal, setOpenModal] = React.useState(false);

  function onToggleModal() {
    setOpenModal(prevState => !prevState);
  }

  return (
    <Collapse initialOpen={true} title="Inventory" unMount={false}>
      <Col sm={12}>
        {strategyInventories?.length === 0 && (
          <FormText>
            <RequiredLabelPrefix />
            Please add at least one inventory.
          </FormText>
        )}

        <div>
          <Button type="button" onClick={onToggleModal} color="primary">
            Add Inventory
          </Button>
        </div>
        <StrategyInventory strategyInventories={strategyInventories} />
      </Col>
      <InventoryModal openModal={openModal} onToggleModal={onToggleModal} />
    </Collapse>
  );
};

InventoryGroup.propTypes = propTypes;

export default InventoryGroup;
