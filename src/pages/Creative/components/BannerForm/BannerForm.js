import {AlternativeAPI} from 'api/alternative.api';
import {BlockOverlay, Collapse, CollapseBox} from 'components/common';
import {
  FormCheckbox,
  FormReactSelect,
  FormTagsInput,
  FormTextInput
} from 'components/forms';
import PropTypes from 'prop-types';
import {useCreateCreative, useUpdateCreative} from 'queries/creative';
import {GET_CREATIVES} from 'queries/creative/constants';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {
  dirtyForm,
  toggleCreateCreativeDialog,
  toggleCreativeDetailDialog,
  useCreativeSelector
} from 'store/reducers/creative';
import {difference} from 'utils/helpers/difference.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import Box from '@material-ui/core/Box';

import {Alternatives} from '../Alternatives';
import {
  CREATIVE_FILE_TYPES,
  CREATIVE_TYPES,
  INVOCATION_TAG_TYPES
} from './constants';
import {
  alternativeFormValuesToRepo,
  alternativeRepoToModel,
  creativeModelToRepo,
  creativeRepoToModel
} from './dto';
import {bannerFormValidationResolver} from './utils';
import EntityReport from 'pages/entity-report';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';

const defaultFormValues = {
  invocation_tag: '',
  invocation_tag_type: INVOCATION_TAG_TYPES[0],
  extra_trackers: '',

  creative_type: CREATIVE_TYPES[0], // third_party, first_party
  tags: [],

  click_url: '',
  https: false,
  sound: false,
  multiproduct: false,
  name: '',
  width: '1',
  height: '1',

  file_type: CREATIVE_FILE_TYPES[0]

  // alternatives: []
};

function BannerForm(props) {
  const {isCreate, creative} = props;
  const {selectedAdvertiserId} = useCreativeSelector();

  const client = useQueryClient();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {conceptId} = useParams();
  const {mutateAsync: createCreativeRequest} = useCreateCreative();
  const {mutateAsync: updateCreativeRequest} = useUpdateCreative();

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
    formState: {isDirty}
  } = methods;

  React.useEffect(() => {
    dispatch(dirtyForm(isDirty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  const [isLoading, setIsLoading] = React.useState(false);

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

            await Promise.all(promises);
          }
        }

        setIsLoading(false);
        dispatch(toggleCreateCreativeDialog());
        ShowToast.success('Create Creative successfully!');
        client.invalidateQueries([GET_CREATIVES]);
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(error?.msg);
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
        ShowToast.success('Update Creative successfully!');
        client.invalidateQueries([GET_CREATIVES, params]);
        handleCloseDialog();
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(error?.msg);
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
                    options={CREATIVE_TYPES}
                    placeholder=""
                    name="creative_type"
                    label="Creative type"
                    defaultValue={defaultValues.creative_type}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md="4">
                          <FormCheckbox
                            defaultValues={defaultValues.sound}
                            name={'sound'}
                            label="Sound"
                            // disabled={isLoading || disabled}
                          />
                        </Col>
                        <Col md="4">
                          <FormCheckbox
                            defaultValues={defaultValues.https}
                            name={'https'}
                            label="Https"
                            // disabled={isLoading || disabled}
                          />
                        </Col>
                        <Col md="4">
                          <FormCheckbox
                            defaultValues={defaultValues.multiproduct}
                            name={'multiproduct'}
                            label="Multiproduct"
                            // disabled={isLoading || disabled}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col md="6">
                      <FormReactSelect
                        options={INVOCATION_TAG_TYPES}
                        placeholder=""
                        name="invocation_tag_type"
                        label="Invocation tag type"
                        defaultValue={defaultValues.invocation_tag_type}
                      />
                    </Col>

                    <Col md="6">
                      <FormTextInput
                        placeholder=""
                        name="extra_trackers"
                        label="Extra trackers"
                        defaultValue={defaultValues.extra_trackers}
                      />
                    </Col>

                    <Col md="6">
                      <FormTextInput
                        placeholder=""
                        name="click_url"
                        label="Click url"
                        defaultValue={defaultValues.click_url}
                      />
                    </Col>
                    <Col md="6">
                      <FormTextInput
                        placeholder=""
                        name="width"
                        label="Width"
                        defaultValue={defaultValues.width}
                      />
                    </Col>
                    <Col md="6">
                      <FormTextInput
                        placeholder=""
                        name="height"
                        label="Height"
                        defaultValue={defaultValues.height}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col md="4">
                  <Row>
                    <Col>
                      <FormReactSelect
                        options={CREATIVE_FILE_TYPES}
                        placeholder=""
                        name="file_type"
                        label="File type"
                        defaultValue={defaultValues.file_type}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormTextInput
                        type="textarea"
                        placeholder=""
                        name="invocation_tag"
                        label="Invocation tag"
                        rows={4}
                        style={{
                          resize: 'none'
                        }}
                        defaultValue={defaultValues.invocation_tag}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CollapseBox>

            <Row>
              <Col>
                <Alternatives />
              </Col>
            </Row>
          </Box>
        </form>
      </FormProvider>
      {/* BEGIN: Report */}
      {creative?.uuid && (
        <Collapse initialOpen={true} title="Reports" unMount={false}>
          <Row>
            <Col>
              <EntityReport
                entity={EntityTypes.CREATIVE}
                entityId={creative?.uuid}
                ownerId={selectedAdvertiserId}
                ownerRole={USER_ROLE.ADVERTISER}
              />
            </Col>
          </Row>
        </Collapse>
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
          disabled={!isDirty || isLoading}
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
