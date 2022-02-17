//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {useForm, FormProvider, Controller, useWatch} from 'react-hook-form';
import {Container, Form, Col, Button, Label, FormGroup, Row} from 'reactstrap';
import DatePicker from 'react-datepicker';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

//---> Internal Modules
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {useCreateCampaign, useEditCampaign} from 'queries/campaign';
import {CAMPAIGN_KEYS} from '../constants';
import {validationCampaign} from './validation';
import {Link} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import AdvertiserSelect from './form-fields/AdvertiserSelect';
import {formToApi} from 'entities/Campaign';
import {Collapse} from 'components/common';
import KeywordListSelect from 'components/forms/KeywordListSelect';
import DomainGroupSelect from 'components/forms/DomainGroupSelect';

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
  const navigate = useNavigate();
  const {mutateAsync: createCampaign} = useCreateCampaign();
  const {mutateAsync: updateCampaign} = useEditCampaign(currentCampaign?.uuid);

  const {campaignId} = useParams();

  const methods = useForm({
    defaultValues: currentCampaign,
    resolver: validationCampaign(t, isEdit)
  });

  const {handleSubmit, control, errors} = methods;
  console.log('🚀 ~ file: form.js ~ line 55 ~ errors', errors);
  const startDate = useWatch({name: 'start_time', control});

  const onSubmit = useCallback(
    async formData => {
      const requestBody = formToApi(formData);

      if (isEdit) {
        try {
          const {data} = await updateCampaign({
            campId: campaignId,
            data: requestBody
          });
          // reset();
          ShowToast.success('Updated Campaign successfully!');
          navigate(
            `/${RoutePaths.CAMPAIGN}/${data?.uuid}/${RoutePaths.EDIT}?next_tab=strategies&advertiser_id=${data?.advertiser_uuid}`
          );
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to update Campaign');
        }
      } else {
        try {
          const {data} = await createCampaign(requestBody);
          navigate(
            `/${RoutePaths.CAMPAIGN}/${data?.uuid}/${RoutePaths.EDIT}?next_tab=strategies&advertiser_id=${data?.advertiser_uuid}`
          );

          ShowToast.success('Created Campaign successfully!');
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to create Campaign');
        }
      }
    },
    [campaignId, createCampaign, isEdit, navigate, updateCampaign]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Container fluid>
            {/* Information */}
            <Collapse initialOpen={true} title="Information" unMount={false}>
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
                        <DatePicker
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
                        <DatePicker
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
            </Collapse>

            {isCreate && (
              <>
                {/* Budget */}
                <Collapse
                  initialOpen={true}
                  title={t('budget')}
                  unMount={false}
                >
                  <Row>
                    <Col md="4">
                      <FormTextInput
                        placeholder={t('global')}
                        name="budget.global"
                        label={t('global')}
                        isRequired
                      />
                    </Col>
                    <Col md="4">
                      <FormTextInput
                        placeholder={t('daily')}
                        name="budget.daily"
                        label={t('daily')}
                        isRequired
                      />
                    </Col>
                  </Row>
                </Collapse>

                {/* Impression */}
                <Collapse
                  initialOpen={true}
                  title={t('impression')}
                  unMount={false}
                >
                  <Row>
                    <Col md="4">
                      <FormTextInput
                        placeholder={t('global')}
                        name="impression.global"
                        label={t('global')}
                        isRequired
                      />
                    </Col>
                    <Col md="4">
                      <FormTextInput
                        placeholder={t('daily')}
                        name="impression.daily"
                        label={t('daily')}
                        isRequired
                      />
                    </Col>
                  </Row>
                </Collapse>

                {/* Domain */}
                <Collapse
                  initialOpen={true}
                  title={t('domain')}
                  unMount={false}
                >
                  <Row>
                    <Col md="6">
                      <DomainGroupSelect
                        name={CAMPAIGN_KEYS.DOMAIN_GROUP_WHITE}
                        label={t('domainGroupWhite')}
                        placeholder={t('selectDomainGroupWhite')}
                        defaultValues={[]}
                        multiple
                      />
                    </Col>
                    <Col md="6">
                      <DomainGroupSelect
                        name={CAMPAIGN_KEYS.DOMAIN_GROUP_BLACK}
                        label={t('domainGroupBlack')}
                        placeholder={t('selectDomainGroupBlack')}
                        defaultValues={[]}
                        multiple
                      />
                    </Col>
                  </Row>
                </Collapse>

                {/* Keyword */}
                <Collapse
                  initialOpen={true}
                  title={t('keyword')}
                  unMount={false}
                >
                  <Row>
                    <Col md="6">
                      <KeywordListSelect
                        name={CAMPAIGN_KEYS.KEYWORD_LIST_WHITE}
                        label={t('keywordListWhite')}
                        placeholder={t('selectKeywordListWhite')}
                        defaultValues={[]}
                        multiple
                      />
                    </Col>
                    <Col md="6">
                      <KeywordListSelect
                        name={CAMPAIGN_KEYS.KEYWORD_LIST_BLACK}
                        label={t('keywordListBlack')}
                        placeholder={t('selectKeywordListBlack')}
                        defaultValues={[]}
                        multiple
                      />
                    </Col>
                  </Row>
                </Collapse>
              </>
            )}
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
