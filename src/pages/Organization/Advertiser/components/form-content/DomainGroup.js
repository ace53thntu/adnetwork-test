import React from 'react';

import {Collapse} from 'components/common';
import DomainGroupSelect from 'components/forms/DomainGroupSelect';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const DomainGroup = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title={t('domain')} unMount={false}>
      <Row>
        <Col md="6">
          <DomainGroupSelect
            name={CAMPAIGN_KEYS.DOMAIN_GROUP_WHITE}
            label={t('domainGroupWhite')}
            placeholder={t('selectDomainGroupWhite')}
            defaultValues={[]}
            multiple
          />
        </Col>
        <Col md="6">
          <DomainGroupSelect
            name={CAMPAIGN_KEYS.DOMAIN_GROUP_BLACK}
            label={t('domainGroupBlack')}
            placeholder={t('selectDomainGroupBlack')}
            defaultValues={[]}
            multiple
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default DomainGroup;
