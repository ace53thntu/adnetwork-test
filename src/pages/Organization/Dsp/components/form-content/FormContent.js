// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Label, Row} from 'reactstrap';

// Internal Modules
import {ActiveToggle, FormTextInput} from 'components/forms';
import {INPUT_NAME} from '../../constants';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const propTypes = {
  defaultValues: PropTypes.object,
  isView: PropTypes.bool,
  isEdit: PropTypes.bool
};

const FormContent = ({defaultValues = {}, isView = false, isEdit = false}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();

  return (
    <Row>
      <Col sm={12}>
        <FormTextInput
          name={INPUT_NAME.NAME}
          label={t('name')}
          placeholder={t('enterName')}
          isRequired
          disabled={isView}
        />
      </Col>
      <Col sm={12}>
        <FormTextInput
          name={INPUT_NAME.URL}
          label={t('biddingUrl')}
          placeholder={t('enterUrl')}
          isRequired
          disabled={isView}
        />
      </Col>
      {/* Domains */}
      <Col sm={12}>
        <FormTextInput
          name={INPUT_NAME.DOMAIN}
          label={t('domain')}
          placeholder={t('domain')}
          disabled={isView}
          isRequired
        />
      </Col>
      <Col sm={12}>
        <FormTextInput
          name={`${INPUT_NAME.CREDENTIAL}.${INPUT_NAME.ACCESS_KEY}`}
          label={t('accessKey')}
          placeholder={t('enterAccessKey')}
          disabled={isView}
        />
      </Col>
      <Col sm={12}>
        <FormTextInput
          name={`${INPUT_NAME.CREDENTIAL}.${INPUT_NAME.SECRET_KEY}`}
          label={t('secretKey')}
          placeholder={t('enterSecretKey')}
          disabled={isView}
        />
      </Col>
      {!isEdit && !isView && (
        <>
          <Col sm="4">
            <CurrencyInputField
              name={`${INPUT_NAME.BUDGET}.${INPUT_NAME.GLOBAL}`}
              placeholder="0.0"
              label={t('COMMON.BUDGET_GLOBAL')}
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={false}
              decimalsLimit={3}
              prefix="$"
              required
            />
          </Col>
          <Col sm="4">
            <CurrencyInputField
              name={`${INPUT_NAME.BUDGET}.${INPUT_NAME.DAILY}`}
              placeholder="0.0"
              label={t('COMMON.BUDGET_DAILY')}
              decimalSeparator="."
              groupSeparator=","
              disableGroupSeparators={false}
              decimalsLimit={3}
              prefix="$"
              required
            />
          </Col>
        </>
      )}

      <Col sm="4">
        <FormTextInput
          name={INPUT_NAME.PRIORITY}
          label="Priority"
          placeholder="0"
          disabled={isView}
        />
      </Col>
      {/* Status */}
      <Col md="3">
        <Label className="mr-5">{t('status')}</Label>
        <Controller
          control={control}
          name={INPUT_NAME.STATUS}
          render={({onChange, onBlur, value, name}) => (
            <ActiveToggle value={value} onChange={onChange} disabled={isView} />
          )}
        />
      </Col>
      {/* Header Bidding Available */}
      <Col md="3">
        <Label className="mr-5">{t('headerBiddingAvailable')}</Label>
        <Controller
          control={control}
          name={INPUT_NAME.HEADER_BIDDING_AVAILABLE}
          render={({onChange, onBlur, value, name}) => (
            <ActiveToggle value={value} onChange={onChange} disabled={isView} />
          )}
        />
      </Col>
    </Row>
  );
};

FormContent.propTypes = propTypes;

export default React.memo(FormContent);
