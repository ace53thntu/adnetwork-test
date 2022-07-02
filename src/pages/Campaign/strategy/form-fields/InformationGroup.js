//---> Build-in Modules
import React, {Fragment} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

//---> Internal Modules
import {ActiveToggle, FormReactSelect, FormTextInput} from 'components/forms';
import CampaignSelect from './CampaignSelect';
import {Collapse} from 'components/common/Collapse';
import {
  PricingModelOptions,
  PriorityOptions,
  StrategyTypes,
  STRATEGY_TYPES
} from 'pages/Campaign/constants';
import {USER_ROLE} from 'pages/user-management/constants';

const propTypes = {
  currentStrategy: PropTypes.object,
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  role: PropTypes.string
};

const InformationGroup = ({
  currentStrategy = {},
  isEdit = false,
  isView = false,
  role = ''
}) => {
  const {t} = useTranslation();
  const {errors, control, setValue} = useFormContext();
  const startDate = useWatch({name: 'start_time', control});
  const strategyType = useWatch({name: 'strategy_type', control});

  // Handle pricing model by strategy type
  React.useEffect(() => {
    if (strategyType?.value === StrategyTypes.PREMIUM) {
      setValue(
        'pricing_model',
        PricingModelOptions.find(item => item.value === 'cpd')
      );
    } else {
      setValue(
        'pricing_model',
        PricingModelOptions.find(item => item.value === 'cpm')
      );
    }
  }, [setValue, strategyType?.value]);

  return (
    <>
      {/* Information */}
      <Collapse initialOpen title="Information" unMount={false}>
        <Row>
          <Col md="4">
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

          <Col md="4">
            <FormGroup>
              <Label for="startDate">
                <span className="text-danger">*</span>
                {t('startDate')}
              </Label>
              <Controller
                control={control}
                name="start_time"
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
              {errors && errors['start_time'] ? (
                <div className="invalid-feedback d-block">
                  {errors['start_time'].message}
                </div>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="endDate">
                <span className="text-danger">*</span>
                End date
              </Label>
              <Controller
                control={control}
                name="end_time"
                render={({onChange, onBlur, value, name}) => (
                  <DatePicker
                    selected={value}
                    onChange={date => onChange(date)}
                    className="form-control"
                    dateFormat="dd/MM/yyy"
                    placeholderText="dd/mm/yyyy"
                    disabled={isView}
                    minDate={startDate}
                    startDate={startDate}
                    endDate={value}
                    selectsEnd
                  />
                )}
              />
              {errors && errors['end_time'] ? (
                <div className="invalid-feedback d-block">
                  {errors['end_time']?.message}
                </div>
              ) : null}
            </FormGroup>
          </Col>

          <Col md="4">
            <FormTextInput
              name="click_commission"
              label={t('clickCommission')}
              placeholder="0.0"
              disabled={
                isView || ![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)
              }
            />
          </Col>
          <Col md="4">
            <FormReactSelect
              disabled={isView}
              defaultValue={currentStrategy?.priority}
              options={PriorityOptions}
              name="priority"
              label="Priority"
              placeholder="Priority"
            />
          </Col>

          <Col md="4">
            <CampaignSelect
              name="campaign_uuid"
              label={t('campaign')}
              placeholder={t('selectCampaign')}
              defaultValue={currentStrategy?.campaign_uuid || null}
              disabled
            />
          </Col>

          <Col md="4">
            <FormReactSelect
              disabled={isView || isEdit}
              defaultValue={currentStrategy?.strategy_type}
              options={STRATEGY_TYPES}
              name="strategy_type"
              label={t('type')}
              placeholder={t('selectType')}
              required
            />
          </Col>

          <Col md="4">
            <FormReactSelect
              name="pricing_model"
              placeholder="Pricing model"
              label="Pricing model"
              options={PricingModelOptions}
              disabled={isView || strategyType?.value === StrategyTypes.PREMIUM}
            />
          </Col>

          <Col md="3">
            <Label className="mr-5">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({onChange, onBlur, value, name}) => (
                <ActiveToggle
                  value={value}
                  onChange={onChange}
                  disabled={isView}
                />
              )}
            />
          </Col>
        </Row>
      </Collapse>
    </>
  );
};

InformationGroup.propTypes = propTypes;

export default InformationGroup;
