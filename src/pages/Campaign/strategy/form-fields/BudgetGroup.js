import {Collapse} from 'components/common';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const propTypes = {};

const BudgetGroup = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title={t('budget')} unMount={false}>
      <Row>
        <Col md="4">
          <CurrencyInputField
            name="budget.global"
            label={t('global')}
            placeholder="0.0"
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            required
          />
        </Col>
        <Col md="4">
          <CurrencyInputField
            name="budget.daily"
            label={t('daily')}
            placeholder="0.0"
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            required
          />
        </Col>
      </Row>
    </Collapse>
  );
};

BudgetGroup.propTypes = propTypes;

export default BudgetGroup;
