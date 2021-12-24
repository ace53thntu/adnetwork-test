//---> Build-in Modules
import React, {useCallback, useEffect} from 'react';

//---> External Modules
import {useForm, FormProvider, Controller} from 'react-hook-form';
import {Container, Form, Col, Button, Label, FormGroup} from 'reactstrap';
import DatePicker from 'react-datepicker';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import PropTypes from 'prop-types';

//---> Internal Modules
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ActiveToogle, FormTextInput} from 'components/forms';
import {useCreateCampaign, useEditCampaign} from 'queries/campaign';
import {CAMPAIGN_KEYS} from '../constants';
import {validationCampaign} from './validation';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import AdvertiserSelect from './form-fields/AdvertiserSelect';
import {formToApi} from 'entities/Campaign';

const propTypes = {
  goToTab: PropTypes.func,
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool,
  isView: PropTypes.bool,
  currentCampaign: PropTypes.any
};

const CampaignForm = ({
  goToTab = () => null,
  isEdit = false,
  isCreate = false,
  isView = false,
  currentCampaign = null
}) => {
  const {t} = useTranslation();
  const {mutateAsync: createCampaign} = useCreateCampaign();
  const {mutateAsync: updateCampaign} = useEditCampaign();

  const {campaignId} = useParams();

  const methods = useForm({
    defaultValues: currentCampaign,
    resolver: validationCampaign(t)
  });

  const {handleSubmit, reset, control, errors} = methods;

  useEffect(() => {
    if (isView || isEdit) {
      reset(currentCampaign);
    }
  }, [currentCampaign, isEdit, isView, reset]);

  const onSubmit = useCallback(
    async formData => {
      const requestBody = formToApi(formData);

      if (isEdit) {
        try {
          await updateCampaign({campId: campaignId, data: requestBody});
          ShowToast.success('Updated Campaign successfully!');
          goToTab({nextTab: 'strategies'});
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to update Campaign');
        }
      } else {
        try {
          const {data} = await createCampaign(requestBody);
          goToTab({nextTab: 'strategies', campaignIdCreated: data?.uuid});
          ShowToast.success('Created Campaign successfully!');
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to create Campaign');
        }
      }
    },
    [campaignId, createCampaign, goToTab, isEdit, updateCampaign]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Container fluid>
            {/* Information */}
            <FormGroup tag="fieldset" row className="border border-gray">
              <legend className="col-form-label col-sm-2 ml-3 w-120px">
                Information
              </legend>
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
                  id="campainName"
                  name={CAMPAIGN_KEYS.NAME}
                  label={t('name')}
                  isRequired={true}
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
                      <DatePicker
                        selected={value}
                        onChange={date => onChange(date)}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
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
                      <DatePicker
                        selected={value}
                        onChange={date => onChange(date)}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
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
            </FormGroup>
            {/* Status */}
            <FormGroup tag="fieldset" row className="border border-gray">
              <legend className="col-form-label col-sm-1 ml-3">Status</legend>
              <Col md="3">
                <Label className="mr-5">Status</Label>
                <Controller
                  control={control}
                  name={CAMPAIGN_KEYS.STATUS}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToogle value={value} onChange={onChange} />
                  )}
                />
              </Col>
              <Col md="3">
                <Label className="mr-5">Check Visit</Label>
                <Controller
                  control={control}
                  name={CAMPAIGN_KEYS.CHECK_VISIT}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToogle value={value} onChange={onChange} />
                  )}
                />
              </Col>
              <Col md="3">
                <Label className="mr-5">Auto Realloc</Label>
                <Controller
                  control={control}
                  name={CAMPAIGN_KEYS.AUTO_REALLOC}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToogle value={value} onChange={onChange} />
                  )}
                />
              </Col>
            </FormGroup>
          </Container>
          <div className="d-block text-right mr-15">
            {isEdit || isCreate ? (
              <>
                <Link to={`/${RoutePaths.CAMPAIGN}`}>
                  <Button className="mb-2 mr-2 btn-icon" color="link">
                    {t('cancel')}
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="mb-2 mr-2 btn-icon"
                  color="primary"
                >
                  <i className="pe-7s-upload btn-icon-wrapper"> </i>
                  {t('save')}
                </Button>
              </>
            ) : null}
            {isView && (
              <Link
                to={`/${RoutePaths.CAMPAIGN}/${currentCampaign?.uuid}/${RoutePaths.EDIT}?advertiser_id=${currentCampaign?.advertiser_uuid?.value}`}
              >
                <Button className="mb-2 mr-2 btn-icon" color="link">
                  {t('goToEdit')}
                </Button>
              </Link>
            )}
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};

CampaignForm.propTypes = propTypes;

export default CampaignForm;
