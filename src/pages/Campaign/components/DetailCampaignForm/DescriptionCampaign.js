//---> Build-in Modules
import React, {useCallback, useEffect} from 'react';

//---> External Modules
import {useForm, FormProvider, Controller} from 'react-hook-form';
import {Container, Form, Col, Button, Label, FormGroup} from 'reactstrap';
import DatePicker from 'react-datepicker';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';

//---> Internal Modules
import './_main.scss';
import {CAMPAIGN_KEYS, CONV_EVENT_OPTIONS} from '../../constants';
import {validationCampaign} from './validation';
import {useInitCampaignDefaultValue} from '../../hooks/useInitCampaignDefaultValue';
import {useCampaignManager, useDestrutureAdvertisers} from '../../hooks';
import {parseCampaignFormData} from '../../utils';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';
import {useGetAdvertisers} from 'queries/advertiser';
import {useCreateCampaign, useEditCampaign} from 'queries/campaign';

const DescriptionCampaign = ({
  goToTab,
  isEdit,
  currentCampaign = {},
  listAdvertisers,
  campaignTree,
  labelsData
}) => {
  const {t} = useTranslation();
  const {data: advertisers} = useGetAdvertisers({enabled: true});
  const {mutateAsync: createCampaign} = useCreateCampaign();
  const {mutateAsync: updateCampaign} = useEditCampaign();

  const {gotoCampaignManagement} = useCampaignManager();
  const destructureAdvs = useDestrutureAdvertisers({
    advertisers: advertisers?.items || []
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

  useEffect(() => {
    reset(campaign);
  }, [campaign, reset]);

  const onSubmit = useCallback(
    async formData => {
      console.log(
        '🚀 ~ file: DescriptionCampaign.js ~ line 66 ~ formData',
        formData
      );
      const requestBody = parseCampaignFormData(formData);
      console.log(
        '🚀 ~ file: DescriptionCampaign.js ~ line 59 ~ requestBody',
        requestBody
      );
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
          console.log(
            '🚀 ~ file: DescriptionCampaign.js ~ line 66 ~ data',
            data
          );
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
                <FormReactSelect
                  required
                  name={CAMPAIGN_KEYS.ADVERTISER}
                  label={t('advertiser')}
                  placeholder={t('selectAAdvertiser')}
                  options={destructureAdvs || []}
                  disabled={isEdit}
                  defaultValue={campaign?.advertiser}
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
