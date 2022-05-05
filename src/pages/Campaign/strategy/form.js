//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';

//---> Internal Modules
import InformationGroup from './form-fields/InformationGroup';
import InventoryGroup from './form-fields/InventoryGroup';
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
  const isCreate = React.useMemo(() => !isEdit && !isView, [isEdit, isView]);

  return (
    <>
      {/* Information Group */}
      <InformationGroup
        isView={isView}
        currentStrategy={currentStrategy}
        isEdit={isEdit}
        role={role}
      />

      {isCreate && <BudgetGroup />}
      {isCreate && <ImpressionGroup />}
      {isCreate && <ScheduleGroup />}

      {/* Inventory Group */}
      {<InventoryGroup isView={isView} />}
    </>
  );
};

StrategyForm.propTypes = propTypes;

export default StrategyForm;
