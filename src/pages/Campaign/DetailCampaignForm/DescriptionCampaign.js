//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {useForm, FormProvider, Controller} from 'react-hook-form';
import {Container, Form, Col, Button, Label, FormGroup} from 'reactstrap';
import DatePicker from 'react-datepicker';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';

//---> Internal Modules
import {useCampaignManager} from '../hook';
import './_main.scss';
import {CAMPAIGN_KEYS, CONV_EVENT_OPTIONS} from '../constants';
import {validationCampaign} from './validation';
// import {useCreateCampaign, useUpdateCampaign} from 'core/queries/campaigns';
import {useInitCampaignDefaultValue} from '../hooks/useInitCampaignDefaultValue';
import {useDestrutureAdvertisers} from '../hooks';
import {parseCampaignFormData} from '../utils';
import SelectLabelIds from './SelectLabelIds';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';

const DescriptionCampaign = ({
  goToTab,
  isEdit,
  currentCampaign = {},
  listAdvertisers,
  campaignTree,
  labelsData
}) => {
  const {t} = useTranslation();
  // const {mutateAsync: createCampaign} = useCreateCampaign();
  const createCampaign = useCallback(() => {
    return new Promise(resolve => {
      resolve('ok');
    });
  }, []);
  // const {mutateAsync: updateCampaign} = useUpdateCampaign();
  const updateCampaign = useCallback(() => {
    return new Promise(resolve => {
      resolve('ok');
    });
  }, []);
  const {gotoCampaignManagement} = useCampaignManager();
  const destructureAdvs = useDestrutureAdvertisers({
    advertisers: listAdvertisers
  });
  const {id: campaignId} = useParams();
  //---> Destructure campaign.
  const campaign = useInitCampaignDefaultValue({
    campaign: currentCampaign,
    advertisers: destructureAdvs,
    convEvents: CONV_EVENT_OPTIONS
  });

  const methods = useForm({
    defaultValues: campaign,
    resolver: validationCampaign(t)
  });

  const {handleSubmit, reset, control, errors} = methods;

  const onSubmit = useCallback(
    async formData => {
      const requestBody = parseCampaignFormData(formData);

      if (isEdit) {
        try {
          await updateCampaign({campaignId, data: requestBody});
          ShowToast.success('Updated Campaign successfully!');
          goToTab({nextTab: 'strategies'});
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to update Campaign');
        }
      } else {
        try {
          const {data} = await createCampaign(requestBody);
          console.log(
            '🚀 ~ file: DescriptionCampaign.js ~ line 66 ~ data',
            data
          );
          goToTab({nextTab: 'strategies', campaignIdCreated: data?.id});
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
                <FormReactSelect
                  required
                  name={CAMPAIGN_KEYS.ADVERTISER}
                  label={t('advertiser')}
                  placeholder={t('selectAAdvertiser')}
                  options={destructureAdvs || []}
                  disabled={isEdit}
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
                  name={CAMPAIGN_KEYS.ACTIVE}
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
            {/* Costs */}
            <FormGroup tag="fieldset" row className="border border-gray">
              <legend className="col-form-label col-sm-1 ml-3">Costs</legend>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Cpi')}
                  id="cpi"
                  name={CAMPAIGN_KEYS.CPI}
                  label={t('Cpi')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Cpc')}
                  id="cpc"
                  name={CAMPAIGN_KEYS.CPC}
                  label={t('Cpc')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Cpcc')}
                  id="cpcc"
                  name={CAMPAIGN_KEYS.CPCC}
                  label={t('Cpcc')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Cpvc')}
                  id="cpvc"
                  name={CAMPAIGN_KEYS.CPVC}
                  label={t('Cpvc')}
                  isRequired={true}
                />
              </Col>

              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Cplpc')}
                  id="cplpc"
                  name={CAMPAIGN_KEYS.CPLPC}
                  label={t('Cplpc')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Cplpv')}
                  id="cplpv"
                  name={CAMPAIGN_KEYS.CPLPV}
                  label={t('Cplpv')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Compc')}
                  id="compc"
                  name={CAMPAIGN_KEYS.COMPC}
                  label={t('Compc')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('Compv')}
                  id="compv"
                  name={CAMPAIGN_KEYS.COMPV}
                  label={t('Compv')}
                  isRequired={true}
                />
              </Col>

              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('mediaCost')}
                  id="mediaCost"
                  name={CAMPAIGN_KEYS.MEDIA_COST}
                  label={t('mediaCost')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('trackingCost')}
                  id="trackingCost"
                  name={CAMPAIGN_KEYS.TRACKING_COST}
                  label={t('trackingCost')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormReactSelect
                  name={CAMPAIGN_KEYS.CONV_EVENT_IDS}
                  label="Conv Event IDs"
                  options={CONV_EVENT_OPTIONS}
                  multiple={true}
                  required
                />
              </Col>
              <Col md="3">
                <SelectLabelIds labelsData={labelsData} />
              </Col>
            </FormGroup>
            {/* Budgets */}
            <FormGroup tag="fieldset" row className="border border-gray">
              <legend className="col-form-label col-sm-1 ml-3">Budget</legend>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('budgetGlobal')}
                  id="budgetGlobal"
                  name={`${CAMPAIGN_KEYS.BUGDET}.${CAMPAIGN_KEYS.BUGET_GLOBAL}`}
                  label={t('budgetGlobal')}
                  isRequired={true}
                />
              </Col>
              <Col md="3">
                <FormTextInput
                  type="number"
                  placeholder={t('budgetDaily')}
                  id="budgetDaily"
                  name={`${CAMPAIGN_KEYS.BUGDET}.${CAMPAIGN_KEYS.BUGET_DAILY}`}
                  label={t('budgetDaily')}
                  isRequired={true}
                />
              </Col>
            </FormGroup>
          </Container>
          <div className="d-block text-right mr-15">
            <Button
              onClick={() => {
                reset(campaign);
                gotoCampaignManagement();
              }}
              className="mb-2 mr-2 btn-icon"
              color="secondary"
            >
              <i className="pe-7s-refresh btn-icon-wrapper"> </i>
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="mb-2 mr-2 btn-icon"
              color="success"
            >
              <i className="pe-7s-upload btn-icon-wrapper"> </i>
              {t('save')}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};

export default DescriptionCampaign;
