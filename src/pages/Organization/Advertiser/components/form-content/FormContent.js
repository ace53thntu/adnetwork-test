// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Label, Row} from 'reactstrap';

// Internal Modules
import {ActiveToggle, FormReactSelect, FormTextInput} from 'components/forms';
import {INPUT_NAME} from '../../constants';
import DomainSelect from '../DomainSelect';
import SelectTag from '../SelectTag';
import BudgetGroup from './BudgetGroup';
import ImpressionGroup from './ImpressionGroup';
import DomainGroup from './DomainGroup';
import KeywordGroup from './KeywordGroup';

const propTypes = {
  defaultValues: PropTypes.object,
  isView: PropTypes.bool,
  isEdit: PropTypes.bool
};

const FormContent = ({
  defaultValues = {},
  isView = false,
  isEdit = false,
  IABsOptions = []
}) => {
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
      {/* IABs */}
      <Col sm={12}>
        <FormReactSelect
          name={INPUT_NAME.IABS}
          label={t('iabs')}
          placeholder={t('selectIABs')}
          options={IABsOptions}
          defaultValue={null}
          multiple
          disabled={isView}
        />
      </Col>

      {/* Domains */}
      <Col sm={12}>
        <DomainSelect
          defaultValue={defaultValues?.tags || []}
          disabled={isView}
          isRequired
        />
      </Col>
      {/* Tags */}
      <Col sm={12}>
        <SelectTag defaultValue={defaultValues?.tags || []} disabled={isView} />
      </Col>
      {/* Status */}
      <Col md="12">
        <Label className="mr-5">{t('status')}</Label>
        <Controller
          control={control}
          name={INPUT_NAME.STATUS}
          render={({onChange, onBlur, value, name}) => (
            <ActiveToggle value={value} onChange={onChange} disabled={isView} />
          )}
        />
      </Col>
      {!isEdit && !isView && (
        <>
          <Col sm="12">
            <BudgetGroup />
          </Col>
          <Col sm="12">
            <ImpressionGroup />
          </Col>
          <Col sm="12">
            <DomainGroup />
          </Col>
          <Col sm="12">
            <KeywordGroup />
          </Col>
        </>
      )}
    </Row>
  );
};

FormContent.propTypes = propTypes;

export default FormContent;
