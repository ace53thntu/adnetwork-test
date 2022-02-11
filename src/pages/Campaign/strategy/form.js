//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import InformationGroup from './form-fields/InformationGroup';
import InventoryGroup from './form-fields/InventoryGroup';
import {useWatch} from 'react-hook-form';
import BudgetGroup from './form-fields/BudgetGroup';
import ImpressionGroup from './form-fields/ImpressionGroup';

const propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any
};

const StrategyForm = ({
  isEdit = false,
  isView = false,
  currentStrategy = null
}) => {
  const typeSelected = useWatch({name: 'strategy_type'});

  return (
    <>
      {/* Information Group */}
      <InformationGroup
        isView={isView}
        currentStrategy={currentStrategy}
        isEdit={isEdit}
      />

      {!isEdit && !isView && <BudgetGroup />}
      {!isEdit && !isView && <ImpressionGroup />}

      {/* Inventory Group */}
      {typeSelected?.value === 'premium' && <InventoryGroup />}
    </>
  );
};

StrategyForm.propTypes = propTypes;

export default StrategyForm;
