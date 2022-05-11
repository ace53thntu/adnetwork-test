import {Collapse} from 'components/common';
import {FormReactSelect, FormTextInput} from 'components/forms';
import {
  BandwidthOptions,
  BrowsersOptions,
  MobileCarrierOptions,
  OperatingSystemOptions
} from 'pages/Campaign/constants';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

const propTypes = {};

const ContextFilterGroup = ({isView = false, currentStrategy}) => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title={t('COMMON.CONTEXT_FILTER')} unMount={false}>
      <Row>
        <Col md="4">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.browser}
            options={BrowsersOptions}
            name="context_filter.browser"
            label={t('FORM.BROWSER')}
            placeholder={t('FORM.BROWSER')}
          />
        </Col>
        <Col md="4">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.operating_system}
            options={OperatingSystemOptions}
            name="context_filter.operating_system"
            label={t('FORM.OPERATING_SYSTEM')}
            placeholder={t('FORM.OPERATING_SYSTEM')}
          />
        </Col>
        <Col md="4">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.bandwidth}
            options={BandwidthOptions}
            name="context_filter.bandwidth"
            label={t('FORM.BANDWIDTH')}
            placeholder={t('FORM.BANDWIDTH')}
          />
        </Col>
        <Col md="4">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.mobile_carrier}
            options={MobileCarrierOptions}
            name="context_filter.mobile_carrier"
            label={t('FORM.MOBILE_CARRIER')}
            placeholder={t('FORM.MOBILE_CARRIER')}
          />
        </Col>
        <Col md="4">
          <FormTextInput
            type="text"
            label={t('FORM.BROWSER_LANGUAGE')}
            placeholder={t('FORM.BROWSER_LANGUAGE')}
            id="browser_language"
            name="context_filter.browser_language"
            disabled={isView}
          />
        </Col>
        <Col md="4">
          <FormTextInput
            type="text"
            label={t('FORM.DEVICE_MANUFACTURER')}
            placeholder={t('FORM.DEVICE_MANUFACTURER')}
            id="device_manufacturer"
            name="context_filter.device_manufacturer"
            disabled={isView}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

ContextFilterGroup.propTypes = propTypes;

export default ContextFilterGroup;
