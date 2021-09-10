//---> Build-in Modules
import React, {Fragment, useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import SelectCampaign from '../SelectCampaign';
import SelectStrategyItem from '../SelectStrategyItem';
// import {useGetFamilies} from 'core/queries/family/useGetFamilies';
import {usePositionOptions} from '../../hooks';
import {FormTextInput} from 'components/forms';

const InformationGroup = ({
  listCampaignOptions,
  viewOnly,
  currentStrategy,
  isEdit
}) => {
  const {t} = useTranslation();
  const {errors, control} = useFormContext();

  const positions = usePositionOptions();
  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      {/* Information */}
      <FormGroup tag="fieldset" row className={'border border-gray'}>
        <legend
          className="col-form-label col-sm-2 ml-3 w-130px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />
          Information
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              <SelectCampaign
                t={t}
                listCampaignOptions={listCampaignOptions}
                viewOnly={viewOnly}
                currentStrategy={currentStrategy}
                isEdit={isEdit}
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
                disabled={viewOnly}
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
                viewOnly={viewOnly}
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
      </FormGroup>
    </>
  );
};

export default InformationGroup;
