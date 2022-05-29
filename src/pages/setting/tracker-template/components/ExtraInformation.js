import React from 'react';
import {Row, Col} from 'reactstrap';
import {Collapse} from 'components/common';
import {FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';

const ExtraInformation = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title="Extra information">
      <Row>
        {/* Click Url Append Params */}
        <Col sm={12}>
          <FormTextInput
            name={InputNames.CLICK_URL_APPEND_PARAMS}
            label={t('clickUrlAppendParams')}
            placeholder={t('enterClickUrlAppendParams')}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default ExtraInformation;
