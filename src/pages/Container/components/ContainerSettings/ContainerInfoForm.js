import {BlockOverlay, ButtonLoading} from 'components/common';
import {FormRadioGroup, FormTextInput} from 'components/forms';
import {SDK_CDN, SDK_NAME} from 'constants/container';
import PropTypes from 'prop-types';
import {useEditContainer} from 'queries/container';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {CardBody, CardFooter, Col, Row} from 'reactstrap';
import {
  updatedContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {mappingApiToForm, mappingFormToApi} from '../ContainerDetail/dto';
import PublisherSelect from '../ContainerDetail/PublisherSelect';

import {
  AndroidInitSnippet,
  IosInitSnippet,
  WebIdentifySnippet
} from '../Snippets';
import Count from './Count';
import {containerFormResolver} from './validations';

const defaultValue = containerId => `
<script type="text/javascript">
window.${SDK_NAME}||(window.${SDK_NAME}={}),${SDK_NAME}.load=function(t){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="${SDK_CDN}?t="+Date.now(),e.addEventListener?e.addEventListener("load",function(e){"function"==typeof t&&t(e)},!1):e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&t(window.event)};let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a)},${SDK_NAME}.load(function(){${SDK_NAME}.initialize({containerId:"${containerId}@web", type: ["adnetwork"]}),${SDK_NAME}.callMethodsFromContainer()});
</script>
`;

function ContainerInfoForm(props) {
  const {t} = useTranslation();
  const {containerRedux} = useContainerSelector();
  const {containers, container} = props;
  const dispatch = useDispatch();
  const {source} = useParams();

  const {mutateAsync: updateContainerRequest} = useEditContainer();

  const isIOS = source === 'ios';
  const isAndroid = source === 'android';
  const isMobile = isIOS || isAndroid;

  const formDefaultValues = mappingApiToForm({
    container,
    containerRedux,
    t,
    publisher: container?.publisher
  });

  const methods = useForm({
    defaultValues: formDefaultValues,
    resolver: containerFormResolver(containers)
  });
  const {handleSubmit, formState, reset} = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleSubmit = async values => {
    setIsLoading(true);
    const formData = mappingFormToApi(values);
    try {
      await updateContainerRequest({
        cid: container?.uuid,
        data: formData
      });

      setIsLoading(false);
      ShowToast.success('Updated container successfully!');
      reset(values);
      dispatch(
        updatedContainerRedux({
          ...container,
          ...values
        })
      );
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message || 'Fail to update container');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        {isLoading && <BlockOverlay />}
        <CardBody>
          <Row>
            <Col sm={12} md={6}>
              <PublisherSelect currentContainer={formDefaultValues} isEdit />
              <FormTextInput
                isRequired
                name="name"
                placeholder="Container name..."
                label="Container name"
                disable={formState.isSubmitting}
              />
              <FormTextInput
                name="url"
                placeholder="Container URL..."
                label="Container URL"
                disable={formState.isSubmitting}
              />
              <FormRadioGroup
                inline
                label="Status"
                name="status"
                items={[
                  {
                    id: 'draft',
                    label: 'Draft',
                    value: 'draft'
                  },
                  {
                    id: 'pending',
                    label: 'Pending',
                    value: 'pending'
                  },
                  {
                    id: 'active',
                    label: 'Active',
                    value: 'active'
                  }
                ]}
                disabled={formState.isSubmitting}
              />

              <Row>
                <Col sm={12} md={6}>
                  <Count
                    label={isMobile ? 'Screens' : 'Pages'}
                    count={`${container?.source?.[source] || 0}`}
                  />
                </Col>
                <Col sm={12} md={6}>
                  <Count
                    label="Inventories"
                    count={`${container?.total_inventories || 0}`}
                    type="success"
                  />
                </Col>
              </Row>
            </Col>

            <Col sm={12} md={6}>
              {isAndroid && <AndroidInitSnippet containerId={container.uuid} />}
              {isIOS && <IosInitSnippet containerId={container.uuid} />}
              {!isMobile && (
                <div className="aicactus-snippet">
                  <WebIdentifySnippet>
                    {defaultValue(container.uuid)}
                  </WebIdentifySnippet>
                </div>
              )}
            </Col>
          </Row>
        </CardBody>

        <CardFooter className="d-block text-right">
          <ButtonLoading
            loading={isLoading}
            type="submit"
            className="ml-2 btn-primary"
            disabled={!formState.isDirty}
          >
            {t('save')}
          </ButtonLoading>
        </CardFooter>
      </form>
    </FormProvider>
  );
}

ContainerInfoForm.propTypes = {
  pagesCount: PropTypes.number,
  eventsCounts: PropTypes.number,
  containers: PropTypes.array,
  container: PropTypes.object
};
ContainerInfoForm.defaultProps = {
  containers: [],
  pagesCount: 0,
  eventsCounts: 0,
  container: {}
};

export default ContainerInfoForm;
