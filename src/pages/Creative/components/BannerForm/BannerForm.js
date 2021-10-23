import {AlternativeAPI} from 'api/alternative.api';
import {BlockOverlay, CollapseBox} from 'components/common';
import {
  FormCheckbox,
  FormReactSelect,
  FormTagsInput,
  FormTextInput
} from 'components/forms';
import PropTypes from 'prop-types';
import {useCreateCreative} from 'queries/creative';
import {GET_CREATIVES} from 'queries/creative/constants';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {toggleCreateCreativeDialog} from 'store/reducers/creative';
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
  creativeModelToRepo,
  creativeRepoToModel
} from './dto';
import {bannerFormValidationResolver} from './utils';

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
  console.log(
    '🚀 ~ file: BannerForm.js ~ line 56 ~ BannerForm ~ creative',
    creative
  );

  const client = useQueryClient();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {conceptId} = useParams();
  const {mutateAsync: createCreativeRequest} = useCreateCreative();

  const defaultValues = React.useMemo(() => {
    if (!!creative) {
      return creativeRepoToModel(creative);
    }

    return defaultFormValues;
  }, [creative]);

  const methods = useForm({
    defaultValues,
    resolver: bannerFormValidationResolver()
  });
  const {
    handleSubmit,
    formState: {isDirty}
  } = methods;

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
    }
  };

  const handleCloseDialog = () => {
    dispatch(toggleCreateCreativeDialog());
  };

  return (
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
                  // disable={isLoading || disabled}
                  defaultValue={defaultValues?.name}
                />
              </Col>
              <Col md="4">
                <FormTagsInput
                  name="tags"
                  label="Tags"
                  placeholder="Enter tags..."
                  // disabled={isLoading}
                  defaultValue={defaultValues?.tags}
                />
              </Col>
              <Col md="4">
                <FormReactSelect
                  options={CREATIVE_TYPES}
                  placeholder=""
                  name="creative_type"
                  label="Creative type"
                  // disabled={isLoading || disabled}
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
                      // disabled={isLoading || disabled}
                      defaultValue={defaultValues.invocation_tag_type}
                    />
                  </Col>

                  <Col md="6">
                    <FormTextInput
                      placeholder=""
                      name="extra_trackers"
                      label="Extra trackers"
                      // disable={isLoading || disabled}
                      defaultValue={defaultValues.extra_trackers}
                    />
                  </Col>

                  <Col md="6">
                    <FormTextInput
                      placeholder=""
                      name="click_url"
                      label="Click url"
                      // disable={isLoading || disabled}
                      defaultValue={defaultValues.click_url}
                    />
                  </Col>
                  <Col md="6">
                    <FormTextInput
                      placeholder=""
                      name="width"
                      label="Width"
                      // disable={isLoading || disabled}
                      defaultValue={defaultValues.width}
                    />
                  </Col>
                  <Col md="6">
                    <FormTextInput
                      placeholder=""
                      name="height"
                      label="Height"
                      // disable={isLoading || disabled}
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
                      // disabled={isLoading || disabled}
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
                      // disable={isLoading || disabled}
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
      </form>
    </FormProvider>
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

export default BannerForm;
