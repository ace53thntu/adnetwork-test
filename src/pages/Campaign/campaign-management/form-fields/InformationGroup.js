import {CollapseBox} from 'components/common';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import AdvertiserSelect from './AdvertiserSelect';

const InformationGroup = ({isView, isCreate, currentCampaign, startDate}) => {
  const {t} = useTranslation();
  const {control, errors} = useFormContext();

  return (
    <CollapseBox open title="Information" unMount={false}>
      <Row>
        <Col md="6">
          <AdvertiserSelect
            isRequired
            name={CAMPAIGN_KEYS.ADVERTISER_ID}
            label={t('advertiser')}
            placeholder={t('selectAAdvertiser')}
            disabled={!isCreate}
            defaultValue={currentCampaign?.advertiser_uuid}
          />
        </Col>
        <Col md="6">
          <FormTextInput
            type="text"
            placeholder={t('name')}
            id="campaignName"
            name={CAMPAIGN_KEYS.NAME}
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
              name={CAMPAIGN_KEYS.START_TIME}
              render={({onChange, onBlur, value, name}) => (
                <ReactDatePicker
                  selected={value}
                  onChange={date => onChange(date)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  disabled={isView}
                />
              )}
            />
            {errors && errors[CAMPAIGN_KEYS.START_TIME] ? (
              <div className="invalid-feedback d-block">
                {errors[CAMPAIGN_KEYS.START_TIME].message}
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
              name={CAMPAIGN_KEYS.END_TIME}
              render={({onChange, onBlur, value, name}) => (
                <ReactDatePicker
                  selected={value}
                  onChange={date => onChange(date)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  disabled={isView}
                  minDate={startDate}
                  startDate={startDate}
                  endDate={value}
                  selectsEnd
                />
              )}
            />
            {errors && errors[CAMPAIGN_KEYS.END_TIME] ? (
              <div className="invalid-feedback d-block">
                {errors[CAMPAIGN_KEYS.END_TIME]?.message}
              </div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md="3">
          <Label className="mr-5">Status</Label>
          <Controller
            control={control}
            name={CAMPAIGN_KEYS.STATUS}
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
    </CollapseBox>
  );
};

export default InformationGroup;
