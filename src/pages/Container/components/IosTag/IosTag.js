import * as React from 'react';
import {Button, Container, Nav, NavItem, TabContent, TabPane} from 'reactstrap';

import OverviewTab from '../WebsiteTag/OverviewTab';
import PagesAndEventsTab from '../WebsiteTag/PagesAndEventsTab';
import {IOS_TAG_STEPS} from 'pages/Container/constants';
import Inventories from '../ContainerWebsiteTag/Inventories';

function IosTag(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const ACTIVE_STEP = IOS_TAG_STEPS[activeStep];

  const tabProps = {
    title: ACTIVE_STEP.title
  };

  const onChangeTab = index => {
    setActiveStep(index);
  };

  const _renderTabsContent = () => {
    return (
      <TabContent activeTab={activeStep}>
        <TabPane tabId={0} className="mt-2">
          {activeStep === 0 && (
            <PagesAndEventsTab tabProps={tabProps}>
              <Inventories inventories={props.inventories} />
            </PagesAndEventsTab>
          )}
        </TabPane>
        <TabPane tabId={1} className="mt-2">
          {activeStep === 1 ? <OverviewTab tabProps={tabProps} /> : null}
        </TabPane>
      </TabContent>
    );
  };

  return (
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
                  // disabled={index === 2 && !selectedPage ? true : false}
                >
                  {label}
                </Button>
              </NavItem>
            );
          })}
        </Nav>
      </div>
      {_renderTabsContent()}
    </Container>
  );
}

IosTag.propTypes = {};
IosTag.defaultProps = {};

export default IosTag;
