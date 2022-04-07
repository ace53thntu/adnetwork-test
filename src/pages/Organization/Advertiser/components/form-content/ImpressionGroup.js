//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import {Collapse} from 'components/common';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const ImpressionGroup = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title={t('impression')} unMount={false}>
      <Row>
        <Col md="4">
          <CurrencyInputField
            required
            name="impression.global"
            placeholder="0.0"
            label={t('global')}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
          />
        </Col>
        <Col md="4">
          <CurrencyInputField
            required
            name="impression.daily"
            placeholder="0.0"
            label={t('daily')}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default ImpressionGroup;
