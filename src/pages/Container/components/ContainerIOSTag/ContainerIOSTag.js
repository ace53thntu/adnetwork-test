import React, {useState, useCallback} from 'react';
import {Nav, NavItem, Button, TabContent, TabPane, Container} from 'reactstrap';

import {IOS_TAG_STEPS} from '../../constants';
import EmptyPage from './EmptyPage';
import ScreensAndEvents from './ScreensAndEvents';
import CompletedTab from '../ContainerWebsiteTag/CompletedTab';
import Inventories from '../ContainerWebsiteTag/Inventories';

function ContainerIOSTag({pageId, inventories = []}) {
  // local states
  const [activeStep, setActiveStep] = useState(0);

  const ACTIVE_STEP = IOS_TAG_STEPS[activeStep];

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
                <EmptyPage tabProps={tabProps} />
              ) : (
                <ScreensAndEvents tabProps={tabProps} pageId={pageId}>
                  <Inventories pageId={pageId} inventories={inventories} />
                </ScreensAndEvents>
              )
            ) : (
              <div>Loading...</div>
            )
          ) : null}
        </TabPane>
        <TabPane tabId={1} className="mt-2">
          {activeStep === 1 ? <CompletedTab tabProps={tabProps} isIOS /> : null}
        </TabPane>
      </TabContent>
    );
  };

  return (
    <>
      <Container fluid>
        <div>
          <Nav className="justify-content-center">
            {IOS_TAG_STEPS.map((step, index) => {
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
                    disabled={index === 2 ? true : false}
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

export default ContainerIOSTag;
