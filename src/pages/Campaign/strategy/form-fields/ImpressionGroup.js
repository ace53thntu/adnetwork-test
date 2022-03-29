import {CollapseBox} from 'components/common';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const propTypes = {};

const ImpressionGroup = () => {
  const {t} = useTranslation();

  return (
    <CollapseBox open title={t('impression')} unMount={false}>
      <Row>
        <Col md="4">
          <CurrencyInputField
            name="impression.global"
            label={t('global')}
            placeholder="0.0"
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            required
          />
        </Col>
        <Col md="4">
          <CurrencyInputField
            name="impression.daily"
            label={t('daily')}
            placeholder="0.0"
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            required
          />
        </Col>
      </Row>
    </CollapseBox>
  );
};

ImpressionGroup.propTypes = propTypes;

export default ImpressionGroup;
