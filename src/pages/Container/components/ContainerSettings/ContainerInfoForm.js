import {BlockOverlay, ButtonLoading} from 'components/common';
import {FormTextInput, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {SDK_CDN, SDK_NAME} from 'constants/container';
import {USER_ROLE} from 'pages/user-management/constants';
import PropTypes from 'prop-types';
import {useEditContainer} from 'queries/container';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {CardBody, CardFooter, Col, FormGroup, Row} from 'reactstrap';
import {
  updatedContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import {getRole} from 'utils/helpers/auth.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {mappingApiToForm, mappingFormToApi} from '../ContainerDetail/dto';
import PublisherSelect from '../ContainerDetail/PublisherSelect';
import {ContainerDefault} from '../ContainerFormFields';

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

const getWebTvScript = containerId => `
<script type="text/javascript">
window.${SDK_NAME}||(window.${SDK_NAME}={}),${SDK_NAME}.load=function(t){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="${SDK_CDN}?t="+Date.now(),e.addEventListener?e.addEventListener("load",function(e){"function"==typeof t&&t(e)},!1):e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&t(window.event)};let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a)},${SDK_NAME}.load(function(){${SDK_NAME}.initialize({containerId:"${containerId}@webtv", type: ["adnetwork"]}),${SDK_NAME}.callMethodsFromContainer()});
</script>
`;

function ContainerInfoForm(props) {
  const {t} = useTranslation();
  const {pagesCount, inventoriesCounts} = props;
  const {containerRedux} = useContainerSelector();
  const {containers, container} = props;
  const dispatch = useDispatch();
  const {source} = useParams();
  const role = getRole();

  const {mutateAsync: updateContainerRequest} = useEditContainer();

  const isIOS = source === 'ios';
  const isAndroid = source === 'android';
  const isAndroidTv = source === 'androidtv';
  const isIOSTv = source === 'appletv';
  const isMobile = isIOS || isAndroid || isAndroidTv || isIOSTv;
  const isWebTv = source === 'webtv';

  const formDefaultValues = mappingApiToForm({
    container,
    containerRedux,
    t,
    publisher: container?.publisher
  });

  const methods = useForm({
    defaultValues: formDefaultValues,
    resolver: containerFormResolver(containers, role)
  });
  const {handleSubmit, formState} = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleSubmit = async values => {
    setIsLoading(true);
    const formData = mappingFormToApi(values, role);
    try {
      await updateContainerRequest({
        cid: container?.uuid,
        data: formData
      });

      setIsLoading(false);
      ShowToast.success('Updated container successfully!');
      // reset(values);
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
                isRequired
              />
              <CurrencyInputField
                name="cost"
                label="Commission Cost"
                placeholder="Commission Cost"
                disabled={isLoading}
                decimalSeparator="."
                groupSeparator=","
                disableGroupSeparators={false}
                decimalsLimit={2}
                maxLength="4"
                description="The cost should be between 0.01 and 0.99"
                required
                readOnly={![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)}
              />

              <div className="d-flex mb-2">
                <FormGroup className="d-flex  mb-0 ml-3">
                  <FormToggle
                    name="status"
                    defaultCheckedValue="active"
                    label={t('status')}
                    values={{
                      checked: 'active',
                      unChecked: 'inactive'
                    }}
                  />
                </FormGroup>

                <FormGroup className="d-flex  mb-0 ml-3">
                  <FormToggle
                    name="first_party"
                    defaultCheckedValue="active"
                    label={t('firstParty')}
                    values={{
                      checked: 'active',
                      unChecked: 'inactive'
                    }}
                  />
                </FormGroup>
              </div>

              <ContainerDefault isLoading={isLoading} />

              <Row>
                <Col sm={12} md={6}>
                  <Count
                    label={isMobile ? 'Screens' : 'Pages'}
                    count={`${pagesCount || 0}`}
                  />
                </Col>
                <Col sm={12} md={6}>
                  <Count
                    label="Inventories"
                    count={`${inventoriesCounts || 0}`}
                    type="success"
                  />
                </Col>
              </Row>
            </Col>

            <Col sm={12} md={6}>
              {isAndroid && <AndroidInitSnippet containerId={container.uuid} />}
              {isAndroidTv && (
                <AndroidInitSnippet containerId={container.uuid} isTv />
              )}
              {isIOS && <IosInitSnippet containerId={container.uuid} />}
              {isIOSTv && <IosInitSnippet containerId={container.uuid} isTv />}
              {(!isMobile || isWebTv) && (
                <div className="aicactus-snippet">
                  <WebIdentifySnippet>
                    {isWebTv
                      ? getWebTvScript(container.uuid)
                      : defaultValue(container.uuid)}
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
