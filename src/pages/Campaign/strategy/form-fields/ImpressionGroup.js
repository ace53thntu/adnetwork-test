import {Collapse} from 'components/common';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const propTypes = {};

const ImpressionGroup = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title={t('impression')} unMount={false}>
      <Row>
        <Col md="4">
          <CurrencyInputField
            name="impression.global"
            label={t('global')}
            placeholder={t('global')}
            disableGroupSeparators
            allowDecimals={false}
            required
          />
        </Col>
        <Col md="4">
          <CurrencyInputField
            name="impression.daily"
            label={t('daily')}
            placeholder={t('daily')}
            disableGroupSeparators
            allowDecimals={false}
            required
          />
        </Col>
      </Row>
    </Collapse>
  );
};

ImpressionGroup.propTypes = propTypes;

export default ImpressionGroup;
