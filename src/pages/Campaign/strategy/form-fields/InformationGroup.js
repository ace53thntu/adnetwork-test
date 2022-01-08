//---> Build-in Modules
import React, {Fragment} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

//---> Internal Modules
import SelectStrategyItem from '../../components/SelectStrategyItem';
import {FormReactSelect, FormTextInput} from 'components/forms';
import CampaignSelect from './CampaignSelect';
import {Collapse} from 'components/common/Collapse';
import {STRATEGY_TYPES} from 'pages/Campaign/constants';

const propTypes = {
  currentStrategy: PropTypes.object,
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  positions: PropTypes.array
};

const InformationGroup = ({
  currentStrategy = {},
  isEdit = false,
  isView,
  positions = []
}) => {
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
                      disabled={isView}
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
                      disabled={isView}
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
            <Col md="6">
              <FormReactSelect
                disabled={isView}
                defaultValue={currentStrategy?.strategy_type}
                options={STRATEGY_TYPES}
                name="strategy_type"
                label={t('type')}
                placeholder={t('selectType')}
                required
              />
            </Col>
            <Col md="6">
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
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder="0"
                id="skip_delay"
                name="skip_delay"
                label="Skip Delay"
                isRequired={false}
                disabled={isView}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder="0"
                id="cpm"
                name="cpm"
                label="Cpm"
                isRequired={false}
                disabled={isView}
              />
            </Col>
          </Row>
        </Col>
      </Collapse>
    </>
  );
};

InformationGroup.propTypes = propTypes;

export default InformationGroup;
