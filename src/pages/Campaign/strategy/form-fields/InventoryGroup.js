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
import {useTranslation} from 'react-i18next';

const propTypes = {};

const InventoryGroup = () => {
  const {t} = useTranslation();
  const strategyInventories = useStrategyInventorySelector();
  const hasStrategyInventories = strategyInventories?.length > 0;
  const [openModal, setOpenModal] = React.useState(false);

  function onToggleModal() {
    setOpenModal(prevState => !prevState);
  }

  return (
    <Collapse
      initialOpen={hasStrategyInventories}
      title={t('inventories')}
      unMount={false}
    >
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
