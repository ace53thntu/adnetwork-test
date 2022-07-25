import {AlternativeAPI} from 'api/alternative.api';
import {ApiError, BlockOverlay, CollapseBox} from 'components/common';
import {
  FormCheckbox,
  FormReactSelect,
  FormTagsInput,
  FormTextInput
} from 'components/forms';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import {EntityTypes, REPORT_VIEW_TYPES} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import PropTypes from 'prop-types';
import {useCreateCreative, useUpdateCreative} from 'queries/creative';
import {GET_CREATIVES} from 'queries/creative/constants';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button, Col, FormGroup, Row} from 'reactstrap';
import {useCommonSelector} from 'store/reducers/common';
import {
  dirtyForm,
  toggleCreateCreativeDialog,
  toggleCreativeDetailDialog
} from 'store/reducers/creative';
import {difference} from 'utils/helpers/difference.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {AdvertiserAPIRequest} from 'api/advertiser.api';

import Box from '@material-ui/core/Box';

import {Alternatives} from '../Alternatives';
import Report from '../Report';
import {Trackers} from '../Trackers';
import {
  AD_SIZE_FORMAT_OPTIONS,
  ALTERNATIVE_PLAY_OPTIONS,
  CREATIVE_FILE_TYPES,
  CREATIVE_TYPES,
  PLATFORM_OPTIONS,
  THIRD_PARTY_TAG_TYPES
} from './constants';
import {
  alternativeFormValuesToRepo,
  alternativeRepoToModel,
  creativeModelToRepo,
  creativeRepoToModel
} from './dto';
import {useCalculateAdSize, useWatchCreativeType} from './hooks';
import {bannerFormValidationResolver} from './utils';
import {DEFAULT_TIMEZONE, STATUS_OPTIONS} from 'constants/misc';
import {
  CREATIVE_BANNER_TYPES,
  CREATIVE_INTERACTIVE_PLAY_TYPES,
  CREATIVE_PLAY_TYPES
} from 'pages/Creative/constants';
import {useCreateReport} from 'queries/report';
import {getDefaultMetric1, getDefaultReport} from 'utils/metrics';

const defaultFormValues = {
  third_party_tag: '',
  third_party_tag_type: THIRD_PARTY_TAG_TYPES[0],
  // extra_trackers: '',

  type: CREATIVE_TYPES[1], // third_party, first_party
  tags: [],

  click_url: '',
  https: false,
  sound: false,
  multiproduct: false,
  name: '',
  width: '',
  height: '',
  platform: PLATFORM_OPTIONS[0],
  alternative_play: ALTERNATIVE_PLAY_OPTIONS[0],
  creative_metadata: '',
  ad_size_format: null,

  file_type: CREATIVE_FILE_TYPES[0],

  status: STATUS_OPTIONS[0],

  creative_type: CREATIVE_BANNER_TYPES[0],
  creative_play_type: CREATIVE_PLAY_TYPES[0],
  play_type: ''

  // alternatives: []
};

function BannerForm(props) {
  const {isCreate, creative} = props;
  const {isUploading} = useCommonSelector();

  const client = useQueryClient();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {conceptId} = useParams();
  const {mutateAsync: createCreativeRequest} = useCreateCreative();
  const {mutateAsync: updateCreativeRequest} = useUpdateCreative();
  const {mutateAsync: createReport} = useCreateReport({});

  const params = React.useMemo(() => {
    return {
      concept_uuid: conceptId,
      status: 'active',
      sort_by: 'updated_at',
      sort: 'desc'
    };
  }, [conceptId]);

  const defaultValues = React.useMemo(() => {
    if (!isCreate) {
      return creativeRepoToModel(creative);
    }

    return defaultFormValues;
  }, [creative, isCreate]);

  const methods = useForm({
    defaultValues,
    resolver: bannerFormValidationResolver(),
    reValidateMode: 'onChange',
    mode: 'onChange'
  });
  const {
    handleSubmit,
    formState: {isDirty},
    watch,
    setValue
  } = methods;
  const watchFileType = watch('creative_type');

  React.useEffect(() => {
    dispatch(dirtyForm(isDirty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  React.useEffect(() => {
    if (watchFileType?.value === CREATIVE_BANNER_TYPES[1].value) {
      if (
        isCreate ||
        defaultValues.creative_type.value !== watchFileType?.value
      ) {
        setValue('creative_play_type', CREATIVE_INTERACTIVE_PLAY_TYPES[0]);
      } else {
        setValue('creative_play_type', defaultValues.creative_play_type);
      }
    } else {
      if (
        isCreate ||
        defaultValues.creative_type.value !== watchFileType?.value
      ) {
        setValue('creative_play_type', CREATIVE_PLAY_TYPES[0]);
      } else {
        setValue('creative_play_type', defaultValues.creative_play_type);
      }
    }
  }, [
    defaultValues.creative_play_type,
    defaultValues.creative_type.value,
    isCreate,
    setValue,
    watchFileType
  ]);

  const [isLoading, setIsLoading] = React.useState(false);

  useCalculateAdSize({
    watch,
    setValue
  });

  const isThirdPartyType = useWatchCreativeType({watch});

  const onSubmit = async values => {
    const bodyRequest = creativeModelToRepo(values, conceptId);

    setIsLoading(true);

    if (isCreate) {
      try {
        const res = await createCreativeRequest(bodyRequest);

        if (values?.alternatives?.length) {
          const createdId = res?.data?.uuid;
          if (createdId) {
            const alternatives = values.alternatives;

            const alternativeData = alternatives.map(item => {
              return alternativeFormValuesToRepo(item, createdId);
            });

            let promises = [];

            alternativeData.forEach(item => {
              promises.push(
                AlternativeAPI.createAlternative({data: item, options: {}})
              );
            });

            try {
              await Promise.all(promises);
            } catch (error) {
              ShowToast.error(<ApiError apiError={error} />);
            }
          }
        }

        setIsLoading(false);
        ShowToast.success('Create Banner successfully!');
        await client.invalidateQueries([GET_CREATIVES]);
        const {data: advertiserData} = await AdvertiserAPIRequest.getAdvertiser(
          {
            id: res?.data?.advertiser_uuid
          }
        );
        // Create default report
        const reportCreative1SubmitData = getDefaultReport({
          parentPath: advertiserData?.name,
          sourceUuid: res?.data?.uuid,
          reportSource: EntityTypes.CREATIVE,
          timeZone: DEFAULT_TIMEZONE,
          campaignName: res?.data?.name,
          metricSets: getDefaultMetric1({
            metricTextType: 'creative',
            metricTypeOptions: REPORT_VIEW_TYPES
          })
        });

        createReport(reportCreative1SubmitData);

        handleCloseDialog();
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(<ApiError apiError={error} />);
      } finally {
      }
    } else {
      const alternatives = values?.alternatives;

      if (alternatives?.length) {
        let promises = [];
        const creativeId = creative.uuid;

        // new alternatives
        const newAlts = alternatives.filter(alt => !alt?.rawId?.length);
        newAlts.forEach(item => {
          const requestData = alternativeFormValuesToRepo(item, creativeId);
          promises.push(
            AlternativeAPI.createAlternative({data: requestData, options: {}})
          );
        });

        // update alternatives
        const updateAlts = alternatives.filter(alt => alt?.rawId?.length);
        const rawAlts = creative.alternatives;

        updateAlts.forEach(item => {
          const rawData = rawAlts.find(raw => raw.uuid === item.rawId);
          if (rawData) {
            const converted = alternativeRepoToModel(rawData);
            const diff = difference(item, {
              ...converted,
              rawId: rawData.uuid
            });

            if (Object.keys(diff).length) {
              const requestData = alternativeFormValuesToRepo(item, creativeId);
              promises.push(
                AlternativeAPI.updateAlternative({
                  alternativeId: item.rawId,
                  data: requestData,
                  options: {}
                })
              );
            }
          }
        });

        await Promise.all(promises);
      }

      try {
        await updateCreativeRequest({
          creativeId: creative.uuid,
          updatedData: bodyRequest
        });

        setIsLoading(false);
        ShowToast.success('Update Banner successfully!');
        client.invalidateQueries([GET_CREATIVES, params]);
        handleCloseDialog();
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(<ApiError apiError={error} />);
      }
    }
  };

  const handleCloseDialog = () => {
    if (isCreate) {
      dispatch(toggleCreateCreativeDialog());
    } else {
      dispatch(toggleCreativeDetailDialog(null));
    }
  };

  const generateCreativePlayType = () => {
    if (watchFileType?.value === CREATIVE_BANNER_TYPES[1].value) {
      return (
        <FormReactSelect
          options={CREATIVE_INTERACTIVE_PLAY_TYPES}
          placeholder=""
          name="creative_play_type"
          label="Play type"
          defaultValue={defaultValues.creative_play_type}
        />
      );
    } else {
      return (
        <FormReactSelect
          options={CREATIVE_PLAY_TYPES}
          placeholder=""
          name="creative_play_type"
          label="Play type"
          defaultValue={defaultValues.creative_play_type}
        />
      );
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="banner-form"
          name="banner-form"
        >
          {isLoading && <BlockOverlay />}
          <Box>
            <CollapseBox open title="Information">
              <Row>
                <Col md="4">
                  <FormTextInput
                    isRequired
                    placeholder=""
                    name="name"
                    label="Name"
                    defaultValue={defaultValues?.name}
                  />
                </Col>
                <Col md="4">
                  <FormTagsInput
                    name="tags"
                    label="Tags"
                    placeholder="Enter tags..."
                    defaultValue={defaultValues?.tags}
                  />
                </Col>
                <Col md="4">
                  <FormReactSelect
                    options={STATUS_OPTIONS}
                    placeholder=""
                    name="status"
                    label="Status"
                    defaultValue={defaultValues.status}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col md="4">
                      <FormReactSelect
                        options={CREATIVE_TYPES}
                        placeholder=""
                        name="type"
                        label="Creative type"
                        defaultValue={defaultValues.type}
                        disabled={!isCreate}
                      />
                    </Col>
                    <Col md="4">
                      <FormTextInput
                        isRequired
                        placeholder=""
                        name="click_url"
                        label="Click url"
                        defaultValue={defaultValues.click_url}
                      />
                    </Col>
                    <Col md={4}>
                      <FormReactSelect
                        options={CREATIVE_FILE_TYPES}
                        placeholder=""
                        name="file_type"
                        label="File type"
                        defaultValue={defaultValues.file_type}
                      />
                    </Col>

                    {/* <Col md="4">
                      <FormTextInput
                        placeholder=""
                        name="extra_trackers"
                        label="Extra trackers"
                        defaultValue={defaultValues.extra_trackers}
                      />
                    </Col> */}

                    <Col md="4">
                      <FormReactSelect
                        options={PLATFORM_OPTIONS}
                        placeholder=""
                        name="platform"
                        label="Platform"
                        defaultValue={defaultValues.platform}
                      />
                    </Col>

                    <Col md="4">
                      <FormReactSelect
                        options={ALTERNATIVE_PLAY_OPTIONS}
                        placeholder=""
                        name="alternative_play"
                        label="Alternative play"
                        defaultValue={defaultValues.alternative_play}
                      />
                    </Col>
                    <Col md="4">
                      <Row>
                        <Col md="4">
                          <FormCheckbox
                            defaultValues={defaultValues.sound}
                            name={'sound'}
                            label="Sound"
                          />
                        </Col>
                        <Col md="4">
                          <FormCheckbox
                            defaultValues={defaultValues.https}
                            name={'https'}
                            label="Https"
                          />
                        </Col>
                        <Col md="4">
                          <FormCheckbox
                            defaultValues={defaultValues.multiproduct}
                            name={'multiproduct'}
                            label="Multiproduct"
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col md="4">
                      <FormReactSelect
                        isClearable
                        options={AD_SIZE_FORMAT_OPTIONS}
                        placeholder=""
                        name="ad_size_format"
                        label="Ad size format"
                        defaultValue={defaultValues.ad_size_format}
                      />
                    </Col>

                    <Col md="4">
                      <FormTextInput
                        placeholder=""
                        name="width"
                        label="Width"
                        defaultValue={defaultValues.width}
                        isRequired
                      />
                    </Col>
                    <Col md="4">
                      <FormTextInput
                        placeholder=""
                        name="height"
                        label="Height"
                        defaultValue={defaultValues.height}
                        isRequired
                      />
                    </Col>
                    <Col md="8">
                      <FormGroup>
                        <FormCodeMirror
                          name="creative_metadata"
                          label="Creative metadata"
                          extension="JSON"
                          defaultValue={defaultValues.creative_metadata}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormReactSelect
                        options={CREATIVE_BANNER_TYPES}
                        placeholder=""
                        name="creative_type"
                        label="File type"
                        defaultValue={defaultValues.creative_type}
                      />
                    </Col>
                    <Col md={4}>{generateCreativePlayType()}</Col>
                  </Row>
                </Col>
              </Row>

              {isThirdPartyType && (
                <Row>
                  <Col md="12">
                    <FormReactSelect
                      required
                      options={THIRD_PARTY_TAG_TYPES}
                      placeholder=""
                      name="third_party_tag_type"
                      label="Third party tag type"
                      defaultValue={defaultValues.third_party_tag_type}
                    />
                  </Col>
                  <Col md="12">
                    <FormTextInput
                      isRequired
                      type="textarea"
                      placeholder=""
                      name="third_party_tag"
                      label="Third party tag"
                      rows={4}
                      defaultValue={defaultValues.third_party_tag}
                    />
                  </Col>
                </Row>
              )}
            </CollapseBox>

            <Row>
              <Col>
                <Alternatives />
              </Col>
            </Row>
          </Box>
        </form>
      </FormProvider>

      {!isCreate && (
        <>
          <hr />
          <Row>
            <Col>
              <Trackers referenceId={creative?.uuid} referenceType="creative" />
            </Col>
          </Row>
          <hr />
        </>
      )}

      {/* BEGIN: Report */}
      {creative?.uuid && (
        <Report
          entity={EntityTypes.CREATIVE}
          entityId={creative?.uuid}
          ownerRole={USER_ROLE.ADVERTISER}
          entityName={creative?.name}
          groupObjectId={creative?.advertiser_uuid}
        />
      )}

      {/* END: Report */}
      <div className="d-flex justify-content-end">
        <Button
          color="secondary"
          onClick={handleCloseDialog}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          color="primary"
          disabled={!isDirty || isLoading || isUploading}
          type="submit"
          className="ml-2"
          form="banner-form"
        >
          {t('save')}
        </Button>
      </div>
    </>
  );
}

BannerForm.propTypes = {
  isCreate: PropTypes.bool,
  creative: PropTypes.object
};
BannerForm.defaultProps = {
  isCreate: false,
  creative: {}
};

export default React.memo(BannerForm);
