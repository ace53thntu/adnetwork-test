import React from 'react';

import {Row, Col, Label} from 'reactstrap';
import {Collapse} from 'components/common';
import {ActiveToggle, FormReactSelect, FormTextInput} from 'components/forms';
import {InputNames, TrackerTemplateTypeOptions} from '../constant';
import {useTranslation} from 'react-i18next';
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';
import {Controller, useFormContext} from 'react-hook-form';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import FormCodeMirror from 'components/forms/FormCodeMirror';

const BasicInfo = ({children}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();

  return (
    <Collapse initialOpen title="Basic info">
      <Row>
        {/* Name */}
        <Col sm={6}>
          <FormTextInput
            name={InputNames.NAME}
            label={t('name')}
            placeholder={t('enterName')}
            isRequired
          />
        </Col>
        {/* Status */}
        <Col sm="3">
          <Label className="mr-5">
            <RequiredLabelPrefix>*</RequiredLabelPrefix>
            {t('status')}
          </Label>
          <Controller
            control={control}
            name={InputNames.STATUS}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToggle value={value} onChange={onChange} />
            )}
          />
        </Col>

        {/* HTTPS */}
        <Col sm="3">
          <Label className="mr-5">{t('https')}</Label>
          <Controller
            control={control}
            name={InputNames.HTTPS}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToggle value={value} onChange={onChange} />
            )}
          />
        </Col>
        {/* Type */}
        <Col sm={6}>
          <FormReactSelect
            defaultValue={null}
            name={InputNames.TYPE}
            label={t('type')}
            placeholder={t('selectType')}
            options={TrackerTemplateTypeOptions}
            required
          />
        </Col>

        {/* Price */}
        <Col sm={6}>
          <CurrencyInputField
            name={InputNames.PRICE}
            label={t('price')}
            placeholder="0.00"
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            required
          />
        </Col>
        <Col sm={12} className="mt-2">
          <FormCodeMirror
            name={InputNames.VARIABLES}
            label={t('variables')}
            extension="JSON"
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default BasicInfo;
