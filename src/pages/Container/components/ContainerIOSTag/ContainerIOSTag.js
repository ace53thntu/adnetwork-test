import React, {useState, useCallback} from 'react';
import {Nav, NavItem, Button, TabContent, TabPane, Container} from 'reactstrap';
import {useParams} from 'react-router-dom';

import {useContainerStore} from '../../context';
import {IOS_TAG_STEPS} from '../../constants';
import EmptyPage from './EmptyPage';
import ScreensAndEvents from './ScreensAndEvents';
import CompletedTab from '../ContainerWebsiteTag/CompletedTab';
import {PageTitleAlt} from 'components/layouts/Admin/components';

function ContainerIOSTag({pageId}) {
  const {tag} = useParams();
  const {state} = useContainerStore();
  const {selectedPage} = state;

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
                <ScreensAndEvents tabProps={tabProps} pageId={pageId} />
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
      <PageTitleAlt
        heading={tag === 'ios-tag' ? 'iOS tag' : 'Android tag'}
        subheading="Online tracking"
        icon="pe-7s-plane icon-gradient bg-tempting-azure"
      />
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

export default ContainerIOSTag;
