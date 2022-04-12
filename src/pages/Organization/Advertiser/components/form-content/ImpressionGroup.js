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
            label={t('global')}
            placeholder={t('global')}
            disableGroupSeparators
            allowDecimals={false}
          />
        </Col>
        <Col md="4">
          <CurrencyInputField
            required
            name="impression.daily"
            label={t('daily')}
            placeholder={t('daily')}
            disableGroupSeparators
            allowDecimals={false}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default ImpressionGroup;
