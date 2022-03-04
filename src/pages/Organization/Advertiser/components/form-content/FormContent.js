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
        />
      </Col>
      {/* Tags */}
      <Col sm={12}>
        <SelectTag defaultValue={defaultValues?.tags || []} disabled={isView} />
      </Col>
      {!isEdit && !isView && (
        <>
          <Col sm="4">
            <FormTextInput
              name={`${INPUT_NAME.BUDGET}.${INPUT_NAME.GLOBAL}`}
              label="Budget global"
              placeholder="0"
            />
          </Col>
          <Col sm="4">
            <FormTextInput
              name={`${INPUT_NAME.BUDGET}.${INPUT_NAME.DAILY}`}
              label="Budget daily"
              placeholder="0"
            />
          </Col>
        </>
      )}
      {/* Status */}
      <Col md="12">
        <Label className="mr-5">{t('status')}</Label>
        <Controller
          control={control}
          name={INPUT_NAME.STATUS}
          render={({onChange, onBlur, value, name}) => (
            <ActiveToggle value={value} onChange={onChange} />
          )}
          disabled={isView}
        />
      </Col>
    </Row>
  );
};

FormContent.propTypes = propTypes;

export default React.memo(FormContent);
