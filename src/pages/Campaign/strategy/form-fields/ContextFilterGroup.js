//----> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {getBrowserLanguages} from 'utils/helpers/getBrowserLanguages';
import {getListCarriers} from 'utils/helpers/getListCarriers';
import {getListMobilePhoneBrands} from 'utils/helpers/getListMobilePhoneBrands';
import {Collapse} from 'components/common';
import {
  BandwidthOptions,
  BrowsersOptions,
  DeviceTypeOptions,
  OperatingSystemOptions,
  PlatformOptions
} from 'pages/Campaign/constants';

const propTypes = {
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any
};

const ContextFilterGroup = ({isView = false, currentStrategy}) => {
  const {t} = useTranslation();

  return (
    <Collapse initialOpen title={t('COMMON.CONTEXT_FILTER')} unMount={false}>
      <Row>
        <Col md="6">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.browser}
            options={BrowsersOptions}
            name="context_filter.browser"
            label={t('FORM.BROWSER')}
            placeholder={t('FORM.BROWSER')}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.operating_system}
            options={OperatingSystemOptions}
            name="context_filter.operating_system"
            label={t('FORM.OPERATING_SYSTEM')}
            placeholder={t('FORM.OPERATING_SYSTEM')}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.bandwidth}
            options={BandwidthOptions}
            name="context_filter.bandwidth"
            label={t('FORM.BANDWIDTH')}
            placeholder={t('FORM.BANDWIDTH')}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.context_filter?.mobile_carrier}
            options={getListCarriers()}
            name="context_filter.mobile_carrier"
            label={t('FORM.MOBILE_CARRIER')}
            placeholder={t('FORM.MOBILE_CARRIER')}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            defaultValue={currentStrategy?.context_filter?.browser_language}
            options={getBrowserLanguages()}
            label={t('FORM.BROWSER_LANGUAGE')}
            placeholder={t('FORM.BROWSER_LANGUAGE')}
            name="context_filter.browser_language"
            disabled={isView}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            defaultValue={currentStrategy?.context_filter?.device_manufacturer}
            options={getListMobilePhoneBrands()}
            label={t('FORM.DEVICE_MANUFACTURER')}
            placeholder={t('FORM.DEVICE_MANUFACTURER')}
            name="context_filter.device_manufacturer"
            disabled={isView}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            defaultValue={currentStrategy?.context_filter?.device_type}
            options={DeviceTypeOptions}
            label={t('FORM.DEVICE_TYPE')}
            placeholder={t('FORM.DEVICE_TYPE')}
            name="context_filter.device_type"
            disabled={isView}
            multiple
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            defaultValue={currentStrategy?.context_filter?.platform}
            options={PlatformOptions}
            label={t('FORM.PLATFORM')}
            placeholder={t('FORM.PLATFORM')}
            name="context_filter.platform"
            disabled={isView}
            multiple
          />
        </Col>
      </Row>
    </Collapse>
  );
};

ContextFilterGroup.propTypes = propTypes;

export default ContextFilterGroup;
