import {CollapseBox} from 'components/common';
import KeywordListSelect from 'components/forms/KeywordListSelect';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const KeywordGroup = () => {
  const {t} = useTranslation();

  return (
    <CollapseBox open title={t('keyword')} unMount={false}>
      <Row>
        <Col md="6">
          <KeywordListSelect
            name={CAMPAIGN_KEYS.KEYWORD_LIST_WHITE}
            label={t('keywordListWhite')}
            placeholder={t('selectKeywordListWhite')}
            defaultValues={[]}
            multiple
          />
        </Col>
        <Col md="6">
          <KeywordListSelect
            name={CAMPAIGN_KEYS.KEYWORD_LIST_BLACK}
            label={t('keywordListBlack')}
            placeholder={t('selectKeywordListBlack')}
            defaultValues={[]}
            multiple
          />
        </Col>
      </Row>
    </CollapseBox>
  );
};

export default KeywordGroup;
