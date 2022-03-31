//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import {TrackerInputName} from '../constant';
import TemplateSelect from './TemplateSelect';
import {Collapse} from 'components/common';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import ErrorMessage from 'components/forms/ErrorMessage';
import {useFormContext} from 'react-hook-form';

export default function TrackerForm() {
  const {t} = useTranslation();
  const {errors} = useFormContext();

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
          {errors?.tracker?.template_uuid && (
            <ErrorMessage message={errors?.tracker?.template_uuid?.message} />
          )}
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
