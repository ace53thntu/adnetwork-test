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
import ScheduleGroup from './form-fields/ScheduleGroup';
import {getRole} from 'utils/helpers/auth.helpers';

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
  const role = getRole();
  const typeSelected = useWatch({name: 'strategy_type'});

  return (
    <>
      {/* Information Group */}
      <InformationGroup
        isView={isView}
        currentStrategy={currentStrategy}
        isEdit={isEdit}
        role={role}
      />

      {!isEdit && !isView && <BudgetGroup />}
      {!isEdit && !isView && <ImpressionGroup />}
      {!isEdit && !isView && <ScheduleGroup />}

      {/* Inventory Group */}
      {typeSelected?.value === 'premium' && <InventoryGroup isView={isView} />}
    </>
  );
};

StrategyForm.propTypes = propTypes;

export default StrategyForm;
