import React from 'react';
import {Row, Col} from 'reactstrap';
import {Collapse} from 'components/common';
import {FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';
import FormCodeMirror from 'components/forms/FormCodeMirror';

const GeneralTracking = () => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title="General tracking">
      <Row>
        {/* Impression script */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.IMPRESSION_SCRIPT}
            label={t('impressionScript')}
            placeholder={`${t('enter')} ${t('impressionScript')}`}
          />
        </Col>

        {/* Impression image */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.IMPRESSION_IMAGE}
            label={t('impressionImage')}
            placeholder={`${t('enter')} ${t('impressionImage')}`}
          />
        </Col>

        {/* Impression url */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.IMPRESSION_URL}
            label={t('impressionUrl')}
            placeholder={`${t('enter')} ${t('impressionUrl')}`}
          />
        </Col>
        {/* Click Script */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.CLICK_SCRIPT}
            label={t('clickScript')}
            placeholder={t('enterClickScript')}
          />
        </Col>
        {/* Click Image */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.CLICK_IMAGE}
            label={t('clickImage')}
            placeholder={t('enterClickImage')}
          />
        </Col>
        {/* Click URL */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.CLICK_URL}
            label={t('clickUrl')}
            placeholder={t('enterClickUrl')}
          />
        </Col>
        {/* Code */}
        <Col sm={12}>
          <FormCodeMirror
            name={InputNames.CODE}
            label={t('code')}
            placeholder="<div>Code example</div>"
            extension="HTML"
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default GeneralTracking;
