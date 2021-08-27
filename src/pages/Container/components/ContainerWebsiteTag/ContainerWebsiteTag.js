import React, {useState, useCallback} from 'react';
import {Nav, NavItem, Button, TabContent, TabPane, Container} from 'reactstrap';

// components
import PageEventsTab from './PageEventsTab';
import CompletedTab from './CompletedTab';
import PageEventsTabCreate from './PageEventsTabCreate';

import {WEB_TAG_STEPS} from '../../constants';

import {useContainerStore} from '../../context';
import {PageTitleAlt} from 'components/layouts/Admin/components';

function ContainerWebsiteTag({pageId}) {
  const {state} = useContainerStore();
  const {selectedPage} = state;

  // local states
  const [activeStep, setActiveStep] = useState(0);
  console.log(
    '🚀 ~ file: ContainerWebsiteTag.js ~ line 20 ~ ContainerWebsiteTag ~ activeStep',
    activeStep
  );

  const ACTIVE_STEP = WEB_TAG_STEPS[activeStep];

  const tabProps = {
    title: ACTIVE_STEP.title
  };

  const onChangeTab = useCallback(index => {
    setActiveStep(index);
  }, []);

  const _renderTabsContent = () => {
    return (
      <TabContent activeTab={activeStep}>
        <TabPane tabId={0} className="mt-2">
          {activeStep === 0 ? (
            pageId ? (
              pageId === 'create' ? (
                <PageEventsTabCreate tabProps={tabProps} />
              ) : (
                <PageEventsTab tabProps={tabProps} pageId={pageId} />
              )
            ) : (
              <div>Loading...</div>
            )
          ) : null}
        </TabPane>
        <TabPane tabId={1} className="mt-2">
          {activeStep === 1 ? <CompletedTab tabProps={tabProps} /> : null}
        </TabPane>
      </TabContent>
    );
  };

  return (
    <>
      <PageTitleAlt
        heading="Website tag"
        subheading="Online tracking"
        icon="pe-7s-plane icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <div>
          <Nav className="justify-content-center">
            {WEB_TAG_STEPS.map((step, index) => {
              const {label} = step;
              const isActiveTab = index === activeStep;
              return (
                <NavItem key={index}>
                  <Button
                    outline
                    className={`border-0 btn-transition ${
                      isActiveTab ? 'active' : ''
                    } ${index ? 'ml-2' : ''}`}
                    color="primary"
                    onClick={() => {
                      onChangeTab(index);
                    }}
                    disabled={index === 2 && !selectedPage ? true : false}
                  >
                    {label}
                  </Button>
                </NavItem>
              );
            })}
          </Nav>
          {_renderTabsContent()}
        </div>
      </Container>
    </>
  );
}

export default ContainerWebsiteTag;
