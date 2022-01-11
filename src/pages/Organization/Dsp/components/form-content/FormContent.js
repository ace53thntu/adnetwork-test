import {ActiveToogle, FormTextInput} from 'components/forms';
import DomainSelect from 'pages/Organization/components/domain-select';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Label, Row} from 'reactstrap';
import {INPUT_NAME} from '../../constants';

const FormContent = ({defaultValues = {}, isView = false}) => {
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
          label={t('url')}
          placeholder={t('enterUrl')}
          isRequired
          disabled={isView}
        />
      </Col>
      {/* Domains */}
      <Col sm={12}>
        <DomainSelect
          defaultValue={defaultValues?.domain}
          name={INPUT_NAME.DOMAIN}
          label={t('domain')}
          placeholder={t('selectDomain')}
          disabled={isView}
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
      {/* Status */}
      <Col md="12">
        <Label className="mr-5">{t('status')}</Label>
        <Controller
          control={control}
          name={INPUT_NAME.STATUS}
          render={({onChange, onBlur, value, name}) => (
            <ActiveToogle value={value} onChange={onChange} disabled={isView} />
          )}
        />
      </Col>
    </Row>
  );
};

export default React.memo(FormContent);
