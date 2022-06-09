//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {getRole} from 'utils/helpers/auth.helpers';

import DomainGroup from '../campaign-management/form-fields/DomainGroup';
import KeywordGroup from '../campaign-management/form-fields/KeywordGroup';
import StatisticMetrics from '../components/StatisticMetrics';
import {EnumTypeStatistics} from '../components/StatisticMetrics/StatisticMetrics';
import BudgetGroup from './form-fields/BudgetGroup';
import ImpressionGroup from './form-fields/ImpressionGroup';
//---> Internal Modules
import InformationGroup from './form-fields/InformationGroup';
import InventoryGroup from './form-fields/InventoryGroup';
import ScheduleGroup from './form-fields/ScheduleGroup';
import BudgetAndImpression from '../components/BudgetAndImpression';

const propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any,
  isDescriptionTab: PropTypes.bool
};

const StrategyForm = ({
  isEdit = false,
  isView = false,
  currentStrategy = null,
  isDescriptionTab = false
}) => {
  const role = getRole();
  const isCreate = React.useMemo(() => !isEdit && !isView, [isEdit, isView]);

  return (
    <>
      {/* Strategy Statistic Metric */}
      {currentStrategy?.id && isDescriptionTab && (
        <StatisticMetrics
          id={currentStrategy?.id}
          reportType={EnumTypeStatistics.Strategy}
        />
      )}

      {/* Information Group */}
      <InformationGroup
        isView={isView}
        currentStrategy={currentStrategy}
        isEdit={isEdit}
        role={role}
      />

      <BudgetAndImpression referenceUuid={currentStrategy?.uuid} />

      {isCreate && <BudgetGroup />}
      {isCreate && <ImpressionGroup />}
      {/* Domain */}
      {isCreate && <DomainGroup />}

      {/* Keyword */}
      {isCreate && <KeywordGroup />}
      {isCreate && <ScheduleGroup />}

      {/* Inventory Group */}
      <InventoryGroup />
    </>
  );
};

StrategyForm.propTypes = propTypes;

export default StrategyForm;
