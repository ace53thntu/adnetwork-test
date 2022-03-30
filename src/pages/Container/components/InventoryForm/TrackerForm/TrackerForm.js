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

export default function TrackerForm() {
  const {t} = useTranslation();

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
