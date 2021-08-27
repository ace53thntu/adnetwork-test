import {Card, CardBody, CardFooter, CardHeader, Col, Row} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import React, {useCallback, useMemo} from 'react';

import AndroidInitSnippet from './AndroidInitSnippet';
import BlockUi from 'react-block-ui';
import Code from './Code';
import IOSInitSnippet from './IOSInitSnippet';
import {SOURCE_FROM_TAG} from '../ContainerTree/constants';
import {toast} from 'react-toastify';
import {useContainerStore} from 'pages/Container/context';
import {useParams} from 'react-router-dom';
import {validationDescriptionTab} from './validations';
import {FormRadioGroup, FormTextInput} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {
  useEditContainer,
  useGetContainer,
  useGetContainers
} from 'queries/container';

const defaultValue = containerId => `
<script type="text/javascript">
window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(t){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="https://cdn.aicactus.io/aicactus-sdk.min.js?t="+Date.now(),e.addEventListener?e.addEventListener("load",function(e){"function"==typeof t&&t(e)},!1):e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&t(window.event)};let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"${containerId}@web"}),AicactusSDK.callMethodsFromContainer()});
</script>
`;

function CompletedTab() {
  const {cid, tag, pageId} = useParams();
  const currentTag = SOURCE_FROM_TAG[tag];
  const {data: containers} = useGetContainers();
  console.log(
    '🚀 ~ file: CompletedTab.js ~ line 32 ~ CompletedTab ~ containers',
    containers
  );
  const {data: container, isFetching} = useGetContainer(cid);
  const pages = useCallback(() => {
    return [];
  }, []);

  // const {data: events = []} = useEvents({pageId});
  const events = useCallback(() => {
    return [];
  }, []);
  const isIOS = currentTag === 'ios';
  const isAndroid = currentTag === 'android';
  const isMobile = isIOS || isAndroid;

  const numberOfPages = useMemo(() => {
    return pages?.length ?? 0;
  }, [pages]);

  const numberOfEvents = useMemo(() => {
    return events?.length ?? 0;
  }, [events]);

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
  containers,
  isMobile = false,
  isAndroid = false,
  isIOS = false
}) {
  const {updateContainer: updateContainerDispatch} = useContainerStore();
  const {name = '', url = '', status = 'active'} = container;
  const filteredContainer = containers.filter(cnt => cnt.id !== container.id);
  const methods = useForm({
    defaultValues: {
      name,
      url,
      status
    },
    resolver: validationDescriptionTab(filteredContainer)
  });
  const {handleSubmit, formState} = methods;
  const {mutateAsync: updateContainer} = useEditContainer();

  const onHandleSubmit = useCallback(
    async formValues => {
      try {
        await updateContainer({
          cid: container.id,
          data: formValues
        });
        updateContainerDispatch();
        toast.success('Update container successfully!', {
          closeOnClick: true
        });
      } catch (error) {
        toast.error(error, {
          closeOnClick: true
        });
      }
    },
    [container.id, updateContainer, updateContainerDispatch]
  );

  return (
    <FormProvider {...methods}>
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <CardBody>
            <Row>
              <Col sm={12} md={6}>
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
              Save Container
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
