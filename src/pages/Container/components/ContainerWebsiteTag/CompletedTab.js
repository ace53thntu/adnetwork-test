import {Card, CardBody, CardFooter, CardHeader, Col, Row} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import React, {useCallback} from 'react';

import AndroidInitSnippet from './AndroidInitSnippet';
import BlockUi from 'react-block-ui';
import Code from './Code';
import IOSInitSnippet from './IOSInitSnippet';
import {SOURCE_FROM_TAG} from '../ContainerTree/constants';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';
import {validationDescriptionTab} from './validations';
import {FormRadioGroup, FormTextInput} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {
  useEditContainer,
  useGetContainer,
  useGetContainers
} from 'queries/container';
import {useGetPagesByContainer} from 'queries/page';
import {useCountSource} from 'pages/Container/hooks/useCountSource';
import {useGetInventoriesByContainer} from 'queries/inventory/useGetInventoriesByContainer';
import {useCountInventory} from 'pages/Container/hooks/useCountInventory';
import PublisherSelect from '../ContainerDetail/PublisherSelect';
import {useGetPublisher} from 'queries/publisher';
import {mappingFormToApi} from '../ContainerDetail/dto';
import {useTranslation} from 'react-i18next';
import {useContainerSelector} from 'store/reducers/container';

const defaultValue = containerId => `
<script type="text/javascript">
  window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(t){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="https://cdn.aicactus.io/aicactus-sdk.min.js?t="+Date.now(),e.addEventListener?e.addEventListener("load",function(e){"function"==typeof t&&t(e)},!1):e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&t(window.event)};let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"${containerId}@web"}),AicactusSDK.callMethodsFromContainer()});
</script>
`;

function CompletedTab() {
  const [isFetching, setIsFetching] = React.useState(true);
  const {cid, tag, pageId} = useParams();
  const currentTag = SOURCE_FROM_TAG[tag];
  const {data: containers} = useGetContainers();
  const {data: container, isFetched} = useGetContainer(cid);
  const {data: publisher, isFetched: isFetchedPublisher} = useGetPublisher(
    container?.publisher_uuid
  );
  const {data: pages} = useGetPagesByContainer(cid);
  const countSource = useCountSource(pages);
  const {data: inventories} = useGetInventoriesByContainer({
    containerId: cid,
    pageId
  });
  const isIOS = currentTag === 'ios';
  const isAndroid = currentTag === 'android';
  const isMobile = isIOS || isAndroid;

  const numberOfPages = countSource?.[currentTag];

  const numberOfEvents = useCountInventory({data: inventories, pageId});

  React.useEffect(() => {
    if (isFetched && isFetchedPublisher) {
      setIsFetching(false);
    }
  }, [isFetched, isFetchedPublisher]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col sm="12">
        <Card className="main-card mb-3">
          <CardHeader>Container Settings</CardHeader>
          <CompleteForm
            container={container}
            numberOfPages={numberOfPages}
            numberOfEvents={numberOfEvents}
            containers={containers?.items}
            isMobile={isMobile}
            isIOS={isIOS}
            isAndroid={isAndroid}
            publisher={publisher}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default CompletedTab;

function CompleteForm({
  container,
  numberOfPages,
  numberOfEvents,
  isMobile = false,
  isAndroid = false,
  isIOS = false,
  publisher
}) {
  const {t} = useTranslation();
  const {containers: containersRedux} = useContainerSelector();
  const {name = '', url = '', status = 'active'} = container;
  const filteredContainer = containersRedux?.filter(
    cnt => cnt.uuid !== container.uuid
  );
  const methods = useForm({
    defaultValues: {
      name,
      url,
      status,
      publisher_uuid: publisher
        ? {value: publisher?.uuid, label: publisher?.name}
        : null
    },
    resolver: validationDescriptionTab(filteredContainer)
  });
  const {handleSubmit, formState} = methods;
  const {mutateAsync: updateContainer} = useEditContainer();

  const onHandleSubmit = useCallback(
    async formValues => {
      const formData = mappingFormToApi(formValues);
      try {
        await updateContainer({
          cid: container.uuid,
          data: formData
        });
        toast.success('Updated container successfully!', {
          closeOnClick: true
        });
      } catch (error) {
        toast.error(error?.message || 'Fail to update container', {
          closeOnClick: true
        });
      }
    },
    [container, updateContainer]
  );

  return (
    <FormProvider {...methods}>
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <CardBody>
            <Row>
              <Col sm={12} md={6}>
                <PublisherSelect isEdit currentContainer={container} />
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
                      count={numberOfPages}
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <Count
                      label="Inventories"
                      count={numberOfEvents}
                      type="success"
                    />
                  </Col>
                </Row>
              </Col>

              <Col sm={12} md={6}>
                {isAndroid && <AndroidInitSnippet containerId={container.id} />}
                {isIOS && <IOSInitSnippet containerId={container.id} />}
                {!isMobile && (
                  <div className="aicactus-snippet">
                    <Code isIOS>{defaultValue(container.id)}</Code>
                  </div>
                )}
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="d-block text-right">
            <ButtonLoading
              loading={formState.isSubmitting}
              type="submit"
              className="ml-2 btn-primary"
              disabled={!formState.isDirty}
            >
              {t('save')}
            </ButtonLoading>
          </CardFooter>
        </form>
      </BlockUi>
    </FormProvider>
  );
}

export function Count({
  count = 0,
  label = 'Pages',
  type = 'primary',
  className = ''
}) {
  return (
    <Card
      className={`card-shadow-${type} widget-chart widget-chart2 text-left border-${type} card-btm-border ${className}`}
    >
      <div className="widget-chat-wrapper-outer">
        <div className="widget-chart-content">
          <h6 className="widget-subheading">{label}</h6>
          <div className="widget-chart-flex">
            <div className="widget-numbers mb-0 w-100">
              <div className="widget-chart-flex">
                <div className="fsize-4">{count}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
