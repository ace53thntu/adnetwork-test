//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Label, Row} from 'reactstrap';

//---> Internal Modules
import {TrackerInputName} from '../constant';
import TemplateSelect from './TemplateSelect';
import {Collapse} from 'components/common';
import {ActiveToggle} from 'components/forms';
import FormCodeMirror from 'components/forms/FormCodeMirror';

export default function TrackerForm() {
  const {t} = useTranslation();
  const {control} = useFormContext();

  return (
    <Collapse initialOpen title={t('tracker')}>
      <Row>
        {/* Tracker Template */}
        <Col sm="6">
          <TemplateSelect
            name={TrackerInputName.TEMPLATE_UUID}
            label={t('template')}
            placeholder={t('selectTemplate')}
            defaultValue={null}
          />
        </Col>

        {/* Status */}
        <Col sm="6">
          <Label className="mr-5">{t('status')}</Label>
          <Controller
            control={control}
            name={TrackerInputName.STATUS}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToggle value={value} onChange={onChange} />
            )}
          />
        </Col>

        {/* Variables */}
        <Col sm={12}>
          <FormCodeMirror
            name={TrackerInputName.VARIABLES}
            label={t('variables')}
            placeholder={`{"key": "value"}`}
            extension="JSON"
          />
        </Col>
      </Row>
    </Collapse>
  );
}
