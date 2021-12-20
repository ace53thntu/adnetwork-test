//---> Build-in Modules
import React, {Fragment} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import SelectStrategyItem from '../../components/SelectStrategyItem';
import {FormTextInput} from 'components/forms';
import CampaignSelect from './CampaignSelect';
import {Collapse} from 'components/common/Collapse';

const InformationGroup = ({currentStrategy, isEdit, isView, positions}) => {
  const {t} = useTranslation();
  const {errors, control} = useFormContext();

  return (
    <>
      {/* Information */}
      <Collapse initialOpen={true} title="Information" unMount={false}>
        <Col sm={12}>
          <Row>
            <Col md="6">
              <CampaignSelect
                name="campaign_uuid"
                label={t('campaign')}
                placeholder={t('selectCampaign')}
                defaultValue={currentStrategy?.campaign_uuid || null}
                disabled={isEdit || isView}
              />
            </Col>

            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={t('strategyName')}
                id="name"
                name="name"
                label={t('name')}
                isRequired={true}
                disabled={isView}
              />
            </Col>

            <Col xs="6">
              <FormGroup>
                <Label for="startDate">
                  <span className="text-danger">*</span>
                  {t('startDate')}
                </Label>
                <Controller
                  control={control}
                  name="start_at"
                  render={({onChange, onBlur, value, name}) => (
                    <DatePicker
                      selected={value}
                      onChange={date => onChange(date)}
                      className="form-control"
                      dateFormat="dd/MM/yyy"
                      placeholderText="dd/mm/yyyy"
                    />
                  )}
                />
                {errors && errors['start_at'] ? (
                  <div className="invalid-feedback d-block">
                    {errors['start_at'].message}
                  </div>
                ) : null}
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="endDate">
                  <span className="text-danger">*</span>
                  End date
                </Label>
                <Controller
                  control={control}
                  name="end_at"
                  render={({onChange, onBlur, value, name}) => (
                    <DatePicker
                      selected={value}
                      onChange={date => onChange(date)}
                      className="form-control"
                      dateFormat="dd/MM/yyy"
                      placeholderText="dd/mm/yyyy"
                    />
                  )}
                />
                {errors && errors['end_at'] ? (
                  <div className="invalid-feedback d-block">
                    {errors['end_at']?.message}
                  </div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="4">
              <SelectStrategyItem
                viewOnly={isView}
                listOptions={positions}
                currentStrategy={currentStrategy}
                name="position_ids"
                label={t('position')}
                placeholder={t('position')}
                isMulti={true}
              />
            </Col>
            <Col md="4">
              <FormTextInput
                type="text"
                placeholder="0"
                id="skip_delay"
                name="skip_delay"
                label="Skip Delay"
                isRequired={false}
              />
            </Col>
            <Col md="4">
              <FormTextInput
                type="text"
                placeholder="0"
                id="cpm"
                name="cpm"
                label="Cpm"
                isRequired={false}
              />
            </Col>
          </Row>
        </Col>
      </Collapse>
    </>
  );
};

export default InformationGroup;
