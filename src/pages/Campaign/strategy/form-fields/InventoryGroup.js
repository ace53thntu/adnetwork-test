//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Col, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

//---> Internal Modules
import {Collapse} from 'components/common';
import {InventoryModal, StrategyInventory} from './inventories';
import {InventoryModalStyled} from './styled';
import {useTranslation} from 'react-i18next';

const propTypes = {
  isView: PropTypes.bool
};

const InventoryGroup = ({isView = false}) => {
  const {t} = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);

  function onToggleModal() {
    setOpenModal(prevState => !prevState);
  }

  return (
    <Collapse initialOpen={true} title="Inventory" unMount={false}>
      <Col sm={12}>
        <div>
          <Button type="button" onClick={onToggleModal} color="primary">
            Add Inventory
          </Button>
        </div>
        <StrategyInventory />
      </Col>
      <InventoryModalStyled toggle={onToggleModal} isOpen={openModal}>
        <ModalHeader toggle={onToggleModal}>{t('inventoryList')}</ModalHeader>
        <ModalBody>
          <InventoryModal />
        </ModalBody>
        <ModalFooter>
          <Button type="button" onClick={onToggleModal} color="link">
            {t('cancel')}
          </Button>
          <Button type="button" color="primary" onClick={onToggleModal}>
            {t('add')}
          </Button>
        </ModalFooter>
      </InventoryModalStyled>
    </Collapse>
  );
};

InventoryGroup.propTypes = propTypes;

export default InventoryGroup;
