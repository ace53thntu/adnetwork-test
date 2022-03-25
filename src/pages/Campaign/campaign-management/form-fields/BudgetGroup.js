//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import {CollapseBox} from 'components/common';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const BudgetGroup = () => {
  const {t} = useTranslation();

  return (
    <CollapseBox open title={t('budget')} unMount={false}>
      <Row>
        <Col md="4">
          <CurrencyInputField
            required
            name="budget.global"
            placeholder="0.0"
            label={t('global')}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
          />
        </Col>
        <Col md="4">
          <CurrencyInputField
            required
            name="budget.daily"
            placeholder="0.0"
            label={t('daily')}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
          />
        </Col>
      </Row>
    </CollapseBox>
  );
};

export default BudgetGroup;
