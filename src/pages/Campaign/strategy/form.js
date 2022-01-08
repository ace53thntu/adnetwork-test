//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import AdsGroup from './form-fields/AdsGroup';
import InformationGroup from './form-fields/InformationGroup';
import InventoryGroup from './form-fields/InventoryGroup';
import StatusGroup from './form-fields/StatusGroup';

const propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any,
  positions: PropTypes.array
};

const StrategyForm = ({
  isEdit = false,
  isView = false,
  currentStrategy = null,
  positions = []
}) => {
  return (
    <>
      {/* Information Group */}
      <InformationGroup
        isView={isView}
        currentStrategy={currentStrategy}
        isEdit={isEdit}
        positions={positions}
      />

      {/* Status Group */}
      <StatusGroup isView={isView} currentStrategy={currentStrategy} />

      {/* Ads Group */}
      <AdsGroup isView={isView} currentStrategy={currentStrategy} />

      {/* Inventory Group */}
      {isEdit && <InventoryGroup />}
    </>
  );
};

StrategyForm.propTypes = propTypes;

export default StrategyForm;
