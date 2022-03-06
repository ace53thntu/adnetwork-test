import {CollapseBox} from 'components/common';
import {FormTextInput} from 'components/forms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const ImpressionGroup = () => {
  const {t} = useTranslation();

  return (
    <CollapseBox open title={t('impression')} unMount={false}>
      <Row>
        <Col md="4">
          <FormTextInput
            placeholder={t('global')}
            name="impression.global"
            label={t('global')}
            isRequired
          />
        </Col>
        <Col md="4">
          <FormTextInput
            placeholder={t('daily')}
            name="impression.daily"
            label={t('daily')}
            isRequired
          />
        </Col>
      </Row>
    </CollapseBox>
  );
};

export default ImpressionGroup;
