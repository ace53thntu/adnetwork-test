import {ApiError, BlockOverlay, ButtonLoading} from 'components/common';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {getContainerTags} from 'pages/Container/constants';

import PropTypes from 'prop-types';
import {useEditPage} from 'queries/page';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from 'reactstrap';
import {updatePageRedux} from 'store/reducers/container';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {
  pageInformationFormValuesToRepo,
  rawDataToFormDefaultValues
} from './dto';
import {validationPage} from './validations';

function PageInformationForm(props) {
  const {t} = useTranslation();
  const {rawData, pageTags, pages} = props;

  const {cid: containerId, source} = useParams();
  const {mutateAsync: updatePageRequest} = useEditPage();
  const dispatch = useDispatch();

  const formDefaultValues = rawDataToFormDefaultValues(
    rawData,
    pageTags,
    source
  );

  const filteredPages = pages.filter(p => p.id !== rawData?.id);
  const isWeb = source === 'web' || source === 'webtv';
  const formLabelsName = {
    pageName: !isWeb ? 'Screen name' : 'Page name',
    pageURL: 'Page URL',
    pageTypePlaceholder: !isWeb ? 'Select a screen type' : 'Select a page type',
    pageTag: !isWeb ? 'Screen tags' : 'Page tags',
    pageTagPlaceholder: !isWeb ? 'Select screen tags' : 'Select page tags'
  };

  const methods = useForm({
    defaultValues: formDefaultValues,
    resolver: validationPage(filteredPages, !isWeb, source)
  });
  const {
    handleSubmit,
    formState: {isDirty, isSubmitting},
    reset,
    register
  } = methods;

  React.useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleSubmit = async values => {
    const bodyRequest = pageInformationFormValuesToRepo(
      values,
      rawData,
      containerId,
      source
    );

    setIsLoading(true);
    try {
      await updatePageRequest({pageId: rawData.uuid, data: bodyRequest});
      setIsLoading(false);
      ShowToast.success('Update page successfully!');
      reset(values);
      dispatch(
        updatePageRedux({
          pageId: rawData.uuid,
          name: bodyRequest.name
        })
      );
    } catch (error) {
      ShowToast.error(<ApiError apiError={error}/>);
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {isLoading && <BlockOverlay />}
        <Card className="main-card mb-3">
          <CardHeader className="border-0">
            <CardTitle>{isWeb ? 'Page' : 'Screen'} Information</CardTitle>
            <div className="btn-actions-pane-right">
              <FormToggle
                name="status"
                defaultCheckedValue="active"
                label="Status"
                values={{
                  checked: 'active',
                  unChecked: 'inactive'
                }}
                disabled={isSubmitting}
              />
            </div>
          </CardHeader>

          <CardBody className="pt-0 pb-3">
            <FormTextInput
              isRequired
              name="name"
              placeholder={`${formLabelsName.pageName}...`}
              label={formLabelsName.pageName}
              disabled={isSubmitting}
            />

            {source === 'website' && (
              <FormTextInput
                isRequired
                name="url"
                placeholder={`${formLabelsName.pageURL}...`}
                label={formLabelsName.pageURL}
                disabled={isSubmitting}
              />
            )}
            <FormTextInput
              isRequired={false}
              name="context"
              placeholder="Context..."
              label="Context"
              disable={isSubmitting}
            />
            <FormReactSelect
              required={false}
              name="tags"
              label={formLabelsName.pageTag}
              placeholder={formLabelsName.pageTagPlaceholder}
              optionLabelField="name"
              options={getContainerTags()}
              disabled={isSubmitting}
              multiple={true}
            />

            <Row>
              <Col sm={12}>
                <div className="d-flex justify-content-end">
                  <ButtonLoading
                    type="submit"
                    className="ml-2 btn-primary"
                    disabled={!isDirty || isSubmitting}
                    loading={isLoading}
                  >
                    {t('save')}
                  </ButtonLoading>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </form>
    </FormProvider>
  );
}

PageInformationForm.propTypes = {
  rawData: PropTypes.object,
  pageTypes: PropTypes.array,
  pageTags: PropTypes.array,
  pages: PropTypes.array
};
PageInformationForm.defaultProps = {
  pageTags: [],
  pageTypes: [],
  pages: []
};

export default PageInformationForm;
