import {Collapse} from 'components/common';
import {FormTextInput} from 'components/forms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const propTypes = {};

const BudgetGroup = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen={true} title={t('budget')} unMount={false}>
      <Row>
        <Col md="4">
          <FormTextInput
            placeholder={t('global')}
            name="budget.global"
            label={t('global')}
            isRequired
          />
        </Col>
        <Col md="4">
          <FormTextInput
            placeholder={t('daily')}
            name="budget.daily"
            label={t('daily')}
            isRequired
          />
        </Col>
      </Row>
    </Collapse>
  );
};

BudgetGroup.propTypes = propTypes;

export default BudgetGroup;
